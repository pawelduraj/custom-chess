# Custom Chess

Custom Chess is a platform for creating and playing custom chess variants.

> NOTE: Project is still in the development process, but no one is currently developing it.

---

## Installation

1. Clone or download the repository.
2. Install Redis. [Getting started with Redis](https://redis.io/docs/getting-started/).
3. Start Redis with the following command: `sudo service redis-server start`.
4. Specify environment variables in `.env` file in the server directory
   or set them in your shell or just use default values.

    | Variable | Description | Default |
    | --- | --- | --- |
    | `PORT` | Port to run the server on. | `3000` |
    | `REDIS_URL` | Connection string for Redis. | `'redis://localhost:6379'` |
    | `SECRET_KEY` | Secret used for signing JWT tokens. | `'secret'` |

5. Run `npm install` in the client directory.
6. Run `npm run build` in the client directory.
7. Run `npm install` in the server directory.
8. Run `npm start` in the server directory.
9. Go to `http://localhost:3000` in your browser and discover new chess variants.

---

## Tests

| Directory | Command | Description |
| --- | --- | --- |
| `server` | `npm run test` | Runs tests for the server. |
| `client` | `npm run test:unit` | Runs unit tests for the client. |
| `client` | `npm run test:e2e` | Runs end-to-end tests for the client. |
