# Cinema

**Requirements**  
Run `./scripts/setup.sh` in root to install all requirements  
To run backend there should be .venv with all dependencies installed (pip install)  
To run frontend there should be node_modules with all dependencies installed (npm i)

**How to run the app**  
Run `./scripts/start.sh` in root to start app in dev mode  
Backend dev server will run on port 8000 and frontend dev server on port 3000

**Build**  
Run `./scripts/build.sh` in root to build frontend for production and place it in correct folder in backend

To run the apps separately, look at their own README.md

**WORK IN PROGRESS**  
This will be a website that contains all the movies that I've seen along with their ratings

**/frontend** contains a svelte app that uses rest api provided by backend  
**/backend** contains a flask app with rest api and graphql (has its own readme)
