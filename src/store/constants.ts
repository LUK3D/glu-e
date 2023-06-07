import { ISelectItem } from "../types";

export enum DataTypes {
    VARCHAR = 'VARCHAR',
    CHAR = 'CHAR',
    TEXT = 'TEXT',
    LONGTEXT = 'LONGTEXT',
    INT = 'INT',
    BIGINT = 'BIGINT',
    FLOAT = 'FLOAT',
    DOUBLE = 'DOUBLE',
    DECIMAL = 'DECIMAL',
    DATE = 'DATE',
    DATETIME = 'DATETIME',
    TIMESTAMP = 'TIMESTAMP',
    TIME = 'TIME',
    BOOLEAN = 'BOOLEAN',
    ENUM = 'ENUM',
    SET = 'SET',
  }
  
  export const DataTypesItems: Array<ISelectItem> = Object.values(DataTypes).map((dataType) => ({
    label: dataType,
    value: dataType,
  }));