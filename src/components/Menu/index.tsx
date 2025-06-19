import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
    //document.documentElement.setAttribute('data-theme', theme);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a href='#' className={styles.menuLink} aria-label='Home' title='Home'>
        <HouseIcon size={64} />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='History'
        title='History'
      >
        <HistoryIcon size={64} />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Settings'
        title='Settings'
      >
        <SettingsIcon size={64} />
      </a>
      <a
        onClick={handleThemeChange}
        href='#'
        className={styles.menuLink}
        aria-label='Change Theme'
        title='Change Theme'
      >
        {theme === 'dark' ? <SunIcon size={64} /> : <MoonIcon size={64} />}
      </a>
    </nav>
  );
}
