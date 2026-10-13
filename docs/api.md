# API

## Repository API surface

This repository does not implement or publish an API. It contains no server code, routes, authentication middleware, request schema, or service-level compatibility contract.

## External providers

The profile README references GitHub-hosted data, Medium feeds, WakaTime, and other image or statistics providers. The external provider or the GitHub Action that reads a feed is responsible for its own API behavior. Those services can change, rate-limit requests, or become unavailable without a change to this repository.

## GitHub Actions inputs

The workflows use GitHub's workflow event context and built-in Actions token, and the productive-time workflow can consume SUMMARY_GITHUB_TOKEN. These are automation configuration inputs, not a user-facing API. Do not publish token values in a workflow, issue, or documentation example.

## Adding an integration

Before adding an API-backed profile widget, document its provider, data source, credentials, request frequency, privacy implications, failure behavior, and attribution requirements. Prefer not to expose secrets to client-rendered URLs or public SVGs.
