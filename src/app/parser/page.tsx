
'use client';

import { useState } from 'react';
import { parseInstagramHtml } from '../../utils/parsing';
import styles from './page.module.css';

export default function ParserPage() {
  const [followingHtml, setFollowingHtml] = useState('');
  const [followersHtml, setFollowersHtml] = useState('');
  const [notFollowingBack, setNotFollowingBack] = useState<string[]>([]);
  const [notFollowedBack, setNotFollowedBack] = useState<string[]>([]);

  const handleParse = () => {
    const following = parseInstagramHtml(followingHtml);
    const followers = parseInstagramHtml(followersHtml);

    const notFollowingBackUsernames = following.filter(user => !followers.includes(user));
    const notFollowedBackUsernames = followers.filter(user => !following.includes(user));

    setNotFollowingBack(notFollowingBackUsernames);
    setNotFollowedBack(notFollowedBackUsernames);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Instagram Parser</h1>
      <div className={styles.textareas}>
        <div className={styles.textareaContainer}>
          <h2 className={styles.textareaTitle}>Following</h2>
          <textarea
            className={styles.textarea}
            placeholder="Paste your 'following' HTML here"
            value={followingHtml}
            onChange={(e) => setFollowingHtml(e.target.value)}
          />
        </div>
        <div className={styles.textareaContainer}>
          <h2 className={styles.textareaTitle}>Followers</h2>
          <textarea
            className={styles.textarea}
            placeholder="Paste your 'followers' HTML here"
            value={followersHtml}
            onChange={(e) => setFollowersHtml(e.target.value)}
          />
        </div>
      </div>
      <button className={styles.button} onClick={handleParse}>
        Parse
      </button>
      <div className={styles.results}>
        <div className={styles.resultColumn}>
          <h2 className={styles.resultsTitle}>Not Following You Back</h2>
          <ul className={styles.list}>
            {notFollowingBack.map((user) => (
              <li className={styles.listItem} key={user}>{user}</li>
            ))}
          </ul>
        </div>
        <div className={styles.resultColumn}>
          <h2 className={styles.resultsTitle}>You Don't Follow Back</h2>
          <ul className={styles.list}>
            {notFollowedBack.map((user) => (
              <li className={styles.listItem} key={user}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
