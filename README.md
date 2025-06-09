# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/dustytrail33/nodejs2025Q2-service.git
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Environment Variables

### Application Port

You can change the default port on which the app runs in the `.env` file located at the root of the project. For example:

```bash
PORT=4000
```

### Database Connection

You can specify the PostgreSQL database connection parameters int the `.env` file:

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
```

## Running application

The application uses the `docker-compose.yml` file for building and running the application. To start the app run one of these commands:

```bash
# Run the containers and see all the logs in the console
docker compose up

# Run the containers in the "detached" mode
docker compose up -d

# Run the containers in the "watch" mode (the application in the container restarts if changes made in the src folder)
docker compose up --watch
```

To stop the containers run the following command:

```bash
docker compose down
```

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Scan Docker Images For Vulnerabilities

For scanning purposes [Trivy](https://trivy.dev/) is used, running in a Docker container.

To scan images run one of the following commands:

```bash
# Scan the app container
npm run scan:app

# Scan the db container
npm run scan:db
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
