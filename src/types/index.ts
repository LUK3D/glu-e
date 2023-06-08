
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
export interface Itable{
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


/**
 * ## IApp 🚀
 * Represents the main App Object
 */
export interface IApp{
    workspace:string,
    tables:Array<Itable>,
    migrationsNodes:Node<{label: string;}, string | undefined>[],
    migrationsEdges:Edge<any>[],
    setMigrationNodes: Function,
    setMigrationEdges: Function,

    setWorkspace: Function,
    createTable: Function,
    createColumn: Function,
    toggleTable: Function,
}
