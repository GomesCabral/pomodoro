import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Logo() {
  return (
    <h1 className={styles.logo}>
      <a href='#' className={styles.logoLink}>
        <TimerIcon size={64} />
        <span>Chronos</span>
      </a>
    </h1>
  );
}
