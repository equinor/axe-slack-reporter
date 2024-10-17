![Build, lint and test](https://github.com/equinor/axe-slack-reporter/actions/workflows/build-lint-test.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/equinor/axe-slack-reporter/badge.svg?targetFile=package.json)](https://snyk.io/test/github/equinor/axe-slack-reporter?targetFile=package.json)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

# axe-slack-reporter

GH Action for reporting findings from axe-core to Slack using incoming web hook

## Purpose

This Github Action is made for reporting findings by [axe-core](https://github.com/dequelabs/axe-core) to [Slack](https://slack.com/).

## Rationale

Making software that is accessible to most people is important. By running tests based on axe-core, at least some accessibility issues can be detected. In order to quickly act upon these issues, the dev team must be notified as soon as possible. At Equinor Slack is being used extensively for messages and notifications, so it makes sense to also be notified about a11y issues there.

## How it works

1. Read `SLACK_WEBHOOK_URL` from environment variable
1. Read axe-core `file-name` as input paramter to the GH action
1. Parse file/report
1. If issues are found, report to Slack

## How to use

In you GitHub action yaml-file, add a section for running the `axe-slack-reporter`.  
Example:

```yaml
 - name: Publish results to Slack 💬
        id: publish-to-slack
        uses: equinor/axe-slack-reporter@v1.7
        with:
          fileName: path/to/report.json
```

## How to develop

This project is using NPM as the packet manager and [ncc](https://github.com/vercel/ncc) for bundling the application into one file (which is needed for GitHub actions to run).  
Available commands:

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch
npm run watch

# Lint
npm run lint

# Fix lint errors
npm run lint:fix

# Test
npm run test:dev

# Bundle
npm run bundle
```

### Bundling

Before this action can be used by anyone else, it is paramount that the code is built and bundled. Then the result (which is found in the `dist` folder) needs to be pushed to GitHub. So **do not put the `dist` folder in `.gitignore`**.  
New versions should also be tagged:

```bash
git tag -a -m "Version comment" v1.8
```

Then to push the tag with the code, do:

```bash
git push --follow-tags
```

### Code style

This project is developed using the Functional Programming paradigm.  
A tl;dr on Functional Programming:

> Functional programming (often abbreviated FP) is the process of building software by composing pure functions, avoiding shared state, mutable data, and side-effects. Functional programming is declarative rather than imperative, and application state flows through pure functions.

So, there you have it. **Application state flows through pure functions**.  
To help facilitate this flow, a brilliant library called [fp-ts](https://github.com/gcanti/fp-ts) is used. This library aims to allow developers to use popular patterns and abstractions, that are available in most functional languages, in TypeScript.

One of the important features from FP that is missing from TypeScript is functional composition and piping. The concept is to take the result from one function and use that as input in the next function. In FP this is used a lot to enable bottom-up development where one build new functions from smaller functions. `pipe()` and `flow()` are used for that purpose in this project.

One other important feature (or rather a set of features) that we need is somehow to align the output types from one function with the input type for the next function. This is where functions like `map()` and `chain()` come into play. Read about these concepts and more on the documentation page for fp-ts, https://gcanti.github.io/fp-ts/.  
This page also links to other excellent resources for learning about Functional Programming.

## Contributing

If you want to report a bug, please create an issue in GitHub unless it is a security issue. If it is a security issue, please follow our Security Reporting Policy in SECURITY.md file.
