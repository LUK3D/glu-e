import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowRefType,
  NodeProps,
} from 'reactflow';

import 'reactflow/dist/style.css';
import TableNode from '../../../components/nodes/tableNode';
import RelationNode from '../../../components/nodes/relationNode';
import { IApp, IColumn, Itable } from '../../../types';


const NODE_TYPES = {
    table:TableNode,
    relation:RelationNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Canvas(props:{appSatore:IApp}) {

    const reactFlowWrapper = useRef<ReactFlowRefType>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    const [nodes, setNodes, onNodesChange] = useNodesState(props.appSatore.migrationsNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.appSatore.migrationsEdges);

    const onConnect = useCallback((params:any) =>{
        console.log("PARAMS:",params);
        setEdges((eds) => addEdge(params, eds));
    }, [setEdges]);

    useEffect(() => {
        props.appSatore.setMigrationNodes(nodes);
        props.appSatore.setMigrationEdges(edges);
        console.log(edges);
    }, [edges]);


    const onDragOver = useCallback((event:any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);



      const onAddNode = (props:NodeProps)=>{
        const newNode = {
            id: getId(),
            type:'relation',
            position:{x:(props.xPos??0)+400, y:props.yPos},
            data: { 
                label: `relational node`,
            },
          };

        setNodes((nds) => nds.concat(newNode));
        setTimeout(() => {
            setEdges((eds) => addEdge({source: props.id, sourceHandle: 'right', target: newNode.id, targetHandle: 'left'}, eds));   
        }, 100);
        
        console.log(props);
      }


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
          const table:Itable = data.table;
          const column:IColumn = data.column;
          console.log(data)
    
          // check if the dropped element is valid
          if (typeof type === 'undefined' || !type) {
            return;
          }
        //@ts-ignore
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });
          const newNode = {
            id: getId(),
            type,
            position,
            data: { 
                label: `${table.name}.${column.name}`,
                event:onAddNode
            },
          };
    
          setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
      );




  return (
    <div className='w-full h-full'>
        <ReactFlowProvider>
            <div className="reactflow-wrapper w-full h-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodeTypes={NODE_TYPES}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={(e:any)=>setReactFlowInstance(e)}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                >
                    <Controls className='text-white bg-white' />
                    <MiniMap />
                   
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    </div>
  );
}