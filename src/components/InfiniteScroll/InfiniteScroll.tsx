import { useEffect, useRef, forwardRef } from 'react';
import type { ReactNode, Ref, ElementRef } from 'react';

import type { OVER_RIDABLE_PROPS } from '@src/types/types';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type BaseProps = {
  children?: ReactNode;
  loadCnt?: number;
  isLoading?: boolean;
  loadingElement?: ReactNode;
  hasNext?: boolean;
  isObserve?: boolean;
  onLoad?: () => void;
};

const DEFAULT_ELEMENT = 'div';

type Props<T extends React.ElementType> = OVER_RIDABLE_PROPS<T, BaseProps>;

function InfiniteScroll<T extends React.ElementType = typeof DEFAULT_ELEMENT>(
  {
    as,
    children,
    loadCnt,
    isLoading,
    loadingElement,
    hasNext,
    isObserve = true,
    onLoad,
    className,
    ...props
  }: Props<T>,
  ref: Ref<ElementRef<typeof DEFAULT_ELEMENT>>,
) {
  const ELEMENT = as || DEFAULT_ELEMENT;

  const observingNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isObserve) {
      const observer = new IntersectionObserver((entries) => {
        if (Array.isArray(entries) && entries[0].isIntersecting) {
          if (onLoad) onLoad();
        }
      });

      if (observingNodeRef.current) {
        observer.observe(observingNodeRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
    return () => {};
  }, [loadCnt, isObserve]);

  return (
    <ELEMENT {...props} ref={ref} className={cx('container', className)}>
      {children}
      <div ref={observingNodeRef} className={cx('loader', { hasNext })}>
        {isLoading && loadingElement}
      </div>
    </ELEMENT>
  );
}

export default forwardRef(InfiniteScroll) as typeof InfiniteScroll;
