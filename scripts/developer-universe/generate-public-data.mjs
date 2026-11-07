import { mkdir, readFile, writeFile } from "node:fs/promises";

const owner = "Brajesh31";
const output = "world/public/data/github-profile.json";
const token = process.env.GITHUB_TOKEN;

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "Brajesh31-developer-universe",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status} for ${path}`);
  return response.json();
}

async function main() {
  try {
    const profile = await github(`/users/${owner}`);
    const repositories = [];
    for (let page = 1; page <= 10; page += 1) {
      const batch = await github(`/users/${owner}/repos?per_page=100&page=${page}&type=owner&sort=updated`);
      repositories.push(...batch);
      if (batch.length < 100) break;
    }
    const languages = {};
    for (const repository of repositories) {
      try {
        for (const [language, bytes] of Object.entries(await github(`/repos/${owner}/${repository.name}/languages`))) {
          languages[language] = (languages[language] ?? 0) + bytes;
        }
      } catch (error) {
        console.warn(`Skipping language data for ${repository.name}: ${error.message}`);
      }
    }
    const payload = {
      generatedAt: new Date().toISOString(),
      source: "GitHub REST API public profile and repositories",
      profile: { login: profile.login, publicRepos: profile.public_repos, followers: profile.followers, following: profile.following },
      repositories: repositories.map((repo) => ({ name: repo.name, url: repo.html_url, description: repo.description, stars: repo.stargazers_count, forks: repo.forks_count, language: repo.language, updatedAt: repo.updated_at })),
      languages,
    };
    await mkdir("world/public/data", { recursive: true });
    await writeFile(output, `${JSON.stringify(payload, null, 2)}\n`);
    console.log(`Wrote ${output} from ${repositories.length} public repositories.`);
  } catch (error) {
    try {
      await readFile(output);
      console.warn(`Keeping existing ${output}; refresh failed: ${error.message}`);
    } catch {
      console.error(`No existing fallback at ${output}; refresh failed: ${error.message}`);
      process.exitCode = 1;
    }
  }
}

main();
