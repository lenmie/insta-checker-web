
export const parseInstagramHtml = (html: string): string[] => {
  const regex = /href="https:\/\/www\.instagram\.com\/(?:_u\/)?([^"\/]+)"/g;
  const matches = [...html.matchAll(regex)];
  const usernames = new Set(matches.map(match => match[1]));
  return Array.from(usernames);
};
