# Deployment and publishing

## Profile publishing

This repository does not deploy a web application. GitHub displays the root README of this public username-matching repository as the profile README. GitHub's [README documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) describes that behavior.

Publishing a normal documentation or asset change means merging or pushing it to the default branch according to repository settings. The root README remains the profile's main presentation.

## Automated file updates

GitHub Actions runs the workflows listed below. They write generated content to the repository; they are not a general application deployment pipeline.

- The 3D contribution workflow runs daily and on manual dispatch.
- The blog-post workflow runs hourly and updates the marked blog list in the profile README.
- The snake workflow runs every six hours and writes the light and dark SVGs.
- The productive-time workflow runs daily; it writes the card only when SUMMARY_GITHUB_TOKEN exists and output differs.
- The README timestamp workflow runs every fifteen minutes, on manual dispatch, and on push; it updates and pushes the timestamp line when the value changes.

Most workflow events caused by a push authenticated with GITHUB_TOKEN do not start another workflow run. See [GitHub Actions token behavior](https://docs.github.com/en/actions/concepts/security/github_token).

## Manual runs and permissions

Each workflow with workflow_dispatch can be started from the repository's Actions page by someone with the necessary permissions. A manual run can still produce no file change if the generated result matches the current file. Workflows that push changes need repository content write permission; review that permission before changing a workflow.

## Rollback

Generated files can be restored through a reviewed commit on the default branch. Before reverting an automated commit, identify the workflow and input that produced it; otherwise the next scheduled run may recreate the change. Avoid rewriting shared history.
