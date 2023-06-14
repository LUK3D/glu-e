import {
    Node,
    Edge
  } from 'reactflow';
import { IRelation } from '../types';




/**
 * # validateNode
 * Function to process and validate all the relations made between nodes (Tables)
 * @param args 
 * @returns 
 */
export function validateNode(args:{nodes:Node[], edges:Edge[], init: boolean}){
    let result: IRelation[] = [];
  
    if(args.nodes.length<=0 || args.edges.length <=0){
        return result;
    }

    let relation:IRelation = {
    }

    for (let i = 0; i < args.nodes.length; i++) {
        const currentNode = args.nodes[i];
    
        args.edges.forEach(source => {
            if(currentNode.id == source.source){
                if(currentNode.type != 'relation')
                relation.from = currentNode;
            }

            args.edges.forEach(target => {
                if(currentNode.id == target.target){
                    if(currentNode.type != 'relation')
                    relation.to = currentNode;
                }
            });

            if(relation.from && relation.to){
                result.push(relation);
                relation = {};
            }
            
        });

        if(relation.from && relation.to){
            result.push(relation);
            relation = {};
        }
    }
   
    return result;
    
}