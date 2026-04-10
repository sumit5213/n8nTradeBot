import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { Timer } from '@/nodes/triggers/Timer';
import { Lighter } from '@/nodes/actions/Lighter';
import { ActionSheet } from './ActionSheet';
import { Backpack } from '@/nodes/actions/Backpack';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';
import { PriceTriggerMetadata, TimerNodeMetadata, TradingMetadata } from '../common/metadata';


const nodeTypes = {
  "price-trigger": PriceTrigger,
  "timer": Timer,
  "lighter": Lighter,
  "backpack": Backpack,
  "hyperliquid": Hyperliquid
}

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter"

interface NodeType {
  type: NodeKind,
  data: {
    kind: "action" | "trigger",
    metadata: NodeMetaData
    // label: string
  }, id: string,
  position: { x: number, y: number }
}

interface Edge {
  id: string,
  source: string,
  target: string
}

export type NodeMetaData = TradingMetadata | PriceTriggerMetadata | TimerNodeMetadata;


export default function App() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectAction, setSelectedAction] = useState<{
    position:{
      x: number,
      y: number,
    }, startingNodeId: string,
  } | null >(null);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const POSITION_OFFSET = 30
  const onConnectEnd = useCallback( ( connectionInfo: any) => {
    if (!connectionInfo.isValid) {
      setSelectedAction({
        startingNodeId: connectionInfo.fromNode.id,
        position: {
          x: connectionInfo.from.x + POSITION_OFFSET,
          y: connectionInfo.from.y + POSITION_OFFSET
        }
      })
      // console.log(connectionInfo.fromNode.id)
      // console.log(connectionInfo.fromNode.to)
    }
  },[]
  )


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && <TriggerSheet onSelect={(type, metadata) => {
        setNodes([...nodes, {
          id: Math.random().toString(),
          type,
          data: {
            kind: "trigger",
            metadata,
            // label: kind
          },
          position: { x: 0, y: 0 }
        }])

      }} />}

      {selectAction && <ActionSheet onSelect={(type, metadata)=>{
        const nodeId = Math.random().toString();
        setNodes([...nodes, {
          id: nodeId,
          type,
          data: {
            kind: "action",
            metadata,
            // label: kind
          },
          position: selectAction.position
        }]);
        setEdges([...edges,{
          id: `${selectAction.startingNodeId}-${nodeId}`,
          source: selectAction.startingNodeId,
          target: nodeId
        }])
          setSelectedAction(null)
      }}/>}

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}