import { useEffect, type ReactNode, useRef, Ref, forwardRef } from 'react';

import type { OVER_RIDABLE_PROPS } from '@src/types/types';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children?: ReactNode;
  loadCnt?: number;
  loading?: boolean;
  loadingElement?: ReactNode;
  hasNext?: boolean;
  onLoad?: () => void;
};

const DEFAULT_ELEMENT = 'div';

type Props<T extends React.ElementType> = OVER_RIDABLE_PROPS<T, BaseProps>;

function InfiniteScroll<T extends React.ElementType = typeof DEFAULT_ELEMENT>(
  {
    as,
    children,
    loadCnt,
    loading,
    loadingElement,
    hasNext,
    onLoad,
    className,
    ...props
  }: Props<T>,
  ref: Ref<any>,
) {
  const ELEMENT = as || DEFAULT_ELEMENT;

  const observingNodeRef = useRef<HTMLDivElement>(null);

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (onLoad) onLoad();
        observer.disconnect();
      }
    });
  });

  useEffect(() => {
    if (observingNodeRef.current) {
      observer.observe(observingNodeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadCnt]);

  return (
    <ELEMENT {...props} ref={ref} className={cx('container', className)}>
      {children}
      <div ref={observingNodeRef} className={cx('loader', { hasNext })}>
        {loading && loadingElement}
      </div>
    </ELEMENT>
  );
}

export default forwardRef(InfiniteScroll) as typeof InfiniteScroll;
