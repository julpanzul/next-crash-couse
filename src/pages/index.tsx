import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className={styles.description}>
        Get started by editing{' '}
        <code className={styles.code}>pages/index.tsx</code>
      </p>

      <div className={styles.grid}>
        <Link href='/users' passHref>
          <a className={styles.card}>
            <h2>Next Route &rarr;</h2>
          </a>
        </Link>
        <Link href='/products' passHref>
          <a className={styles.card}>
            <h2>Next Filter &rarr;</h2>
          </a>
        </Link>
      </div>
    </>
  )
}

export default Home
