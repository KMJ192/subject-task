import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type Props = {
  direction?: 'up' | 'down';
};

function Arrow({ direction = 'up' }: Props) {
  return <i className={cx('arrow', direction)}></i>;
}

export default Arrow;
