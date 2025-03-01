
# Chat App
A Highly scaleable chat app with features like : -

- one to chat
- Group chat
- video call (coming soon)
- voice call ( coming soon )

## Live Demo
- you can check out for live hosted demo at 
- https://chat-app-delta-two-82.vercel.app/
## setup:

### pre requisite

#### with docker

-  you will need docker desktop installed in your system 
- run this in terminal
```bash
docker compose up 
```

- This will run a postgres Db and Redis locally

#### without docker 

- You can run a data base locally or get it from a postgres DB provider but here you will need you change the value of `DATABASE_URL` in .env

- You will also need a redis either locally or from a provider, here also you will need to change these value `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_USERNAME` in .env file
 
 ### backend
 #### go to backend directory
```bash
 cd ws-server 
```

#### copy enviroment varialbes from .env.example file 
```bash
  cp .env.example .env
```
- note: if you are not using docker you will need to modify `Redis` varialbe in `.env` as mentioned above in the pre requisite

 #### Install dependencies
 ```bash
npm install
```

#### To start the server in dev mode
```bash
npm run dev 
```
#### To start the server in prod mode
- build the project 
```bash
npm run build 
```
- start the project 
```bash
npm run start 
```


### frontend

### Required things
- GITHUB_ID -> github oAuth app id
- GITHUB_SECRET -> github oAuth app secret
- GOOGLE_CLIENT_ID -> google client id to user google Oauth
- GOOGLE_CLIENT_SECRET -> google client secret to user google Oauth

 #### go to frontend directory
```bash
 cd frontend 
```

#### copy enviroment varialbes from .env.example file 
```bash
  cp .env.example .env
```
- note: if you are not using docker you will need to modify `GITHUB_ID`,  varialbe in `.env` 

 #### Install dependencies
 ```bash
npm install
```
- this will start your server and generate you prisma schema

### push your prisma schema to your database
 ```bash
npx prisma db push
```

#### To start the frontend in dev mode
```bash
npm run dev 
```
#### To start the frontend in prod mode
- build the project 
```bash
npm run build 
```
- start the project 
```bash
npm run start 
```
