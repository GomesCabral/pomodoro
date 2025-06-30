import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro'>
        Gomes Cabral - Pomodoro Technique
      </RouterLink>
      <RouterLink href='/'> &copy; {new Date().getFullYear()}</RouterLink>
    </footer>
  );
}
