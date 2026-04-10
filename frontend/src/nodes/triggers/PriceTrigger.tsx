import { Handle, Position } from "@xyflow/react";
import { PriceTriggerMetadata } from "../../common/metadata";

export function PriceTrigger({data, isConnectable}:{
    data:{
        metadata: PriceTriggerMetadata
    },
    isConnectable : boolean
}){
    return <div className="p-4 border">
        <div> {data.metadata.asset}</div>
       
        <div>{data.metadata.price}</div>
        <Handle type="source" position={Position.Right}>

        </Handle>
    </div>
}