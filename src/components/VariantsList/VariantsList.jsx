import { VariantItem } from '../VariantItem/VariantItem';
import css from './VariantsList.module.css';

export const VariantsList = ({
  variantsListOpen,
  choosedVariant,
  setChoosedVariant,
  setVariantsListOpen,
}) => {
  let allVariants = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {variantsListOpen && (
        <ul className={css.list}>
          {allVariants.map(variant => (
            <VariantItem
              key={variant}
              value={variant}
              choosedVariant={choosedVariant}
              setChoosedVariant={setChoosedVariant}
              setVariantsListOpen={setVariantsListOpen}
            />
          ))}
        </ul>
      )}
    </>
  );
};
