# Architecture

## Purpose

This repository is the public profile project for the GitHub account Brajesh31. GitHub displays the root README of a public repository whose name matches the account name as a profile README. That root file is the main profile presentation and is maintained separately from this handbook.

## Components

| Component | Responsibility |
|---|---|
| Root README | Profile text, project highlights, links, badges, and generated-content markers. |
| assets/ | Local image, badge, icon, and card files referenced by the profile. Individual sources and terms are not fully inventoried. |
| profile-3d-contrib/ | Generated contribution visualization variants. |
| output/ | Light and dark contribution-snake SVG files. |
| .github/workflows/ | Scheduled and manually dispatched automations that refresh selected profile files. |
| Documentation and policy files | Explain scope, contribution, security, support, and repository conventions. |

## Automation flows

| Workflow | Trigger and output |
|---|---|
| 3d-profile.yml | Daily schedule and manual dispatch; generates files under profile-3d-contrib/ and pushes changes. |
| blog-post-workflow.yml | Hourly schedule and manual dispatch; updates the marked latest-blog-posts region in the root README. |
| snake.yml | Every six hours and manual dispatch; generates the two SVGs under output/ and commits changed output. |
| update-productive-time.yml | Daily schedule and manual dispatch; refreshes assets/productive-time.svg only when SUMMARY_GITHUB_TOKEN is configured and output changes. |
| update-readme.yml | Every fifteen minutes, on manual dispatch, and on push; updates a timestamp in the root README and pushes a commit when the file changes. |

GitHub suppresses new workflow runs for most events caused by a workflow's GITHUB_TOKEN push, which helps prevent a recursive push-trigger loop. See [GitHub's GITHUB_TOKEN documentation](https://docs.github.com/en/actions/concepts/security/github_token).

## Data and external services

The profile embeds remote images, statistics cards, and links to external platforms. Those services provide their own data and rendering. This repository does not operate those services or control their availability, data processing, or terms.

The local files are static content. There is no server-side component, application database, API implementation, package manifest, or release artifact.

## Ownership and licensing boundaries

Brajesh Kumar (GitHub account brajesh31) maintains the repository. The MIT license applies to original repository material only as described in [LICENSE](../LICENSE). Local badges, third-party art, and generated graphics may have separate terms; verify their provenance before reuse.
