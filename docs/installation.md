# Installation and local preview

## Requirements

You need Git and a Markdown viewer. No programming language runtime or package installation is required to view the checked-in profile files. An internet connection is needed to load external badges, embeds, and provider-hosted images.

## Get a local copy

Clone the public repository from https://github.com/Brajesh31/Brajesh31.git, then open the repository folder in your editor or file browser. The root README is the profile page; the docs directory contains the handbook.

## Preview Markdown

Use a local Markdown preview to inspect formatting and relative image paths. A local preview may not reproduce GitHub-specific rendering, GitHub badges, or remote cards exactly. For the final profile rendering, inspect the repository and the Brajesh31 profile on GitHub.

## Preview assets

Local assets are referenced relative to the repository root. Preserve directory names and filename capitalization, especially on case-sensitive hosts. Generated SVGs under output/ and profile-3d-contrib/ can be opened directly in a browser or image viewer.

## GitHub Actions configuration

Local preview does not require any credentials. The optional productive-time card workflow uses the GitHub Actions secret SUMMARY_GITHUB_TOKEN. Configure that secret in repository settings only if that workflow is intended to refresh the card. Do not put its value in a local file or commit it.

## Common setup issues

If an image is broken, confirm that the file exists at the referenced path and that capitalization matches. If a remote badge is blank locally, check internet access and provider availability. For scheduled workflow failures, use the Actions run page and [troubleshooting](troubleshooting.md).
