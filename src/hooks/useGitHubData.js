import { useState, useEffect } from 'react';

const USERNAME = 'idlanyor';
const CACHE_KEY = `github_data_${USERNAME}`;
const CACHE_DURATION = 3600000; // 1 hour

export const useGitHubData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check cache first
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { timestamp, data: cachedData } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setData(cachedData);
                        setLoading(false);
                        return;
                    }
                }

                setLoading(true);

                // Fetch User Data
                const userRes = await fetch(`https://api.github.com/users/${USERNAME}`);
                if (!userRes.ok) throw new Error('Failed to fetch user data');
                const userData = await userRes.json();

                // Fetch Repositories (up to 100 to calculate stars)
                const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`);
                if (!reposRes.ok) throw new Error('Failed to fetch repos');
                const reposData = await reposRes.json();

                // Calculate total stars
                const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

                // Process data
                const processedData = {
                    user: {
                        name: userData.name || USERNAME,
                        avatar_url: userData.avatar_url,
                        bio: userData.bio,
                        location: userData.location,
                        blog: userData.blog,
                        public_repos: userData.public_repos,
                        followers: userData.followers,
                        following: userData.following,
                        html_url: userData.html_url,
                        total_stars: totalStars,
                    },
                    repos: reposData
                        .filter(repo => !repo.fork) // Filter out forks if desired, or keep them
                        .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
                        .slice(0, 6) // Top 6 repos
                        .map(repo => ({
                            id: repo.id,
                            name: repo.name,
                            description: repo.description,
                            html_url: repo.html_url,
                            homepage: repo.homepage,
                            language: repo.language,
                            stargazers_count: repo.stargazers_count,
                            forks_count: repo.forks_count,
                            topics: repo.topics,
                        }))
                };

                // Save to cache
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    data: processedData
                }));

                setData(processedData);
            } catch (err) {
                console.error('GitHub API Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
