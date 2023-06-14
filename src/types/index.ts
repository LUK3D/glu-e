
import {

    Edge,
    Node
  } from 'reactflow';
/**
 * ## IColumn 🚀
 * Represents a column in a database table.
 */
export interface IColumn {
    /** The name of the column. */
    name: string,
    /** The data type of the column. */
    type: string,
    /** (Optional) The length or size of the column. */
    length?: number,
    /** (Optional) Indicates whether the column allows null values. */
    nullable?: boolean,
    /** (Optional) The default value of the column. */
    defaultValue?: any,
    /** (Optional) Indicates whether the column is a primary key. */
    primaryKey?: boolean,
    /** (Optional) Indicates whether the column is a foreign key. */
    isForeign?: boolean,
    /** (Optional) Indicates whether the column auto-increments. */
    autoIncrement?: boolean,
    /** (Optional) Indicates whether the column has a unique constraint. */
    unique?: boolean,
    /** (Optional) Additional comment or description for the column. */
    comment?: string,
  }

/**
 * # Itable 🚀
 * Represents a table on database 
 */
export interface ITable{
    name:string,
    expanded?:boolean,
    /** A List of columns for this table */
    columns:Array<IColumn>,
    comment?:string
}

export interface ISelectItem{
    label:string,
    value:any
}


export enum RelatioError{
  dataType = 'DATA_TYPE',
}
export interface IRelationError{
  type:RelatioError,
  message:string,
  highights?:string[]
}

export interface IRelation{
  from?:Node,
  to?:Node,
  mode?:number,
  errors:IRelationError[]
}


export interface IConsoleStore{
  errors:IRelationError[],
  log: (errors:IRelationError[])=>void
}


/**
 * ## IApp 🚀
 * Represents the main App Object
 */
export interface IApp{
    workspace:string,
    tables:Array<ITable>,
    migrationsNodes:Node<{label: string; column?:IColumn, invalid?:boolean}, string | undefined>[],
    migrationsEdges:Edge<any>[],
    relations:IRelation[],
    setMigrationNodes: Function,
    setMigrationEdges: (edges:Edge<any>[])=>void,
    setRelations: (relations:IRelation[])=>void,
    setWorkspace: (w:string)=>void,
    createTable: (name:string)=>boolean|null,
    createColumn: (table:string,column:IColumn)=>boolean|null,
    /**Toggles the table element in outline */
    toggleTable: (name:string)=>void,
    updateForeigns: ()=>void,
}
