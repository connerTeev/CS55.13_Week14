import { getSpecialPostIds, getSpecialPostData } from '../../lib/special_data';

import Layout from '../../components/layout';

// define getStaticProps() function - by nextJS
export async function getStaticProps({ params }) {
  const specialPostData = await getSpecialPostData(params.id);
  return {
    props: {
      specialPostData,
    },
  };
}

// define getStaticPaths() - by nextJS
export async function getStaticPaths() {
  const specialPostPaths = await getSpecialPostIds();

  return {
    paths: [...specialPostPaths],
    fallback: false,
  };
}

//export our dynamically routed page component 'Entry'
export default function Entry({ specialPostData }) {
  function postMarkup() {
    return { __html: specialPostData.post_content };
  }
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          {specialPostData ? (
            <>
              <h2 className="card-title">{specialPostData.post_title}</h2>
              <h3 className="card-subtitle mb-2 text-body-secondary">
                {specialPostData.user_login}
              </h3>
              <div
                className="card-text"
                dangerouslySetInnerHTML={postMarkup()}
              />
            </>
          ) : (
            <>
              <p>
                We're sorry. An error has occourred. Please try again later.
              </p>
            </>
          )}
        </div>
      </article>
    </Layout>
  );
}
