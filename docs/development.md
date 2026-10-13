# Development

## Project shape

This is a profile and static-content repository. It has no application build command, dependency installation, automated test suite, API server, or database. Most changes are Markdown, image assets, SVG output, or GitHub Actions configuration.

## Change workflow

Start from the current main branch and make a focused branch for a proposed change. Keep the diff limited to the affected paths. Use a pull request when repository settings permit, and describe what changed and what you reviewed. See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Profile content ownership

The root README is rendered as the profile page. Several generated regions are maintained by Actions, including the blog-post section and a timestamp. Coordinate edits to these regions with their workflows so the next scheduled run does not overwrite manual changes.

## Static assets

Before adding or replacing an image, identify its source, license, attribution requirements, and intended display size. Keep source notices with the asset when possible. The top-level [LICENSE](../LICENSE) does not automatically relicense every image in the repository.

## Workflow changes

Review each workflow's trigger, permissions, action version, secrets, and write paths. Scheduled jobs may commit generated files. Avoid unnecessary write permissions and do not add secrets as literal YAML values. GitHub's [GITHUB_TOKEN guidance](https://docs.github.com/en/actions/concepts/security/github_token) describes how workflow-generated events are handled.

## Review before proposing

Use a Markdown preview, check changed relative paths, inspect SVG and image output, and review the final diff for accidental edits. For workflow changes, inspect the workflow run after a genuine run. No application tests are defined for this repository.
