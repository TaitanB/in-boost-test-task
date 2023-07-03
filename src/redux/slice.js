import { createSlice } from '@reduxjs/toolkit';
import { MarkerType } from 'reactflow';

const initialNodes = [
  { id: '0', type: 'Node', position: { x: 30, y: 30 }, zindex: 1000 },
];

const initialState = {
  nodes: initialNodes,
  edges: [],
  choosedVariants: [],
  selectText: [],
};

export const slice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    setNode(state, { payload }) {
      const { nodeId, value } = payload;
      const nextNodeConnectionIndex = state.nodes.findIndex(
        node => Number(node.id) === Number(nodeId) + 1
      );

      if (nextNodeConnectionIndex === -1) {
        const x = state.nodes[state.nodes.length - 1].position.x + 317;
        const y = state.nodes[state.nodes.length - 1].position.y + 150;

        state.nodes.push({
          id: `${Number(nodeId) + 1}`,
          type: 'Node',
          position: { x, y },
          zindex: 1000 - Number(nodeId),
        });

        state.edges.push({
          id: `${nodeId}-${Number(nodeId) + 1}`,
          source: `${nodeId}`,
          target: `${Number(nodeId) + 1}`,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.Arrow },
        });

        state.choosedVariants.push({ nodeId, value });
        return;
      }
      if (state.choosedVariants[nextNodeConnectionIndex - 1].value !== value) {
        state.choosedVariants[nextNodeConnectionIndex - 1].value = value;
      }
    },

    updateSelectText(state, { payload }) {
      const { nodeIndex, newSelectText } = payload;

      state.selectText = state.selectText.slice(0, nodeIndex);
      state.selectText.push(newSelectText);
    },

    cutNodeList(state, { payload }) {
      const nodeIndex = state.nodes.findIndex(node => node.id === payload);

      state.nodes = state.nodes.slice(0, nodeIndex + 1);
      state.edges = state.edges.slice(0, nodeIndex);
      state.choosedVariants = state.choosedVariants.slice(0, nodeIndex);
      state.selectText = state.selectText.slice(0, nodeIndex);
    },
  },
});

export const { setNode, updateSelectText, cutNodeList } = slice.actions;

export const nodeReducer = slice.reducer;
