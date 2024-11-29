import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedFruitsList } from '../lib/fruit_data';

// define a getStaticProps() function -this name is defined by next.js
export async function getStaticProps() {
  const fruitDataList = await getSortedFruitsList();
  return {
    props: { fruitDataList },
  };
}

// Building root page and exporting
export default function Home({ fruitDataList }) {
  return (
    <Layout home>
      <h1>WP REST API</h1>
      <h2 className="m-3">Posts</h2>
      <div className="list-group">
        {fruitDataList.map(({ id, name }) => (
          <Link
            key={id}
            href={`/${id}`}
            className="list-group-item list-group-item-action"
          >
            {name}
          </Link>
        ))}
      </div>
    </Layout>
  );
}
