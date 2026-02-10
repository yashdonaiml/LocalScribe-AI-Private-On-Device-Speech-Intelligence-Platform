import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>Want to connect?</p>
      <a
        href="https://www.linkedin.com/in/yaswanthkumard/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Add me on LinkedIn →
      </a>
    </footer>
  );
}
