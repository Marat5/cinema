#!/bin/sh
cd frontend; npm run build; rm -r ../backend/cinema/react_build; mv ./build* ../backend/cinema/react_build;