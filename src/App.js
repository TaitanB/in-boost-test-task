import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ReactFlow, { Background } from 'reactflow';
import { selectEdges, selectNodes } from './redux/selectors';
import { Node } from './components/Node/Node';

export default function App() {
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);
  const nodeTypes = useMemo(() => ({ Node }), []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background color="#F9FAFF" style={{ backgroundColor: '#F9FAFF' }} />
      </ReactFlow>
    </div>
  );
}
