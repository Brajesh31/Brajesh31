# Troubleshooting

## Profile page is missing

GitHub displays a profile README when the public repository name matches the account name and the root README is present and non-empty. Check repository visibility, repository name, file location, and profile settings. See GitHub's [profile README guide](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme).

## Local image does not render

Check the relative path from the README or document, exact filename capitalization, and whether the asset is tracked. A local editor may resolve paths differently from GitHub. Confirm that the file was not moved or renamed.

## Remote badge or card is blank

External services can be unavailable, rate-limited, or change their response format. Open the provider URL directly and check the provider's status or documentation. A failed external image does not necessarily indicate a repository problem.

## Blog section has stale entries

The blog-post workflow runs hourly and reads the configured Medium feed. Inspect its latest Actions run and the feed response. The workflow owns the marked blog-list region, so manual edits there may be replaced.

## README timestamp keeps changing

The update-readme workflow is scheduled every fifteen minutes and writes a timestamp to the root README. Each timestamp change can create a commit. Inspect the workflow and recent history if this cadence or its commit attribution is unexpected.

## Contribution graphics are stale

Check the last run of 3d-profile.yml or snake.yml and verify that the generated output path is correct. A workflow may complete successfully without a new commit when generated content is unchanged.

## Productive-time card does not refresh

The productive-time workflow skips generation when SUMMARY_GITHUB_TOKEN is absent. Check that the repository secret is configured, that the latest run can read it, and that generated output is non-empty and free of rate-limit errors.

## Push or permission failure

A workflow that commits files needs contents write permission and a token available to the job. Review repository Actions permissions, branch protection, workflow permissions, and the run log. Never paste a token into a public issue.

## Generated changes are overwritten

Identify the workflow that produces the file and change its inputs or configuration rather than editing generated output alone. The next scheduled run may replace manual output.

## Security or private-data concern

Do not post token values or sensitive data publicly. Follow [SECURITY.md](../SECURITY.md), revoke any exposed credentials, and review relevant workflow logs and repository activity.
