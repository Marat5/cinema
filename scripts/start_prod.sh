#!/bin/sh
cd frontend; npm run build; rm -r ../backend/cinema/react_build; mv ./build* ../backend/cinema/react_build; cd ..;
cd backend; source .venv/bin/activate; flask --app cinema run --port 8000;