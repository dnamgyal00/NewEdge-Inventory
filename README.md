﻿# NewEdge-Inventory

 A. To set up node 
main reference video :https://www.youtube.com/watch?v=GReoWKUnwAg (or follow the following steps)

Follow the following steps to set up backend project:
1. To initilize  node.js  project
    npm init -y
2. Install Express.js package
    npm i express
3. Add the following to package.json file
    "type":"module",
4.Replace with the following  in package.json
    "scripts": {
        "start": "node server.js",
        "server": "nodemon server.js"
    }
5.Create server.js file 
6.Install the dotenv package
    npm i dotenv
7.Create .env file

Follow the following steps to connect with prisma:
1. Install the prisma
    npm i prisma
2. Invoke prisma CLI 
    npx prisma
3. Create prisma project (prisma folder will be created and .env file will be updated)
    npx prisma init
4. In .env file update the DATABASE URL 
6. Install prisma client
     npm install @prisma/client

SET UP COMPLETE :))

To run server use command
    npm run server
