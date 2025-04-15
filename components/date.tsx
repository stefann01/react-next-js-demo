import { parseISO, format } from 'date-fns';

export default function DateComponent({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}

const second = 1000;
const hour = second * 3600;
const day = hour * 24;
const year = day * 365;
export function DaysAgo({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  let desc = `${Math.round(diff / second)} seconds ago`;
  if (diff > year) {
    desc = agoString('year', Math.round(diff / year));
  } else if (diff > day) {
    desc = agoString('day', Math.round(diff / day));
  } else if (diff > hour) {
    desc = agoString('hour', Math.round(diff / hour));
  }
  return <time dateTime={dateString}>{desc}</time>;

  function agoString(desc: string, amount: number) {
    return `${amount} ${desc}${amount > 1 ? 's' : ''} ago`;
  }
}
