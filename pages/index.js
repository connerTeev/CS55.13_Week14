import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedSpecialPostsList } from '../lib/special_data';
import { getSortedThingsPostsList } from '../lib/things_data';

// define a getStaticProps() function -this name is defined by next.js
export async function getStaticProps() {
  const specialPostsDataList = await getSortedSpecialPostsList();
  const thingsPostsDataList = await getSortedThingsPostsList();
  console.log('thingsPostsDataList STARTS HERE: ' + thingsPostsDataList);
  return {
    props: { specialPostsDataList, thingsPostsDataList },
    // implementing ISR
    revalidate: 60,
  };
}

// Building root page and exporting
export default function Home({ specialPostsDataList, thingsPostsDataList }) {
  return (
    <Layout home>
      <h1>WP REST API</h1>
      <h2 className="m-3">Special Posts</h2>
      <div className="list-group">
        {specialPostsDataList ? (
          specialPostsDataList.map(({ id, name }) => (
            <Link
              key={id}
              href={`/${id}`}
              className="list-group-item list-group-item-action"
            >
              {name}
            </Link>
          ))
        ) : (
          <p>Not available...</p>
        )}
      </div>
      <h2 className="m-3">Things Posts</h2>
      <div className="list-group">
        {thingsPostsDataList ? (
          thingsPostsDataList.map(({ id, post_title }) => (
            <Link
              key={id}
              href={`/${id}`}
              className="list-group-item list-group-item-action"
            >
              {post_title}
            </Link>
          ))
        ) : (
          <p>Not available...</p>
        )}
      </div>
    </Layout>
  );
}
