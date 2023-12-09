# MVP

- Board with at least 3 initial columns (Applied, Interviewing, Rejected)
- Ability to add more columns
- Each column should be able to take "notes"
- Notes should be dragged with mouse across the columns
- Notes should be expandable to show more information.
- Notes should be able to scrap html web page when link is provided
- Notes should be able to replicate the html content of the scrapped page

# Tech Stack

## Backend

- should following CLEAN architecture (SOLID)
- nest.js
- TypeORM
- postgres

## Frontend

- web app - react
- next.js ? vite ?

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
- star the client server - `yarn dev`

# Test

- cd to relevant solution backend/client and run: `yarn test`
