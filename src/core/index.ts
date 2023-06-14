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
export function validateNode(args:{nodes:Node[], edges:Edge[], init: boolean}):[IRelation[], boolean]{
    let result: IRelation[] = [];

    let hasBugs = false;
  
    if(args.nodes.length<=0 || args.edges.length <=0){
        return [result, hasBugs];
    }

    let relation:IRelation = {
        errors:[]
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

                if(relation.from.data['column']['type'] != relation.to.data['column']['type']){
                    relation.errors.push({
                        type:RelatioError.dataType,
                        message:`[${relation.from.data['label']}] of type [${relation.from.data['column']['type']}] Can't be related to [${relation.to.data['label']}] of type [${relation.to.data['column']['type']}]`
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
                    message:`[${relation.from.data['label']}] of type [${relation.from.data['column']['type']}] Can't be related to [${relation.to.data['label']}] of type [${relation.to.data['column']['type']}]`
                });
                hasBugs = true;
            }

            result.push(relation);
            relation = {
                errors:[]
            };
        }
    }

    return [result, hasBugs];;
    
}