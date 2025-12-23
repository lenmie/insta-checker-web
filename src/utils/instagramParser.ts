export const parseInstagramHtml = (html: string): string[] => {
  // This regex is designed to capture usernames from Instagram's data export files.
  // It looks for hrefs pointing to instagram.com and captures the username,
  // accommodating for older formats that included "/_u/".
  const regex = /href="https:\/\/www\.instagram\.com\/(?:_u\/)?([^"\/]+)"/g;
  
  // Find all matches for the regex in the provided HTML string.
  const matches = [...html.matchAll(regex)];
  
  // Extract the first capturing group (the username) from each match.
  // A Set is used here to automatically handle any duplicate usernames.
  const usernames = new Set(matches.map(match => match[1]));
  
  // Convert the Set back to an array and return it.
  return Array.from(usernames);
};
