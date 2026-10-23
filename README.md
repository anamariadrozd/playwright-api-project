# Playwright API Project

API test automation project built with Playwright for the [Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html) demo service.

## Prerequisites

- Node.js and npm

## Installation

From the project directory, run:

```bash
npm ci
```

## Running the tests

Run the full test suite with:

```bash
npm test
```

Playwright generates an HTML report. To open it after a test run:

```bash
npx playwright show-report
```

## Project structure

```text
tests/
  fixtures/       Provide an auth token and a booking for tests
  test-data/      Store booking data and demo credentials
  *.spec.js       Tests for auth, ping, and booking operations(get, post, delete, patch, put)
playwright.config.js
package.json
```

The `authToken` fixture authenticates tests that need a token. The `bookingId` fixture creates a booking and provides its ID to the test. Bookings created during test runs remain in the demo service.

## Continuous integration

GitHub Actions runs the tests on pushes and pull requests targeting the `main` and `master` branches.
