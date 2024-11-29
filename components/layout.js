import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <title>REST pracatice</title>
      </Head>
      <header>
        <nav className="m-3">
          <Link href="/">REST.com</Link>
        </nav>
      </header>
      <main>{children}</main>
      {!home && (
        <Link href="/" className="btn btn-primary mt-3">
          ← Back to home
        </Link>
      )}
      <footer>
        <p className="text-center m-3">
          <em>Where WP meets REST</em>
        </p>
      </footer>
    </>
  );
}
