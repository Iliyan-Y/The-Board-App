# Overview

The purpose of this application is to leverage contemporary technology to enhance the efficiency of the job hunting process by incorporating artificial intelligence (AI) capabilities. It is designed to provide a seamless experience for users, utilizing automation features to streamline various aspects of the job search. While acknowledging its resemblance to other job boards, the distinctive feature of this application lies in its strategic integration of automation to facilitate a more streamlined and user-friendly job hunting experience.

# Tech Stack

## Backend

- follow CLEAN architecture and SOLID principles
- nest.js
- TypeORM
- postgres

## Frontend

- vite
- react
- redux

## Deployment

- The MVP app is designed for local use, but should be easily deployed to the cloud (AWS ?) if required

# Requirements

- nodejs
- postgresql

# Setup

- create database in postgres
- create .env file in the backed dir

```
DB_NAME=your_db_name
DB_USERNAME=your_db_user_name
DB_PASSWORD=IF_password_required
```

- install the dependency cd "backend"/"client `yarn install`

- start the backend server - `yarn dev`

- Front end .env

```
VITE_PUBLIC_API_BASE_PATH=http://localhost:3001
```

- star the client server - `yarn dev`

# Test

- cd to relevant solution backend/client and run: `yarn test`
