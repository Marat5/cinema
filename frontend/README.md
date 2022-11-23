## Frontend for cinema project

This folder contains a react app that is the client part of cinema project

### How to install dependencies

npm i

### How to run

npm start

### How to navigate the code

**./commonComponents** contains components that can be reused on any page (look how cool CustomTable is)  
**./pages** contains all components that are rendered straight from router and router itself. Inside the page component can be a nested "components" folder that contains page-specific components  
**./api** contains graphql mutation and query hooks that return data from backend  
**./hooks** contains reusable pieces of logic or stuff that you want to take out to make component more readable (out of sight, out of mind)  
**./utils** contains utility functions, constants, some common types, and setup for apollo client
