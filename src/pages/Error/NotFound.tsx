import style from './style.module.scss';

function NotFound() {
  return <div className={style.error}>페이지를 찾을 수 없습니다.</div>;
}

export default NotFound;
