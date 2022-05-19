# Custom Chess

Custom Chess is a platform for creating and playing custom chess variants.

---

## Installation

1. Clone or download the repository.
2. Install Redis. [Getting started with Redis](https://redis.io/docs/getting-started/).
3. Run `npm install` in the server directory.
4. Specify environment variables in `.env` file in the server directory or set them in your shell.

    | Variable | Description | Default |
    | --- | --- | --- |
    | `PORT` | Port to run the server on. | `3000` |
    | `REDIS_URL` | Connection string for Redis. | `'redis://localhost:6379'` |
    | `SECRET` | Secret used for signing JWT tokens. | `'secret'` |

6. Run `npm start` in the server directory.
7. Run `npm install` in the client directory.
8. Run `npm run build` in the client directory.
9. Go to `http://localhost:3000` in your browser and discover the new chess variants.
