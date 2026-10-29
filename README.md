# Playwright API Project

API test automation project built with Playwright for the [Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html) demo service.

## Prerequisites

- Node.js and npm
- Restful Booker API credentials, provided through environment variables

## Installation

From the project directory, install dependencies:

```bash
npm ci
```

Create a `.env` file in the project root from the example file:

```powershell
Copy-Item tests/.env.example .env
```

On macOS or Linux, use:

```bash
cp tests/.env.example .env
```

Open the new root-level `.env` file and set your credentials. `API_BASE_URL` is optional; if you leave it out, the tests use the Restful Booker demo service:

```dotenv
API_BASE_URL=https://restful-booker.herokuapp.com/
API_USERNAME=your_username
API_PASSWORD=your_password
```

The `.env` file is ignored by Git, so credentials are not included in commits. Keep the values private. The checked-in `tests/.env.example` provides a template for these variables.

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
  test-data/      Store booking data and read credentials from environment variables
  .env.example    Template for the root-level .env file
  *.spec.js       Tests for auth, ping, and booking operations
playwright.config.js
```

The `authToken` fixture authenticates tests that need a token. The `bookingId` fixture creates a booking and provides its ID to the test. Bookings created during test runs remain in the demo service.

## Continuous integration

GitHub Actions runs the tests on pushes and pull requests targeting the `main` and `master` branches. Add `API_USERNAME` and `API_PASSWORD` as repository Actions secrets under **Settings → Secrets and variables → Actions** so the workflow can authenticate. Do not commit your `.env` file or put credentials directly in the workflow file.
