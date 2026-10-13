# Frequently asked questions

## What is this repository?

It is the public profile repository for the GitHub account Brajesh31. It contains a profile README, local visual assets, generated SVGs, and Actions that refresh selected files.

## Is this a web application?

No. There is no application server, package manifest, build command, API, database, or release pipeline. GitHub renders the profile README and repository Markdown.

## Why is README.md important here?

It is the profile's main page. GitHub displays the root README of a public repository with the same name as the username. This handbook leaves that file out of its changes.

## Why does README still receive automated commits?

The repository includes workflows that update its blog-post section and a timestamp. Those workflows can commit changes to the profile page. Review their run history and schedule if the updates are unexpected.

## How do I preview the profile locally?

Open the repository in a Markdown editor with preview support. External badges and GitHub-specific rendering may differ from the final profile page. See [installation](installation.md).

## Do I need to install dependencies?

No local app dependencies are required to view or edit the static profile files. Git and a Markdown editor are sufficient for ordinary documentation work.

## Why does an image fail to load?

Check the path, filename capitalization, and whether the asset is tracked. Remote badges also depend on external provider availability.

## Does every workflow run create a commit?

No. The generated-file workflows may skip committing when the output has not changed. The timestamp workflow changes its value on scheduled runs, so its behavior differs.

## Where are workflow permissions and secrets configured?

Workflow permissions are declared in YAML and repository settings. The optional SUMMARY_GITHUB_TOKEN is a GitHub Actions secret, not a local application variable. Never put its value in a tracked file.

## Can I reuse the images under assets?

Check the asset source and license first. The repository's MIT license applies only to material within its documented scope; it does not automatically grant rights to third-party images or marks.

## Is there a database or external API owned by this project?

No. External badges and data providers operate their own services. The repository itself does not expose an API or store application records.

## How do I report a problem?

Use GitHub Issues if enabled for ordinary problems, or contact the maintainer through the profile. For a possible vulnerability, follow [SECURITY.md](../SECURITY.md) and avoid public disclosure.
