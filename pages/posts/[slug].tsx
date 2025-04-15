import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import {
  getPostData,
  getSortedPostsData,
  RenderedMarkdownDocument,
} from '../../lib/posts';
import Date from '../../components/date';

interface PostProps {
  post: RenderedMarkdownDocument | undefined;
}

export default function Post({ post }: PostProps) {
  return (
    <Layout>
      {post ? (
        <>
          <Head>
            <title>{post.title}</title>
          </Head>
          <h1>{post.title}</h1>
          <p className={utilStyles.lead}>By {post.author}, <Date dateString={post.date}></Date></p>
          <div data-testid="content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </>
      ) : (
        <p>404 - not found</p>
      )}
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getSortedPostsData();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<
  PostProps,
  { slug: string }
> = async ({ params }) => {
  const post = await getPostData(params!.slug);
  return { props: { post } };
};
