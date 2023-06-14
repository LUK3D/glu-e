import { create } from 'zustand'
import { IApp, IColumn, IRelation } from '../types'
import { Edge, Node } from 'reactflow';



export const useAppStore = create<IApp>((set, get) => ({
 workspace:'Migrations',
 tables:[
    {
        name:"User",
        columns:[
            {
                name:"id",
                type:'BigInt',
                length:20,
                primaryKey:true,
                autoIncrement: true
            },
            {
                name:"name",
                type:'Varchar',
                length:255,
            },
            {
                name:"email",
                type:'Varchar',
                length:255,
                nullable:true
            },
            {
                name:"email_verified_at",
                type:'Timestamp',
                nullable:true,
            },
            {
                name:"password",
                type:'Varchar',
                length:255,
            },
            {
                name:"remember_token",
                type:'Varchar',
                length:100,
                nullable:true
            },
            {
                name:"created_at",
                type:'Timestamp',
                nullable:true,
            },
            {
                name:"updated_at",
                type:'Timestamp',
                nullable:true,
            },
        ],
        expanded:true
    }
 
 ],
 migrationsEdges:[],
 migrationsNodes:[],
 relations:[],
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
    console.log(tables);
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
 setMigrationNodes:(nodes:Node<{label: string; column?:IColumn}, string | undefined>[])=>{
    set(()=>({migrationsNodes:nodes}));
 }
}))
