import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNodeId } from 'reactflow';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import {
  selectSelectedText,
  selectChoosedVariants,
} from '../../redux/selectors';
import { VariantsList } from '../VariantsList/VariantsList';
import { updateSelectText } from '../../redux/slice';

import css from './Select.module.css';

export const Select = () => {
  const nodeId = useNodeId();

  const choosedVariantsArray = useSelector(selectChoosedVariants);
  const selectText = useSelector(selectSelectedText);

  const [variantsListOpen, setVariantsListOpen] = useState(false);
  const [choosedVariant, setChoosedVariant] = useState('Вибрати значення');
  const [selectTextValue, setSelectTextValue] = useState(
    selectText[nodeId] || 'Вибрати значення'
  );

  const dispatch = useDispatch();

  const nodeIndex = choosedVariantsArray.findIndex(
    node => node.nodeId === nodeId
  );

  const choosedVariantsCurrentNode = choosedVariantsArray.slice(
    0,
    nodeIndex + 1
  );

  const chosenNode = choosedVariantsCurrentNode[nodeIndex];

  const currentChosenValues = choosedVariantsCurrentNode
    .map(item => item.value)
    .join('-');

  useEffect(() => {
    if (nodeIndex !== -1 && chosenNode.nodeId === nodeId) {
      setChoosedVariant(chosenNode.value);
    }
  }, [chosenNode, nodeIndex, nodeId]);

  useEffect(() => {
    if (variantsListOpen) {
      setSelectTextValue('Виберіть значення');
    } else {
      if (choosedVariant !== 'Вибрати значення') {
        const newSelectText = currentChosenValues
          ? `Варіант ${currentChosenValues}`
          : 'Вибрати значення';

        setSelectTextValue(newSelectText);
        dispatch(updateSelectText({ nodeIndex, newSelectText }));
      }
    }
  }, [
    variantsListOpen,
    choosedVariant,
    currentChosenValues,
    dispatch,
    nodeIndex,
  ]);

  return (
    <>
      <div className={css.selectContainer}>
        <div
          className={css.select}
          onClick={() => setVariantsListOpen(!variantsListOpen)}
        >
          {selectTextValue}
        </div>
        {variantsListOpen ? (
          <IoIosArrowUp color="#2C7DFA" size="24px" />
        ) : (
          <IoIosArrowDown color="#2C7DFA" size="24px" />
        )}
      </div>
      <VariantsList
        variantsListOpen={variantsListOpen}
        choosedVariant={choosedVariant}
        setChoosedVariant={setChoosedVariant}
        setVariantsListOpen={setVariantsListOpen}
      />
    </>
  );
};
