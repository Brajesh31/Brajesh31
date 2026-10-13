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

## Scope of this policy

This policy covers files and workflows maintained in this repository. It does not promise security support for the external hosting, statistics, image, or feed services embedded by the profile.

## Private disclosure

Use a private channel whenever a report could expose a weakness, token, personal data, or a way to modify repository content. Public issues are appropriate only after sensitive details have been removed and coordinated disclosure is complete.

## GitHub reporting availability

Private vulnerability reporting is a repository setting. The reporting button is available only if the owner has enabled the feature; follow GitHub's current private-reporting guidance if you need to find it.

## What to include

A useful report identifies the affected workflow or file, the conditions needed to reproduce the issue, the likely impact, and a suggested mitigation when known. Keep the report factual and concise.

## What not to include

Do not send live token values, passwords, private keys, personal records, or a payload that can harm another system. Redact logs and screenshots before attaching them.

## Token exposure

For an exposed Actions secret, delete or rotate the secret in GitHub settings, revoke the credential at its issuer, and inspect workflow runs and audit activity. Removing a value from the latest file alone does not revoke it.

## Least privilege

A workflow that commits generated assets needs write access to repository contents. Keep that access scoped to the specific workflow and avoid granting broader administration, package, or deployment permissions without a documented need.

## Third-party Actions

Actions execute code in the workflow context. Review their maintainers, releases, requested permissions, and transitive dependencies before adoption. Immutable commit pinning can make the selected implementation auditable.

## Workflow output

Workflow logs and artifacts may be visible to repository collaborators or the public. Do not print secrets, private feed data, or sensitive information to logs, and use GitHub's secret handling rather than shell literals.

## Scheduled content updates

The blog, contribution graph, snake, and productive-time workflows refresh profile files on schedules. If a generated change is unexpected, inspect the triggering workflow run and upstream action before editing its output manually.

## External embeds

Remote image requests can disclose ordinary request metadata to the provider and can fail independently of this repository. Avoid embedding confidential content or URLs with private access tokens.
