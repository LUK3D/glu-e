import { create } from 'zustand'
import { IApp, IColumn, IConsoleStore, IRelation, IRelationError } from '../types'
import { Edge, Node, NodeProps, ReactFlowInstance, addEdge,   } from 'reactflow';
import generateUniqueKey from '../utls/generator';
import { parseSQL } from '../core';


export const useAppStore = create<IApp>((set, get) => ({
 workspace:'Migrations',
 tables:parseSQL(`
    CREATE TABLE users (
        user_id INT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
      );
      
      CREATE TABLE posts (
        post_id INT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
      
      CREATE TABLE comments (
        comment_id INT PRIMARY KEY,
        post_id INT,
        user_id INT,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(post_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
      
      CREATE TABLE categories (
        category_id INT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      );
      
      CREATE TABLE post_category (
        post_id INT,
        category_id INT,
        PRIMARY KEY (post_id, category_id),
        FOREIGN KEY (post_id) REFERENCES posts(post_id),
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
      );
      
    `),
 migrationsEdges:[],
 migrationsNodes:[],
 relations:[],
 setReactFlow:(rf:ReactFlowInstance)=>{
    // const state = get();
    set(()=>({reacFlow:rf}));
    // rf.setNodes(state.migrationsNodes)
    // rf.setEdges(state.migrationsEdges)
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
 }

 
}))



export const consoleStore = create<IConsoleStore>((set, get) => ({
    errors:[],
    log:(errors:IRelationError[])=>{
        let erros = get().errors;
        let nerErrors:IRelationError[] = [];
        
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