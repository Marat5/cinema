#!/bin/sh
cd backend; python3 -m venv .venv; source .venv/bin/activate; pip install;
cd ..; cd frontend; npm i;