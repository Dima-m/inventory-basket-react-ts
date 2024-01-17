import { FC } from 'react';

import './styles.scss';

interface Props {
  text: string;
  onClick: VoidFunction;
  disabled?: boolean;
  outlined?: boolean;
  danger?: boolean;
}

const Button: FC<Props> = ({ text, onClick, disabled, outlined, danger }) => (
  <button
    className={`button ${danger ? 'danger' : ''} ${outlined ? 'outlined' : ''}`}
    type='button'
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    disabled={disabled}>
    {text}
  </button>
);

export default Button;
