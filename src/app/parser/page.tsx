'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import JSZip from 'jszip';
import { parseInstagramContent } from '../../utils/parsing';
import { ArrowLeft, UserMinus, UserCheck, Code, ExternalLink, UploadCloud } from 'lucide-react';

export default function ParserPage() {
  const [notFollowingBack, setNotFollowingBack] = useState<string[]>([]);
  const [notFollowedBack, setNotFollowedBack] = useState<string[]>([]);
  const [parsedStats, setParsedStats] = useState<{followers: number, following: number} | null>(null);
  const [isProcessingZip, setIsProcessingZip] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateResults = (following: string[], followers: string[]) => {
    const notFollowingBackUsernames = following.filter(user => !followers.includes(user));
    const notFollowedBackUsernames = followers.filter(user => !following.includes(user));

    setNotFollowingBack(notFollowingBackUsernames);
    setNotFollowedBack(notFollowedBackUsernames);
    setParsedStats({ followers: followers.length, following: following.length });
  };

  const handleZipUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingZip(true);
    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);
      
      const filePaths = Object.keys(loadedZip.files);
      let followersList: string[] = [];
      let followingList: string[] = [];

      for (const path of filePaths) {
        // Extract just the filename to avoid matching directory names like 'followers_and_following'
        const filename = path.split('/').pop() || path;
        
        // Exclude pending/recent requests
        if (filename.includes('pending') || filename.includes('recent')) continue;

        // Match files like followers_1.json, followers.html
        if (filename.match(/^followers.*?\.(json|html)$/i)) {
          const content = await loadedZip.files[path].async('string');
          followersList = [...followersList, ...parseInstagramContent(content)];
        }
        // Match files like following.json, following.html
        if (filename.match(/^following.*?\.(json|html)$/i)) {
          const content = await loadedZip.files[path].async('string');
          followingList = [...followingList, ...parseInstagramContent(content)];
        }
      }

      // Deduplicate
      followersList = Array.from(new Set(followersList));
      followingList = Array.from(new Set(followingList));

      if (followersList.length === 0 && followingList.length === 0) {
        alert("No followers or following data found in the ZIP. Please ensure it is the correct Instagram export.");
      } else {
        // Add a random 2-4 second processing delay
        const delay = Math.floor(Math.random() * 2000) + 2000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        calculateResults(followingList, followersList);
      }
    } catch (error) {
      console.error("Error reading zip file:", error);
      alert("Failed to read the ZIP file. Please ensure it is a valid zip file.");
    } finally {
      setIsProcessingZip(false);
      // Reset file input so same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-pink-500 selection:text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 mb-4 group w-fit"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 flex items-center gap-3">
              <Code className="w-8 h-8 text-pink-500" />
              Data Parser
            </h1>
            <p className="text-gray-400 mt-2">Upload your Instagram export ZIP file, or paste your extracted data manually.</p>
          </div>
        </header>

        {/* ZIP Upload Section */}
        <div className="mb-12">
          <div className="p-8 border-2 border-dashed border-white/20 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-4 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform">
              <UploadCloud className="w-10 h-10 text-pink-400" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">Upload Instagram ZIP Data</h3>
              <p className="text-gray-400 text-sm">We will automatically find and process the followers/following files.</p>
            </div>
            {isProcessingZip && <p className="text-pink-400 animate-pulse font-semibold mt-2">Processing ZIP... please wait.</p>}
            <input 
              type="file" 
              accept=".zip" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleZipUpload}
            />
          </div>
        </div>

        {parsedStats && (
          <div className="mb-8 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center gap-6 text-green-400">
            <span className="font-medium">Found {parsedStats.followers} Followers</span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span className="font-medium">Found {parsedStats.following} Following</span>
          </div>
        )}

        {(notFollowingBack.length > 0 || notFollowedBack.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-pink-500/20 rounded-xl">
                  <UserMinus className="w-6 h-6 text-pink-400" />
                </span>
                Not Following You Back
                <span className="ml-auto bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">
                  {notFollowingBack.length} users
                </span>
              </h2>
              <div className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {notFollowingBack.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No users found.</p>
                ) : (
                  notFollowingBack.map((user) => (
                    <div key={user} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                      <span className="font-medium text-gray-200">@{user}</span>
                      <a href={`https://instagram.com/${user}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-purple-500/20 rounded-xl">
                  <UserCheck className="w-6 h-6 text-purple-400" />
                </span>
                You Don't Follow Back
                <span className="ml-auto bg-white/10 text-xs px-3 py-1 rounded-full text-gray-300">
                  {notFollowedBack.length} users
                </span>
              </h2>
              <div className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {notFollowedBack.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No users found.</p>
                ) : (
                  notFollowedBack.map((user) => (
                    <div key={user} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                      <span className="font-medium text-gray-200">@{user}</span>
                      <a href={`https://instagram.com/${user}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
