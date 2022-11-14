#!/bin/sh
cd backend; python3 -m venv .venv; source .venv/bin/activate; pip install -r requirements.txt;
cd ..; cd frontend; npm i;