// Global styles added
import '../styles/globals.css';
import '../styles/bootstrap.min.css';

// Configuring next.js main component 'MyApp'
export default function MyApp({Component, pageProps}) {
  return (
    <Component {...pageProps} />
  )
}