# Security Policy

## Supported project

This repository is a GitHub profile page with static media and scheduled GitHub Actions. It does not provide an application server, API, authentication system, or database. Security reports are welcome for repository workflows, configuration, and project-controlled content.

## Reporting a vulnerability

Please report suspected vulnerabilities privately. If GitHub displays **Report a vulnerability** on the repository's Security advisories page, use that private form. If the option is unavailable, contact Brajesh Kumar through the private contact options on [GitHub](https://github.com/Brajesh31) and ask for a secure reporting channel. Do not publish exploit details in an issue or pull request before coordinating a fix.

Include the affected file or workflow, impact, steps to reproduce, and any safe proof of concept. Do not include real credentials, private user data, or unrelated personal information. Reports will be reviewed as promptly as practical; no response-time guarantee is made.

## Secrets and tokens

The scheduled workflows may use GitHub's automatically provided `GITHUB_TOKEN`; the productive-time workflow optionally reads the repository secret `SUMMARY_GITHUB_TOKEN`. Never commit token values. If a credential is exposed, revoke or rotate it immediately and review recent workflow runs and repository activity.

## Safe handling

Treat workflow logs and generated profile artifacts as public. Grant Actions only the permissions required by each job. Review third-party Actions and external image or feed providers before enabling them. Report suspected issues with generated assets or external services to the relevant provider when the issue is outside this repository's control.
