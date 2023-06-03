# HACKQUACK TRADIES APP
## CSIT314 - Software Development Methodologies

## Requirement

```node.js v18.12.0 (LTS)```
Instruction - How to instal node.js: https://nodejs.org/en/blog/release/v18.12.0

```mysql```
Instruction - How to instal mysql: https://www.mysql.com/downloads/

## Instructions - How to run HACKQUACK Tradies App

Download the code or clone the repository (2 repositories prefer, 1 for Front End, 1 for Back End)

Open the code in the Visual Studio Code

### Run the Back End

```
cd backend
```

Copy the `.env copy`, and change the variables according to you settings and rename it to `.env`

```
npx prisma migrate dev
```

```
npx prisma db seed
```

```
npm i
```

```
npm start
```

### Run the Front End

```
cd frontend
```

Copy the `.env copy`, and change the variables according to you settings and rename it to `.env`

```
npm i
```

```
npm start
```

## Deployment Plan
