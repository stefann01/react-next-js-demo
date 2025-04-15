import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData, MarkdownDocument } from '../lib/posts';
import { DaysAgo } from '../components/date';

interface HomeProps {
  posts: MarkdownDocument[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <ul className={utilStyles.nolist}>
          <li>🤝 Open source advocate</li>
          <li>👽 Maintainer of @stryker_mutator</li>
          <li>💼 Front end architect @InfoSupportBV</li>
          <li>💚 Loves green energy and EV&amp;s</li>
        </ul>
        <p>Welcome to my blog!</p>
      </section>
      <section>
        <ul>
          {posts.map(({ date, title, slug }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DaysAgo dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  const posts = getSortedPostsData();
  return { props: { posts } };
}
