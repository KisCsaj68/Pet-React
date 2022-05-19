from flask import Flask, render_template, url_for, jsonify, request, session
import queries
import random
from util import hash_password, verify_password
import uuid

app = Flask('dog_tricks')
app.secret_key = str(uuid.uuid4())


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
    email_exists = [item[1] for item in queries.check_email(email).items()]
    print(email_exists[0])
    if email_exists[0]:
        return jsonify({"response": "Already registered!"})
    else:
        queries.add_new_user(name, hashed_pw, email)
        return jsonify({"response": "ok"})


@app.route('/login', methods=["POST"])
def login_user():
    email = request.json["email"]
    hashed_password = ([item[1] for item in queries.get_user_password(email).items()][0])
    user_id = ([item[1] for item in queries.get_user_id(email).items()][0])
    password = request.json["password"]
    if verify_password(password, hashed_password):
        session["user_id"] = user_id
        return jsonify({"response": "ok"})
    return jsonify({"response": "Invalid data"})


@app.route('/logout')
def handle_logout():
    session.pop["user_id"]


@app.route('/user/tricks')
def get_tricks_by_user():
    user_id = session["user_id"]
    return jsonify(queries.get_tricks_by_user_id(user_id))


@app.route('/user/tricks/name/<type>')
def get_tricks_name_by_user(type):
    user_id = session["user_id"]
    return jsonify(queries.get_tricks_name_by_user_id(user_id, type))


@app.route('/user/trick/add/<trick_id>', methods=["POST", "PUT"])
def add_new_user_tricks(trick_id):
    if session["user_id"]:
        user_id = session["user_id"]
        if request.method == "POST":
            for item in queries.get_user_trick_exists(user_id, trick_id):
                trick_exists = item["exists"]
            if not trick_exists:
                queries.add_new_user_tricks(user_id, trick_id)
                return jsonify({"response": "ok"})
        elif request.method == "PUT":
            queries.update_user_tricks(user_id, trick_id)
            return jsonify({"response": "ok"})
    return jsonify({"response": "error"})


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
