## Backend for cinema project

This folder contains the backend code that provides REST API and graphql api to CRUD movies, users and directors in database

### How to run

source .venv/bin/activate  
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
query {
    movies {
        id
        title
        director {
            id
            name
        }
        year
        added
        addedBy
        rating
    }
}
```

Full graphql schema is in alt_api/schema.graphql

### How to navigate the code?

./models contains models with static methods that are used to do anything database-related  
./views contains rest api methods, structured with flask blueprints  
./alt_api contains graphql blueprint, schema, queries and mutations  
./utils contains useful functions and classes that can be used anywhere
