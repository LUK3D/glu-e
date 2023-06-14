import {
    Node,
    Edge
  } from 'reactflow';
import { IRelation, RelatioError } from '../types';




/**
 * # validateNode
 * Function to process and validate all the relations made between nodes (Tables)
 * @param args 
 * @returns 
 */
export function validateNode({ nodes, edges, init }: { nodes: Node[]; edges: Edge[]; init: boolean }): [IRelation[], boolean] {
    let result: IRelation[] = [];

    let hasBugs = false;
  
    if(nodes.length<=0 || edges.length <=0){
        return [result, hasBugs];
    }

    let relation:IRelation = {
        errors:[]
    }

    for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];
    
        edges.forEach(source => {
            if(currentNode.id == source.source){
                if(currentNode.type != 'relation'){
                    relation.from = currentNode;
                }
            }

            edges.forEach(target => {
                if(currentNode.id == target.target){
                    if(currentNode.type != 'relation'){
                        relation.to = currentNode;
                    }
                }
            });

            if(relation.from && relation.to){

                if(relation.from.data['column']['type'] != relation.to.data['column']['type']){
                    relation.errors.push({
                        type:RelatioError.dataType,
                        message:`## of type ## Can't be related to ## of type ##`,
                        highights:[`${relation.from.data['label']}`, `${relation.from.data['column']['type']}`, `${relation.to.data['label']}`, `${relation.to.data['column']['type']}`]
                    });
                    hasBugs = true;
                }

                result.push(relation);
                relation = {
                    errors:[]
                };
            }
            
        });

        if(relation.from && relation.to){
            if(relation.from.data['column']['type'] != relation.to.data['column']['type']){
                relation.errors.push({
                    type:RelatioError.dataType,
                    message:`## of type ## Can't be related to ## of type ##`,
                    highights:[`${relation.from.data['label']}`, `${relation.from.data['column']['type']}`, `${relation.to.data['label']}`, `${relation.to.data['column']['type']}`]
                });
                hasBugs = true;
            }

            result.push(relation);
            relation = {
                errors:[]
            };
        }
    }

    return [result, hasBugs];
    
}

