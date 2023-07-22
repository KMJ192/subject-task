import type { ReactNode } from 'react';

import style from './style.module.scss';

type Props = {
  children: ReactNode;
  disabled?: boolean;
};

function Button({ children, disabled = false }: Props) {
  return (
    <button className={style.button} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
