import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { getAllPostIds, getSortedPostsData } from '../../../lib/posts';

 
export const getStaticProps = (async (context) => {
    const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
    };
}) satisfies GetStaticProps
 
export const getStaticPaths = (async () => {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
}) satisfies GetStaticPaths
 
export const getServerSideProps = (async (context) => {
  // ...
}) satisfies GetServerSideProps