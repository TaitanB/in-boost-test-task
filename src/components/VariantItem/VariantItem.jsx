import { useNodeId } from 'reactflow';
import { useSelector, useDispatch } from 'react-redux';

import { cutNodeList, setNode, updateSelectText } from '../../redux/slice';
import { selectChoosedVariants } from '../../redux/selectors';

import css from './VariantItem.module.css';

export const VariantItem = ({
  value,
  choosedVariant,
  setChoosedVariant,
  setVariantsListOpen,
}) => {
  const nodeId = useNodeId();
  const dispatch = useDispatch();

  const choosedVariantsArray = useSelector(selectChoosedVariants);

  const handleSetNode = (nodeId, value) => {
    const nodeIndex = choosedVariantsArray.findIndex(
      node => node.nodeId === nodeId
    );

    const choosedVariantsCurrentNode = choosedVariantsArray.slice(
      0,
      nodeIndex + 1
    );
    const currentChosenValues = choosedVariantsCurrentNode
      .map(item => item.value)
      .join('-');

    const newSelectText = `Варіант ${currentChosenValues}`;

    if (nodeIndex !== -1) {
      dispatch(cutNodeList(nodeId));
      dispatch(setNode({ nodeId, value }));
      dispatch(updateSelectText(newSelectText));
    }
  };

  const onChange = () => {
    setChoosedVariant(value);
    setVariantsListOpen(false);
    dispatch(setNode({ nodeId, value }));
    handleSetNode(nodeId, value);
  };

  return (
    <li className={css.item}>
      <input
        className={css.checkbox}
        id={`variant${value}`}
        type="checkbox"
        onChange={onChange}
        value={value}
        checked={value === choosedVariant}
      />

      <label className={css.label} htmlFor={`variant${value}`}>
        {`Варіант ${value}`}
      </label>
    </li>
  );
};
