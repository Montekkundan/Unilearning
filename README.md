# Learnivore

Welcome to Learnivore, an interactive platform where learners and enthusiasts around the world gather to discuss, share knowledge, and learn about programming.


## Table of Contents
1. [About](#about)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contribution](#contribution)
6. [License](#license)

## About
Learnivore is designed to be a blend of popular platforms like Reddit and StackOverflow, focusing on providing a space where anyone can ask, answer, discuss, and learn about various programming topics.

## Features
- Create and manage discussions
- Engage with posts by commenting and voting
- Create a personal feed by subscribing to interesting discussions
- User authentication and profile management
- Search functionality for easy navigation

## Installation
To get Learnivore running locally on your machine, follow these steps:

**Prerequisites:**
- Node.js installed on your machine
- [mysql](https://dev.mysql.com/downloads/mysql/)

```bash
# Clone the repository
git clone https://github.com/username/unilearning.git

# Navigate into the directory
cd unilearning

# Install dependencies
npm install

# Create a .env file and setup your credentials

# prisma db push

npx prisma db push




# Start the server
npm run dev
```

#### Note
- Run `npx prisma db push` to apply the Prisma schema to the new database.
- Run `npx prisma generate` to generate the Prisma Client (updated or new data/model).

### Credentials required for .env file from different services

```bash

DATABASE_URL=mysql://root:1234@127.0.0.1:3306/unilearning  -> setup mysql 
NEXTAUTH_SECRET= any random string

# got to google developer console and create a project and get the client id and secret
GOOGLE_CLIENT_ID= 
GOOGLE_CLIENT_SECRET=

# go to https://uploadthing.com/ and create a project and get the app id and secret
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# got to https://upstash.com/ and create a redis database and get the url and secret
REDIS_URL=
REDIS_SECRET=

```

## Usage
You can access Learnivore from http://localhost:3000 (or the port you specified) in your browser.

## Contribution
We appreciate contributions of any kind. For major changes, please open an issue first to discuss what you would like to change. Pull requests are welcome.

## License
[MIT](LICENSE.md)