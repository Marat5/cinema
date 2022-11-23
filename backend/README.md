## Backend for cinema project

This folder contains the backend code that provides REST API and graphql api to CRUD movies, users and directors in database

### How to install dependencies

python3 -m venv .venv  
source .venv/bin/activate  
pip install -r requirements.txt

### How to run

flask --app cinema --debug run --port 8000

### How to use

**REST:**  
auth

- api/auth/login POST {"username": "str", "password": "str"}
- api/auth/register POST {"username": "str", "password": "str"}
- api/auth/user GET

directors

- api/directors GET
- api/directors/create POST {"name": "str"}

movies

- api/movies GET
- api/movies/create POST {"title": "str", "director_name": "str", "year": "int", "rating": "float"}
- api/movies/<movie_id> GET PATCH DELETE

**GraphQL:**

```
query GetMovies($orderBy: String, $limit: Int, $offset: Int) {
      movies(orderBy: $orderBy, limit: $limit, offset: $offset) {
        id
        title
        rating
        year
        addedBy
        director {
            name
        }
      }
      moviesCount
    }
```

Full graphql schema is in alt_api/schema.graphql

### How to navigate the code?

**./models** contains models with static methods that are used to do anything database-related  
**./views** contains rest api methods, structured with flask blueprints  
**./alt_api** contains graphql blueprint, schema, queries and mutations  
**./utils** contains useful functions and classes that can be used anywhere  
**./middleware** just contains one class that slows down every request so the user can enjoy frontend load indicators  
**./react_build** contains frontend production build, it should not be touched manually and it is in .gitignore. This folder should be produced and put into the right place by build script (from ../scripts)
