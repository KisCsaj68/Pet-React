from flask import Flask, render_template, url_for, jsonify, request
import queries
import random
from util import hash_password

app = Flask('dog_tricks')


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/tricks/name/<diff>')
def get_tricks_by_difficulty(diff):
    diff = int(diff)
    return jsonify(queries.get_trick_by_difficulty(diff))


@app.route('/tricks/<trick_id>')
def get_tricks_by_id(trick_id):
    return jsonify(queries.get_trick_by_id(trick_id))


@app.route('/tricks/random')
def get_random_tricks():
    max_id = [item["id"] for item in queries.get_max_id()][0]
    trick_id = random.randint(1, int(max_id))
    return jsonify(queries.get_random_tricks(trick_id))


@app.route('/registration', methods=["POST"])
def get_user_registration():
    name = request.json["name"]
    hashed_pw = hash_password(request.json["password"])
    email = request.json["email"]
    print(name, hashed_pw, email)
    return jsonify({"response": "ok"})


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
