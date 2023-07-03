import { Handle, Position, useNodeId } from 'reactflow';
import { useSelector } from 'react-redux';
import 'reactflow/dist/style.css';

import { selectNodes } from '../../redux/selectors';
import { Container } from '../Container/Container';

export const Node = () => {
  const nodeId = useNodeId();
  const nodes = useSelector(selectNodes);

  const firstNode = nodes[0].id === nodeId;

  let handleBgColor = { backgroundColor: '#ADB5BD' };
  if (nodes[nodes.length - 1].id === nodeId) {
    handleBgColor = { backgroundColor: 'transparent' };
  }

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          backgroundColor: 'transparent',
          width: '8',
          border: 'none',
          marginTop: '3px',
        }}
      />
      <Container />
      <Handle
        type="source"
        position={firstNode ? Position.Bottom : Position.Right}
        style={{
          width: '6px',
          border: 'none',
          ...handleBgColor,
          marginTop: '45px',
        }}
      />
    </>
  );
};
