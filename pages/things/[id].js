import { getThingsPostIds, getThingsPostData } from '../lib/things_data';

import Layout from '../../components/layout';

// define getStaticProps() function - by nextJS
export async function getStaticProps({ params }) {
  const thingsPostData = await getThingsPostData(params.id);
  return {
    props: {
      thingsPostData,
    },
    revalidate: 60,
  };
}

// define getStaticPaths() - by nextJS
export async function getStaticPaths() {
  const thingsPostPaths = await getThingsPostIds();

  return {
    paths: [...thingsPostPaths],
    fallback: false,
  };
}

//export our dynamically routed page component 'Entry'
export default function Entry({ thingsPostData }) {
  function postMarkup() {
    return { __html: thingsPostData.thing_description };
  }
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          {thingsPostData ? (
            <>
              <h2 className="card-title">{thingsPostData.post_title}</h2>
              <h3 className="card-subtitle mb-2 text-body-secondary">
                {thingsPostData.thing_address}
              </h3>
              <div
                className="card-text"
                dangerouslySetInnerHTML={postMarkup()}
              />
            </>
          ) : (
            <>
              <p>Sorry. An error has occourred. Please try again later.</p>
            </>
          )}
        </div>
      </article>
    </Layout>
  );
}
