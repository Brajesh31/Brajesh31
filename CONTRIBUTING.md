# Contributing

Thanks for helping maintain this GitHub profile repository. It contains profile-page content, local images and SVGs, and scheduled GitHub Actions that refresh selected generated files. It is not a packaged application and has no build or test suite.

## Before proposing a change

1. Read `LICENSE` and check the source and terms for any asset you plan to add.
2. Open an issue or contact the owner for broad changes to the public profile presentation or automated workflows.
3. Keep changes focused and preserve generated files that are maintained by an Action.
4. Never include credentials, private analytics, personal data, or confidential information.

## Local review

Use a Markdown preview to inspect formatting and verify that local images referenced by a change exist at the expected repository path. For workflow edits, review the trigger, permissions, inputs, and outputs. No application tests are defined for this repository.

## Pull requests

Use a short, descriptive title. Explain the reason for the change, list affected paths, identify any generated or third-party content, and state what you reviewed. Link related issues when applicable. Keep attribution and license notices with reused material.

## Maintainer

The repository is maintained by Brajesh Kumar (`@brajesh31`). Contributors are expected to follow `CODE_OF_CONDUCT.md` and to report security concerns using `SECURITY.md`.

## Repository scope

Changes should fit a profile repository: profile content, static media, repository documentation, or the automation that refreshes generated profile assets. There is no application source tree to extend.

## Profile page edits

The root `README.md` is rendered as the profile page. The hourly blog-post workflow also updates its marked blog section. Coordinate manual changes to action-managed regions with the maintainer and review the workflow's expected behavior before proposing edits.

## Issue first for broad changes

For a redesign, new external integration, or a change to what is publicly displayed, describe the motivation and proposed scope in an issue before investing in implementation. Small typo fixes and clear asset corrections can be proposed directly.

## Branch and pull request

Work on a short-lived branch based on the current `main`. Submit changes through a pull request when repository settings permit. Do not force-push to `main` or rewrite shared history.

## Keep the diff focused

Change only the files needed for the contribution. Do not reformat unrelated profile markup, replace generated media without checking its producing workflow, or bundle unrelated asset changes with documentation edits.

## Commit messages

Use a concise verb-led subject such as `docs: clarify workflow setup` or `fix: correct asset path`. A pull request may contain multiple logical commits; explain any generated refresh commit separately.

## Markdown and accessibility

Use descriptive headings, meaningful link text, and useful alternative text for informative images. Decorative images should not be presented as meaningful content. Check relative links from the file that contains them.

## Asset provenance

Before adding an image, icon, badge, animation, or font, record its source and license in an appropriate notice. Obtain permission when terms do not allow the intended use. Do not assume an asset is MIT-licensed because it is checked into this repository.

## Generated visual files

The `profile-3d-contrib/` and `output/` directories contain files refreshed by scheduled Actions. Edit their producing workflow or source inputs when behavior needs to change; direct edits can be overwritten by the next scheduled run.

## External embeds

The profile references third-party image and statistics services. Consider availability, privacy, accessibility, and provider terms before adding another service. Prefer a local asset only when its rights and maintenance source are documented.

## Workflow permissions

Keep each workflow's `GITHUB_TOKEN` permissions limited to the required scope. A job that pushes generated files needs write permission for repository contents; read-only jobs should not receive write access.

## Workflow dependencies

When changing an Action, use a maintained upstream and review its release and permission requirements. Pinning an Action to a reviewed immutable revision can reduce supply-chain risk; document the chosen version and update process.

## Workflow triggers

Document whether a workflow runs on a schedule or by manual dispatch, and consider how frequently it writes commits. Avoid introducing a push trigger that recursively causes the same workflow to commit again.

## Secrets

Use GitHub Actions repository or environment secrets for credentials. Never put a token in a committed file, workflow literal, example value, issue, or pull request log. Examples should use the secret name without exposing its value.

## Review checks

Review the final diff for accidental changes, whitespace errors, broken local links, missing image files, and accidentally staged credentials. For workflow edits, inspect the rendered YAML and permissions before proposing the change.

## Changelog notes

For user-visible or operational changes, update `CHANGELOG.md` with a concise description and reference the related pull request when available. Do not invent release versions or claim a deployment that did not happen.

## Documentation accuracy

Describe what is present in the repository and distinguish it from planned work. In particular, do not claim that this repository hosts an API, database, build pipeline, or deployable application.

## Review and response

Be open to specific review feedback. If you disagree with a suggestion, explain the tradeoff and propose a concrete alternative. Keep discussion respectful and focused on the contribution.
