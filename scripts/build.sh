#!/bin/sh
cd frontend; npm run build; mv ./build* ../backend/cinema/react_build;