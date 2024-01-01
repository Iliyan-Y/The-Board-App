# Overview

The purpose of this application is to leverage contemporary technology to enhance the efficiency of the job hunting process by incorporating artificial intelligence (AI) capabilities. It is designed to provide a seamless experience for users, utilizing automation features to streamline various aspects of the job search. While acknowledging its resemblance to other job boards, the distinctive feature of this application lies in its strategic integration of automation to facilitate a more streamlined and user-friendly job hunting experience.

# Tech Stack

## Backend

- follow CLEAN architecture and SOLID principles
- nest.js
- TypeORM
- postgres

### There is second backend which is responsible for the web extraction using .net 8

It's not that NestJS can't handle all the requirements but to have direct comparison between two ecosystems and how a CLEAN project architecture can be achieved with both following the SOLID principles.

## Frontend

- vite
- react
- redux

## Deployment

- The MVP app is designed for local use, but should be easily deployed to the cloud (AWS ?) if required

# Requirements

- nodejs
- postgresql
- dotnet 8 + [ef tool](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)
- [ollama](https://ollama.ai/)

# Setup

- create database in postgres
- create .env file in the backed/nestjs dir

```
DB_NAME=your_db_name
DB_USERNAME=your_db_user_name
DB_PASSWORD=IF_password_required
EXTRACTOR_API_BASE_PATH=http://localhost:PORT
NODE_ENV=DEV
```

- install the dependency cd "backend"/"client `yarn install`

- start the backend server - `yarn dev`

- start the web extractor backend. From the project dir:

API secrets:

```
{
	"ConnectionStrings": {
		"DefaultConnection": "Host=localhost;Port=5432;Database=the_board;Username=your_user_name;Password=password"
	},
	"AiConfig": {
		"BaseAddress": "http://localhost:11434/api/generate",
		"Model": "llama2"
	}
}
```

Migrations:

```
cd Api
dotnet ef migrations add MigrationName
dotnet ef database update

```

```
dotnet restore
dotnet build
cd API && dotnet run
```

- Front end .env
  - ! The `/` is NOT INCLUDED in the end of the URLs

```
VITE_PUBLIC_API_BASE_PATH=http://localhost:3001
VITE_PUBLIC_WEB_EXTRACTOR_API_BASE_PATH=http://localhost:5120
```

- star the client server - `yarn dev`

## Ollama

- [install ollama](https://ollama.ai/download)
- ollama as API:
- - stat the server `ollama serve`
- - pull the model you like to use `ollama pull llama2`
- alternatively simply run the model locally
- - `ollama run llama2`

### Other ollama options / commands:

```
export OLLAMA_HOST=0.0.0.0:8080
ollama serve

-- once the server is running other commands can be executed (for the given server)
-- local models and server models need to be downloaded separately

# OLLAMA_HOST="127.0.0.1:8080" ollama list /// show models for given port
# ollama run tinyllama
# ollama run llama2 /// if exported post provided it might need to download the model again

# hostname -I  /// help with finding local ip
```

# Test

- cd to relevant solution backend/client and run: `yarn test`
