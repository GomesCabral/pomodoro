import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a>Gomes Cabral - Pomodoro Technique</a>
      <a> &copy; {new Date().getFullYear()}</a>
    </footer>
  );
}
