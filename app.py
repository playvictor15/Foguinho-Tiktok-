from flask import Flask, request, jsonify
import sqlite3
import bcrypt

app = Flask(__name__)

# Criar banco de dados
def init_db():
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            pet_name TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Rota de cadastro
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data["username"]
    password = data["password"]
    pet_name = data["pet_name"]

    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    try:
        conn = sqlite3.connect("users.db")
        c = conn.cursor()
        c.execute("INSERT INTO users (username, password, pet_name) VALUES (?, ?, ?)", 
                  (username, hashed_pw, pet_name))
        conn.commit()
        conn.close()
        return jsonify({"message": "Usuário registrado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Nome de usuário já existe"}), 400

# Rota de login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]

    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute("SELECT password, pet_name FROM users WHERE username = ?", (username,))
    user = c.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode(), user[0]):
        return jsonify({"message": "Login bem-sucedido!", "pet_name": user[1]})
    else:
        return jsonify({"error": "Usuário ou senha incorretos"}), 401

if __name__ == "__main__":
    app.run(debug=True)
