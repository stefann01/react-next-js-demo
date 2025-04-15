import { render } from '@testing-library/react';
import { DaysAgo } from './date';

describe(DaysAgo.name, () => {
  const now = new Date();
  it('should show years ago', () => {
    const { container } = render(
      <DaysAgo
        dateString={new Date(
          now.getFullYear() - 2,
          now.getMonth(),
          now.getDate()
        ).toISOString()}
      />
    );
    expect(container.textContent).toEqual('2 years ago');
  });
  it('should show days ago', () => {
    const input = new Date(now.getTime() - 3600 * 1000 * 24 * 2);
    const { container } = render(
      <DaysAgo
        dateString={input.toISOString()}
      />
    );
    expect(container.textContent).toEqual('2 days ago');
  });
  it('should show hours ago', () => {
    const input = new Date(now.getTime() - 3600 * 1000 * 2);
    const { container } = render(
      <DaysAgo
        dateString={input.toISOString()}
      />
    );
    expect(container.textContent).toEqual('2 hours ago');
  });
});
