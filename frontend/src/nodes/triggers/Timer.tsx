import { Handle, Position } from "@xyflow/react";
import { TimerNodeMetadata } from "../../common/metadata";


export function Timer({data}:{
    data:{
        metadata: TimerNodeMetadata
    },
    isConnectable : boolean
}){
    return <div className="p-4 border">
        Every {data.metadata.time} seconds
        <Handle type="source" position={Position.Right}>

        </Handle>
    </div>
}