# Roadmap

This roadmap records candidate maintenance work for the profile repository. Items are proposals, not release commitments. The repository remains a personal profile page with static assets and GitHub Actions.

## Current state

The root profile page is rendered by GitHub. Scheduled workflows refresh blog links, contribution visuals, a productive-time card when its secret is configured, and a timestamp. There is no application build, release, API, or database.

## Priorities

1. Keep the profile page and linked assets available and readable.
2. Make automated changes predictable, attributable, and easy to review.
3. Record licenses and provenance for images, badges, generated graphics, and embedded services.
4. Keep workflow permissions limited to the files and actions each job needs.

## Candidate work

- Inventory the source and reuse terms for every local badge, image, and animation.
- Review third-party Actions and move mutable version tags to reviewed immutable revisions where practical.
- Keep each workflow's repository permissions explicit and minimal.
- Review the frequent README timestamp workflow and decide whether its update cadence and contribution history are useful.
- Ensure the email configured by automation is verified and associated with the intended GitHub account when attribution is desired.
- Add a maintainers' note for generated sections of the profile page so edits are not overwritten unexpectedly.
- Keep relative image paths valid when moving or renaming static assets.
- Add meaningful alternative text to informational images and identify decorative images consistently.
- Review externally hosted badges for accessibility, privacy, reliability, and provider terms.
- Confirm the optional productive-time token is scoped and rotated through GitHub repository settings.
- Make workflow failures visible without printing secrets or private feed data.
- Document how the Medium feed is selected and how many entries the workflow displays.
- Review the snake and 3D contribution output generation after upstream Action releases.
- Keep the profile page within GitHub's supported rendering limits and remove stale markup when appropriate.
- Add a lightweight documentation link review to a future maintenance workflow if it remains useful.
- Reassess whether tracked IDE metadata is needed by contributors.
- Keep CHANGELOG entries focused on user-visible repository changes rather than routine generated refreshes.
- Revisit this roadmap after substantial workflow or profile redesigns.

## Out of scope

A backend, public API, database, package release, and production deployment are not planned for this repository. Add such a component only after a separate requirement and design are agreed.
