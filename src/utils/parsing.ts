export const parseInstagramHtml = (html: string): string[] => {
  const usernames = new Set<string>();
  
  // Match hrefs like href="https://www.instagram.com/_u/username"
  // Note: We don't enforce a closing quote immediately after the username
  // so we can gracefully ignore trailing slashes or query parameters (e.g. username/?hl=en)
  const hrefRegex = /href=["']https?:\/\/(?:www\.)?instagram\.com\/(?:_u\/)?([^"\/?[#'\s<>]+)/ig;
  const hrefMatches = [...html.matchAll(hrefRegex)];
  hrefMatches.forEach(match => usernames.add(match[1].toLowerCase()));
  
  // Fallback: match raw links in text like >https://instagram.com/username<
  const urlRegex = /https?:\/\/(?:www\.)?instagram\.com\/(?:_u\/)?([^"\/?[#'\s<>]+)/ig;
  const urlMatches = [...html.matchAll(urlRegex)];
  urlMatches.forEach(match => usernames.add(match[1].toLowerCase()));

  // Filter out common Instagram path prefixes that aren't usernames
  const invalidUsernames = new Set(['p', 'reel', 'reels', 'tv', 'stories', 'explore']);
  const validUsernames = Array.from(usernames).filter(u => !invalidUsernames.has(u));

  return validUsernames;
};

export const parseInstagramJson = (jsonString: string): string[] => {
  try {
    const usernames = new Set<string>();
    const data = JSON.parse(jsonString);
    
    // 1. Recursive standard format extraction
    const extractUsernames = (obj: any) => {
      if (!obj) return;
      if (Array.isArray(obj)) {
        obj.forEach(extractUsernames);
      } else if (typeof obj === 'object') {
        if (obj.string_list_data && Array.isArray(obj.string_list_data)) {
          obj.string_list_data.forEach((item: any) => {
            if (item.value && typeof item.value === 'string') {
              usernames.add(item.value.toLowerCase());
            }
          });
        }
        Object.values(obj).forEach(extractUsernames);
      }
    };
    
    extractUsernames(data);

    if (usernames.size > 0) return Array.from(usernames);

    // 2. Direct href regex fallback
    const urlRegex = /https:\/\/www\.instagram\.com\/(?:_u\/)?([^"\/?[#\s]+)/ig;
    const urlMatches = [...jsonString.matchAll(urlRegex)];
    if (urlMatches.length > 0) {
      urlMatches.forEach(match => usernames.add(match[1].toLowerCase()));
      return Array.from(usernames);
    }

    // 3. Fallback for older dictionary format { "username": timestamp }
    if (typeof data === 'object' && !Array.isArray(data)) {
      Object.keys(data).forEach(key => {
        if (key !== 'followers' && key !== 'following' && key !== 'relationships_following') {
          usernames.add(key.toLowerCase());
        }
      });
    } else if (Array.isArray(data)) {
      // Array of strings format
      data.forEach(item => {
        if (typeof item === 'string') usernames.add(item.toLowerCase());
      });
    }

    return Array.from(usernames);
  } catch (e) {
    console.error("Failed to parse JSON", e);
    return [];
  }
};

export const parseInstagramContent = (content: string): string[] => {
  if (!content) return [];
  // Try JSON first
  if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
    const jsonResult = parseInstagramJson(content);
    if (jsonResult.length > 0) return jsonResult;
  }
  // Fallback to HTML
  return parseInstagramHtml(content);
};
