import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface MarkdownDocument {
  date: string;
  author: string;
  title: string;
  slug: string;
  content: string;
}

export interface RenderedMarkdownDocument extends MarkdownDocument {
  contentHtml: string;
}

export function getSortedPostsData(): MarkdownDocument[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      ...matterResult.data,
      content: matterResult.content,
    } as MarkdownDocument;
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function getPostData(
  slug: string
): Promise<RenderedMarkdownDocument | undefined> {
  const md = getSortedPostsData().find((doc) => doc.slug === slug);

  if (!md) {
    return undefined;
  }
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(md.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    ...md,
    contentHtml,
  };
}
