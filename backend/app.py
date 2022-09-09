from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"


@app.route("/movies", methods=['GET'])
def movies():
    movie_list = [{"name": "Inception"}, {"name": "Moonrise Kingdom"}]
    return movie_list
