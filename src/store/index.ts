import { create } from 'zustand'
import { IApp, IColumn, IConsoleStore, IRelation, ICosoleMessage, ITable } from '../types'
import { Edge, Node, NodeProps, ReactFlowInstance, addEdge,   } from 'reactflow';
import generateUniqueKey from '../utls/generator';
// import { parseSQL } from '../core';


export const useAppStore = create<IApp>((set, get) => ({
 workspace:'Migrations',
 tables:[],
 migrationsEdges:[],
 migrationsNodes:[],
 relations:[],
 openAi:{
    org:'',
    key:''
 },
 setReactFlow:(rf:ReactFlowInstance)=>{
    // const state = get();
    set(()=>({reacFlow:rf}));
    // rf.setNodes(state.migrationsNodes)
    // rf.setEdges(state.migrationsEdges)
 },
 setTables:(tables: ITable[])=>{
    set(()=>({tables:tables}));
 },
 setWorkspace: (w:string)=>set(()=>({workspace:w})),
 createTable:  (tableName:string)=>{
    const tables = get().tables;
    if(tables.filter((e)=>e.name == tableName).length !=0){
        return null;
    }
    tables.push({
        name:tableName,
        columns:[
            {
                name:"id",
                type:'BigInt',
                length:20,
                primaryKey:true,
                autoIncrement: true
            },
        ]
    });
    set(()=>({tables:tables}));
    return true;
 },
 setRelations:(relations: IRelation[])=>set(()=>({relations:relations})),
 updateForeigns:()=>{
    let tables = get().tables;

    var foreigns = get().relations.map((r)=>r.from?.data['column']['name']);

    tables = tables.map((table)=>{
        let t = table;
        t.columns =  t.columns.map(column => {

            if(foreigns.includes(column.name)){
                column.isForeign = true;
            }else{
                column.isForeign = false;
            }

            return column;
            
        });

        return t;
    });

    set(()=>({tables:tables}));
 },
 createColumn: (table:string,column:IColumn)=>{
    const tables = get().tables.filter((x)=>x.name == table);
    if(tables.length<=0){
      return null;
    }

    const columns = tables[0].columns;
    tables[0].columns = [...columns, column];

    set((e)=>({tables:e.tables.map((t)=>{
        if(t.name == table){
            return tables[0];
        }else{
            return t;
        }
    })}));
    return true;
 },
 toggleTable:  (name:string)=>{
    set(()=>({
        tables:
        get().tables.map((e)=>{
            // console.log(e)
            if(e.name == name){
                e.expanded = !e.expanded??false;
            }
            return e;
        })
    }));

 },
 setMigrationEdges:(edges:Edge<any>[])=>{
    set(()=>({migrationsEdges:edges}));
 },
 setMigrationNodes:(nodes:Node<{label: string; column?:IColumn, invalid?:boolean, event:(args:any)=>void}, string | undefined>[])=>{
    set(()=>({migrationsNodes:nodes}));
 },

 onAddNode: (props:NodeProps)=>{

    const state = get();

    const newNode = {
        id: `node_${generateUniqueKey()}`,
        type:'relation',
        position:{x:(props.xPos??0)+400, y:props.yPos},
        data: { 
            label: `relational node`,
        },
      };

      state.reacFlow?.setNodes((nds)=>nds.concat(newNode));

      setTimeout(() => {
        state.reacFlow?.setEdges((eds) => addEdge({source: props.id, sourceHandle: 'right', target: newNode.id, targetHandle: 'left'}, eds));   
      }, 100);

},

 loadSave:(appStorage: IApp)=>{
    const state = get();

    appStorage.migrationsNodes = appStorage.migrationsNodes.map((mn)=>{
        mn.data.event = state.onAddNode;

        return mn;
    })


     
     
     set(()=>({
         workspace: appStorage.workspace,
         tables: appStorage.tables,
         migrationsEdges: appStorage.migrationsEdges,
         migrationsNodes: appStorage.migrationsNodes,
         relations: appStorage.relations,
    }));
        
   
    if(state.reacFlow){
        console.log('LOADING:', state.migrationsEdges );
        state.reacFlow.setNodes(state.migrationsNodes)
        state.reacFlow.setEdges(state.migrationsEdges)
    }
 },
 setAiCredencials: (openAi:{org:string, key:string})=>{
        set(()=>({openAi:openAi}));
 },
 expandAllTables: ()=>{
    set((state)=>({
        tables:state.tables.map((t)=>{
            t.expanded = true;
            return t;
        })
    }))
 },

 removeTable:(table:ITable)=>{
    let relations = get().relations;
    const rf = get().reacFlow;
    let nodes = rf?.getNodes()??[];

    relations =  relations.filter((r)=>{
        const names = r.from?.data['label'].split('.');
        let fromCheck =  names[0]!= table.name ;

        const names2 = r.to?.data['label'].split('.');
        let toCheck =  names2[0]!=table.name;

        if(!fromCheck){
            nodes = nodes.filter((n)=>n.id != r.from?.id);
        }
        if(!toCheck){
            nodes = nodes.filter((n)=>n.id != r.to?.id);
        }

        return fromCheck && toCheck ;

    });
    rf?.setNodes(nodes);

    set((state)=>({relations, tables:state.tables.filter((t)=>t.name!=table.name)}));
 },
 removeColumn:(table:ITable,column:IColumn)=>{
    let relations = get().relations;
    const rf = get().reacFlow;
    let nodes = rf?.getNodes()??[];

    relations.filter((r)=>{
        const names = r.from?.data['label'].split('.');
        let fromCheck =  names[0]!=table.name && names[1] !=column.name;

        const names2 = r.to?.data['label'].split('.');
        let toCheck =  names2[0]!=table.name && names2[1] !=column.name;

        if(!fromCheck){
            nodes = nodes.filter((n)=>n.id != r.from?.id);
        }
        if(!toCheck){
            nodes = nodes.filter((n)=>n.id != r.to?.id);
        }

        rf?.setNodes(nodes);

        return fromCheck && toCheck ;

    })


    set((state)=>({
        relations,
        tables:state.tables.map((t)=>{
        if(t.name == table.name){
            table.columns = table.columns.filter((c)=>c.name!=column.name);
        }
        return t;
    })}))
 }

 
}))



export const consoleStore = create<IConsoleStore>((set, get) => ({
    errors:[],
    log:(errors:ICosoleMessage[])=>{
        let erros = get().errors;
        let nerErrors:ICosoleMessage[] = [];
        
        erros.forEach((r)=>{
            let identics = 0;

            r.highights?.forEach(element => {
                errors.forEach((e)=>{
                    if(e.highights?.includes(element)){
                        identics +=1;
                    }
                })
            })
            if(identics != r.highights?.length){
                nerErrors.push(r);
            }
        })



        
        set(()=>({errors:[...nerErrors,...errors]}));
    }
}));