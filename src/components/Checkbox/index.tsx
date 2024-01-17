import { FC } from 'react';

import './styles.scss';

interface Props {
  label: string;
  checked: boolean;
  onChange: VoidFunction;
}

const Checkbox: FC<Props> = ({ label, checked, onChange }) => (
  <label className='container'>
    {label}
    <input type='checkbox' checked={checked} onChange={onChange} />
    <span className='checkmark'></span>
  </label>
);

export default Checkbox;
