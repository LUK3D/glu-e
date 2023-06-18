import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowRefType,
  ReactFlowInstance,
  useReactFlow,
  NodeChange,
} from 'reactflow';

import 'reactflow/dist/style.css';
import TableNode from '../../../components/nodes/tableNode';
import RelationNode from '../../../components/nodes/relationNode';
import { IApp, IColumn, ITable } from '../../../types';
import { validateNode } from '../../../core';
import { consoleStore } from '../../../store';
import generateUniqueKey from '../../../utls/generator';
import CustomEdge from '../../../components/edges/customEdge';



const NODE_TYPES = {
    table:TableNode,
    relation:RelationNode,
};

const edgeTypes = {
  default: CustomEdge,
};

let hadBug = false;


export default function Canvas({appSatore}:{appSatore:IApp}) {

    const reactFlowWrapper = useRef<ReactFlowRefType>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance|null>(null);

    const reactFlowInstance2 = useReactFlow();


    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const myConsole = consoleStore((state)=>state);


    const onConnect = useCallback((params:any) =>{
        setEdges((eds) => addEdge({...params},  eds));
    }, [setEdges]);


    useEffect(()=>{

      appSatore.migrationsNodes.map((node)=>{
        node.data.label
      })

      setNodes(appSatore.migrationsNodes);
      setEdges(appSatore.migrationsEdges);

    },[]);



    const updateStore = ()=>{
        appSatore.setMigrationNodes(nodes);
        appSatore.setMigrationEdges(edges);
    }

    const nodeValidation = ()=>{
      const [result,hasBug] = validateNode({nodes:[...nodes], edges:[...edges]});

        if(hasBug){
          let tablesWithErros = result.map((e)=>e.from?.data['label']);
          hadBug = true;
          setNodes( nodes.map((n)=>{
            if(tablesWithErros.includes(n.data.label)){
              console.log(n.data.label, tablesWithErros)
              n.data.invalid = true;
            }else{
              n.data.invalid = false;
            }
            return n;
          } ));

          forceReactFlowRefresh();

          result.map((e)=>e.errors).forEach(element => {
            myConsole.log(element);
          });

          
        }else{

          if(hadBug){
            hadBug = false;
            setNodes( nodes.map((n)=>{
              n.data.invalid = false;
              return n;
            } ));
            forceReactFlowRefresh();
          }
          
        }
              
        appSatore.setRelations(result);
        if(result.length>0){
          appSatore.updateForeigns();
        }
    }
  
    useEffect(() => {
      nodeValidation();
    }, [edges]);


    const forceReactFlowRefresh = ()=>{
      reactFlowInstance2.setNodes([]);
      setTimeout(() => {
        reactFlowInstance2.setNodes(nodes);
      }, 1); 
    }

    const onDragOver = useCallback((event:any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);


    const onDrop = useCallback((event:any) => {
        event.preventDefault();

      //@ts-ignore
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        let data;

        try {
          data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        } catch (error) {
          return;
        }

        const type = data.type;
        const table:ITable = data.table;
        const column:IColumn = data.column;
  
        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }
      
        const position = reactFlowInstance!.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: `node_${generateUniqueKey()}`,
          type,
          position,
          data: { 
              label: `${table.name}.${column.name}`,
              column:column,
              event:appSatore.onAddNode
          },
        };

  
        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowInstance]
    );


  return (
    <div className='w-full h-full'>
            <div className="reactflow-wrapper w-full h-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodeTypes={NODE_TYPES}
                    edgeTypes={edgeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={(changes: NodeChange[])=>{
                      onNodesChange(changes);
                    }}

                    onNodeDragStop={()=>{
                      updateStore();
                    }}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={(value: React.SetStateAction<ReactFlowInstance | null>)=>{
                      setReactFlowInstance(value);
                      appSatore.setReactFlow(reactFlowInstance2);
                    }}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                >
                    <Controls className='text-white bg-white' />
                </ReactFlow>
            </div>
    </div>
  );
}