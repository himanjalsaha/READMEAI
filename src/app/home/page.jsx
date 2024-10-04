'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { MathJaxContext } from 'better-react-mathjax';
import './style.css';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { getSession } from 'next-auth/react';

const GITHUB_API_URL = 'https://api.github.com/user/repos'

const fetchGitHubRepos = async (accessToken) => {
  const response = await fetch(GITHUB_API_URL, {
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Error: ${response.status} - ${errorData.message}`)
  }

  return await response.json()
}

export default function GitHubReadmeGenerator() {
  const { data: session } = useSession()
  const [markdown, setMarkdown] = useState(`## Hi there 👋, I'm ${session?.user?.name || 'Arjit-14'} ...`);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRepos, setShowRepos] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const session = await getSession()

        if (!session || !session.accessToken) {
          throw new Error('User is not authenticated')
        }

        const reposData = await fetchGitHubRepos(session.accessToken)
        reposData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        
        setRepos(reposData)
      } catch (err) {
        setError(err.message)
      }
    }

    loadRepos()
  }, []);

  const handleMarkdownChange= () => {
    setMarkdown(e.target.value);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    alert('README content copied to clipboard!');
  };

  const generateReadme = async () => {
    const hardcodedPrompt = `
Create a detailed GitHub README for a personal GitHub profile focused on web development using the MERN stack. The README should highlight the following:

- GitHub Profile: (https://github.com/${session?.user.username})
- name of the user is ${session?.user.name}
- Use Anurag Hazra's GitHub stats more than 2 for visual appeal add trophies too.
- Write in Markdown syntax without using code blocks  
- Include visually appealing elements, such as:
  - Cards for showcasing projects and skills.
  - Tables for organization and clarity.
  - A languages section with icons to represent the programming languages used in a good way.
  -  use Typing SVGs.
  - Ensure all images are valid links https://img.shields.io/badge this type.
  -make it as imformative as possible 
  
Make the README engaging and informative, incorporating relevant emojis to enhance visual appeal. Aim for a professional yet friendly tone.
`

    setLoading(true);

    try {
      const response = await axios.post('/api/ai', {
        prompt: hardcodedPrompt
      });

      setMarkdown(response.data.readme);
    } catch (error) {
      console.error('Error generating README:', error);
      alert('Error generating README, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateRepoReadme = async (repo) => {
    setLoading(true);
    setShowRepos(false)

    try {
      const prompt = `
Create a detailed GitHub README for the repository "${repo.name}". The README should highlight the following:

- Repository Name: ${repo.name}
- Description: ${repo.description || 'No description available.'}
- GitHub Repository URL: ${repo.html_url}
- Primary Language: ${repo.language || 'Not specified'}
- Stars: ${repo.stargazers_count}
- Forks: ${repo.forks_count}

Include the following sections:
1. Project Overview
2. Features
3. Installation 
4. Usage
5. Contributing
6. License

Write in Markdown syntax without using code blocks. Make the README engaging and informative, incorporating relevant emojis to enhance visual appeal. Aim for a professional yet friendly tone.
`

      const response = await axios.post('/api/ai', { prompt });
      setMarkdown(response.data.readme);
      setShowRepos(false);
    } catch (error) {
      console.error('Error generating README:', error);
      alert('Error generating README, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut()
  }

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(process.env.GROQ_API_KEY);
  

  return (
    <MathJaxContext>
      <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-violet-200 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Image src={session?.user.profilePic} alt="profile" width={50} height={50} className='rounded-full p-2' />
              <h1 className="text-3xl font-bold">HI, {session?.user.name} 👋</h1>
            </div>
            <div className='flex gap-2'>
            

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
    
          <div className="flex space-x-4">
            <button
              onClick={generateReadme}
              className="mt-4 text-xs bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Profile README'}
            </button>
    
            <button 
              onClick={handleCopyToClipboard}
              className="mt-4 text-xs bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Copy to Clipboard
            </button>
            <button 
              onClick={handleLogout}
              className="mt-4 text-xs bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
            <button 
              onClick={() => setShowRepos(true)}
              className="mt-4 text-xs bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Show Repos
            </button>
          </div>
    
          {loading && (
            <div className="mt-4 flex justify-center">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span className="ml-2 text-blue-600">GENERATING YOUR README...</span>
            </div>
          )}
    
          <div className={`mt-10 shadow rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-col lg:flex-row">
              <div className={`w-full lg:w-1/2 p-4 border-t lg:border-t-0 lg:border-l overflow-auto ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <textarea
                  value={markdown}
                  onChange={handleMarkdownChange}
                  className={`w-full h-[500px] md:h-full p-2 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
                  }`}
                  placeholder="Enter your markdown here..."
                />
              </div>
              <div className="w-full lg:w-1/2 p-4 border-t lg:border-t-0 lg:border-l overflow-auto">
                <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeKatex]}
                    components={{
                      img({ node, ...props }) {
                        return <img className="max-w-full h-auto" {...props} />;
                      }
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {showRepos && (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto relative">
     {/* Close Button (Cross Icon) */}
     <button
       onClick={() => setShowRepos(false)}
       className="absolute top-4 right-4 text-white hover:text-gray-400"
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-6 w-6"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         strokeWidth={2}
       >
         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
       </svg>
     </button>
 
     <h2 className="text-2xl font-semibold mb-4 text-white">Your GitHub Repositories</h2>
     <div className="flex items-center justify-center">
       <input
         type="text"
         placeholder="Search repositories..."
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         className="w-full p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
       />
     </div>
 
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {filteredRepos.map((repo) => (
         <div key={repo.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4 transition hover:bg-gray-600">
           <h3 className="text-lg font-semibold text-blue-400">{repo.name}</h3>
           <p className="text-gray-300 mt-2">{repo.description || 'No description available.'}</p>
           <div className="flex items-center mt-2">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-5 w-5 text-yellow-400 mr-1"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.72L12 2 10.19 8.52 1 9.24l5.46 4.73L5.82 21z"
               />
             </svg>
             <span className="text-gray-200">{repo.stargazers_count} stars</span>
           </div>
           <button
             onClick={() => generateRepoReadme(repo)}
             disabled={loading}
             className="mt-4 w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Generate README
           </button>
         </div>
       ))}
     </div>
   </div>
 </div>
 
          )}
        </div>
      </div>
    </MathJaxContext>
  );
}