# Database

## Current state

This repository has no database and does not store application records. It is a static profile repository containing Markdown, images, SVGs, workflow configuration, and documentation.

## Data used by profile content

Some profile widgets display information supplied by GitHub or external providers such as Medium and WakaTime. Their services retain and process their own data under their own terms. This repository does not define their storage, retention, or access controls.

## Workflow artifacts and commits

Generated profile files are committed to the repository when a workflow detects a change. Git history therefore records previous versions of those generated files. Do not add private user data or credentials to tracked content, generated artifacts, or workflow logs.

## If persistence is proposed

A database would be outside the current project scope. A proposal would need a defined use case, data classification, retention and deletion plan, access control, backup strategy, and privacy review before implementation.
