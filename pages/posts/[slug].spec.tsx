import { render, screen } from '@testing-library/react';
import { RenderedMarkdownDocument } from '../../lib/posts';
import Post from './[slug]';

describe('Post', () => {
  it('renders the markdown content', async () => {
    const post: RenderedMarkdownDocument = {
      author: 'James Bond',
      content: '# Foo bar',
      contentHtml: '<h1>Foo bar</h1>',
      date: '2022-06-27',
      slug: 'foo-bar',
      title: 'Foo bar',
    };
    render(<Post post={post}></Post>);
    const content = await screen.findByTestId('content');
    expect(content.innerHTML).toEqual(post.contentHtml);
  });
});
