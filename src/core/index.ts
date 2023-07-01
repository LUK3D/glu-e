import {
    Node,
    Edge
  } from 'reactflow';
import { IColumn, IRelation, ITable, ConsoleLogTypes } from '../types';



/**
 * # validateNode
 * Function to process and validate all the relations made between nodes (Tables)
 * @param args 
 * @returns 
 */
export function validateNode({ nodes, edges }: { nodes: Node[]; edges: Edge[]}): [IRelation[], boolean] {
    let result: IRelation[] = [];

    let hasBugs = false;

    let nodesMap:Map<string,Node> = new Map();
    let leftNodes:Map<string,Node> = new Map();
    let rightNodes:Map<string,Node> = new Map();


    let relationalNodes:Map<string,Node> = new Map();
    


  
    if(nodes.length<=0 || edges.length <=0){
        return [result, hasBugs];
    }

    nodes.forEach(node => {
        if(node.type == 'relation'){
            relationalNodes.set(node.id, node);
        }
        nodesMap.set(node.id, node);
    });

    let leftCount = 0;
    edges.forEach(edge => {
            let rnt = relationalNodes.get(edge.target);
            //If the node on the Right is a relational node, we get the node on the Left and defined it as start node.
            if(rnt){
                let n = nodesMap.get(edge.source)
                if(n){
                    leftNodes.set(`${rnt.id}|${leftCount}`,n);
                    leftCount++;
                }
            }
            let rns = relationalNodes.get(edge.source);
            //If the node on the left is a relational node, we get the node on the Left and defined it as start node.
            if(rns){
                let n = nodesMap.get(edge.target)
                if(n){
                    rightNodes.set(rns.id,n);
                    
                }
            }
    });

    let arr =Array.from(leftNodes.keys());
    console.table(arr);

    arr.forEach((n)=>{
        let ln = leftNodes.get(n);
        let rn = rightNodes.get(n.split('|')[0]);
        let relation:IRelation = {
            from:ln,
            to:rn,
            errors:[]
        }

        
        if(relation.from?.data['column']['type']?.toString().toLowerCase() != relation.to?.data['column']['type']?.toString().toLowerCase()){
            relation.errors.push({
                type:ConsoleLogTypes.error,
                message:`## of type ## Can't be related to ## of type ##`,
                highights:[`${relation.from?.data['label']}`, `${relation.from?.data['column']['type']}`, `${relation.to?.data['label']}`, `${relation.to?.data['column']['type']}`]
            });
            hasBugs = true;
        }

        if(relation.from && relation.to){
            result.push(relation);
        }
    })

    return [result, hasBugs];
    
}



// Function 1: Prepare SQL String
function prepareSQLString(sql: string): string {
    // Remove comments
    const commentRegex = /--.*$/gm;
    sql = sql.replace(commentRegex, '');
  
    // Remove set statements
    const setRegex = /\/\*![\s\S]*?\*\//gm;
    sql = sql.replace(setRegex, '');
  
    return sql.trim();
  }


  function removeNumberInParentheses(input: string): string {
    return input.replace(/\(\d+\)/gs, '');
  }

 
export function parseSQL(sql: string): ITable[] {
    const query = prepareSQLString(sql).toLowerCase().split('if not exists').join('').split('varchar(').join('varchar (');




    const createTableRegex = /create table\s+(\w+)\s+\(([\s\S]*?)\)[,;]?/g;
    const columnRegex = /`?(\w+)`?\s+(\w+)(?:\((\d+)\))?(?:\s+(not null))?(\s+default\s+(.*?)(?=\s+(?:,|$)))?(?:\s+(primary key)|(unique))?/g;
  
    const tables: ITable[] = [];


  
    let match;
    while ((match = createTableRegex.exec(removeNumberInParentheses(query))) !== null) {
      const tableName = match[1];
      const columnDefinitions = match[2].replace(/\n/g, '');
  
      const columns: IColumn[] = [];
  
      let columnMatch;
      while ((columnMatch = columnRegex.exec(columnDefinitions)) !== null) {
        const columnName = columnMatch[1];
        const columnType = columnMatch[2];
        const columnLength = columnMatch[3] ? parseInt(columnMatch[3], 10) : undefined;
        const isNullable = columnMatch[4] ? false : true;
        const defaultValue = columnMatch[6] ? columnMatch[6] : undefined;
        const isPrimaryKey = columnMatch[7] === 'primary key';
        const isUnique = columnMatch[7] === 'unique';
  
        const column: IColumn = {
          name: columnName,
          type: columnType,
          length: columnLength,
          nullable: isNullable,
          defaultValue: defaultValue,
          primaryKey: isPrimaryKey, // Set primaryKey property based on regex match
          unique: isUnique,
        };
  
        columns.push(column);
      }
  
      const table: ITable = {
        name: tableName,
        columns: columns,
      };
  
      tables.push(table);
    }
  
    return tables;
    }

    
  
  