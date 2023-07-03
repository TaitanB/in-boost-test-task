import { VariantsList } from '../VariantsList/VariantsList';
import { Select } from 'components/Select/Select';
import css from './Container.module.css';

export const Container = () => {
  return (
    <>
      <div className={css.nodeContainer}>
        <div className={css.bgWraper}></div>
        <Select />
      </div>
      <VariantsList />
    </>
  );
};
