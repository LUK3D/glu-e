import { create } from 'zustand'
import { IApp, IColumn } from '../types'



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
 setWorkspace: (w:string)=>set(()=>({workspace:w})),
 createTable: function (tableName:string){
    const tables = get().tables;
    console.log(tables.filter((e)=>e.name == tableName));
    if(tables.filter((e)=>e.name == tableName).length !=0){
        return;
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

 createColumn:function (table:string,column:IColumn){
    const tables = get().tables.filter((x)=>x.name == table);
    if(tables.length<=0){
      return;
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
 toggleTable: function (name:string){
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
 

}))
