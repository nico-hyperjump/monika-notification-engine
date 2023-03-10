# Monika Notification Engine

Notification center for Monika users. A web app where user can register their WhatsApp phone number to receive notification from Monika.

## Getting Started

### Prerequisites

- Node.js v^14.14.37
- npm v6.14.11
- PostgreSQL v10
- [Docker](https://www.docker.com/) and [Docker compose](https://docs.docker.com/compose/) (optional)

### Development

Install node package dependencies

```bash
npm ci
```

Copy env file

```bash
cp .env.local.example .env
```

Setup Database

Install and run [PostgreSQL](https://www.postgresql.org/) with credential like in file `docker-compose.yml`

Or

It is easier to use [Docker](https://www.docker.com/) and [Docker compose](https://docs.docker.com/compose/) for development. And run following command in the root project directory:

```bash
docker compose up -d
```

Migrate prisma db

```bash
npm run migrate-db
```

Run on your computer

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Whatsapp Server

We use [Meta WhatsApp API](https://developers.facebook.com/docs/whatsapp/) to send WhatsApp message. Refer to their docs to learn more.

### Fake Whatsapp Server

To make this app running funtionally, you have to setup a fake server too by doing these steps:

Clone the repo

```bash
git clone https://github.com/ilmiawan/fake-whatsapp-server
```

Then follow the instruction in readme to run the server, and the server will be up in [http://localhost:3030](http://localhost:3030)
