"use client"

import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'

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

const GitHubRepos = () => {
  const [repos, setRepos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [generatingReadme, setGeneratingReadme] = useState(false)

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
      } finally {
        setLoading(false)
      }
    }

    loadRepos()
  }, [])

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const generateRepoReadme = async (repo) => {
    setGeneratingReadme(true)
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

      const response = await axios.post('/api/ai', { prompt })
      const generatedReadme = response.data.readme

      // You can implement logic here to save the README to the repository
      // For now, we'll just display an alert with the generated content
      alert(`README generated for ${repo.name}. Content:\n\n${generatedReadme}`)
    } catch (error) {
      console.error('Error generating README:', error)
      alert('Error generating README, please try again.')
    } finally {
      setGeneratingReadme(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center text-lg text-gray-300">
        Loading your repositories...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-2xl z-40 mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center text-gray-100 mb-4">
        Your GitHub Repositories
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="max-h-80 overflow-y-auto">
        <ul className="space-y-4">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => (
              <GitHubRepo 
                key={repo.id} 
                repo={repo} 
                onCreateReadme={() => generateRepoReadme(repo)}
                isGenerating={generatingReadme}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">
              No repositories found.
            </p>
          )}
        </ul>
      </div>
    </div>
  )
}

const GitHubRepo = ({ repo, onCreateReadme, isGenerating }) => {
  return (
    <li className="bg-gray-800 border border-gray-700 rounded-lg p-4 transition hover:bg-gray-700 relative">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-lg text-blue-400 hover:underline"
      >
        {repo.name}
      </a>
      <p className="text-gray-300">{repo.description || 'No description available.'}</p>
      <div className="flex items-center mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-yellow-400 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.72L12 2 10.19 8.52 1 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span className="text-gray-200">{repo.stargazers_count} stars</span>
      </div>
      <button 
        onClick={onCreateReadme}
        disabled={isGenerating}
        className="absolute bottom-2 right-2 bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Create README'}
      </button>
    </li>
  )
}

export default GitHubRepos