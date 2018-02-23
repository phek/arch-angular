# Angular Frontend
Navigate to the Angular folder and execute **run.bat** to start the frontend test server on windows.  
You can also start the server by running **npm start**.  
You need to have [NodeJS](https://nodejs.org/en/) installed to test the frontend locally.

## Hosting
When you run **run.bat** or **npm start** the server will be started on a development server. In production you should host the frontend on a real webserver, with for example **NGINX**. Just place the Angular folder in your web root and set all routes to point to index.html in the src folder, Angular will handle all the routing for you.

# Backend
You need a REST Api to perform API calls (such as login).  
Download [this repository](https://github.com/phek/arch-node) to test it with a mockup server in NodeJS.  
Download [this repository](https://github.com/Uddekudde/arch-javaEE) to use it with a real backend.

## Configuration
You can change the server address and port number in **/angular/src/app/_config/backend.ts**.
