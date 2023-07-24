import React from 'react';

import type { COMBINE_ELEMENT_PROPS } from '@src/types/types';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children?: React.ReactNode;
};

const ELEMENT = 'button';

type Props<T extends React.ElementType> = COMBINE_ELEMENT_PROPS<T, BaseProps>;

function Button<T extends React.ElementType = typeof ELEMENT>(
  { children, className, ...props }: Props<T>,
  ref: React.Ref<any>,
) {
  return (
    <ELEMENT {...props} ref={ref} className={cx('button', className)}>
      {children}
    </ELEMENT>
  );
}

export default React.forwardRef(Button) as typeof Button;
