"use client";
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

// Constants
const GITHUB_API_URL = 'https://api.github.com/user/repos';

// Helper function to fetch GitHub repositories
const fetchGitHubRepos = async (accessToken) => {
  const response = await fetch(GITHUB_API_URL, {
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${response.status} - ${errorData.message}`);
  }

  return await response.json();
};

// GitHubRepos component
const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const session = await getSession();
        if (!session || !session.accessToken) {
          throw new Error('User is not authenticated');
        }

        const reposData = await fetchGitHubRepos(session.accessToken);
        setRepos(reposData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="text-center text-lg text-gray-300">
        Loading your repositories...
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="text-center text-lg text-red-400">
        {error}
      </div>
    );
  }

  // Render repositories list
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center text-gray-100 mb-4">
        Your GitHub Repositories
      </h1>
      <ul className="space-y-4">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <GitHubRepo key={repo.id} repo={repo} />
          ))
        ) : (
          <p className="text-center text-gray-400">
            No repositories found.
          </p>
        )}
      </ul>
    </div>
  );
};

// GitHubRepo component
const GitHubRepo = ({ repo }) => {
  return (
    <li className="bg-gray-800 border border-gray-700 rounded-lg p-4 transition hover:bg-gray-700">
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
    </li>
  );
};

export default GitHubRepos;
