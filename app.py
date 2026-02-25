from flask import Flask, render_template, redirect, jsonify, request
import pymysql

app = Flask(__name__)

# creates the connection to the DB. If the DB is not running, this will crash your server! (add a # to commment it out in that case)
conn = pymysql.connect(
  host='localhost', 
  user='root', 
  password='mysql', 
  database='the_base', 
  cursorclass=pymysql.cursors.DictCursor
)

# starting with /api/ is not required, but it can be nice to separate human-readable pages from pages that are there to use the DB
@app.route("/api/get_all_users")
def getAllUsers():
    instance = conn.cursor()                    # starts an instance of the connection
    instance.execute('SELECT * FROM users')     # runs the "select all columns" query
    return jsonify(instance.fetchall())         # transforms the result in the JSON data format and returns all rows


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about") 
def about(): 
     return render_template("about.html") 

@app.route("/place") 
def place(): 
     return render_template("place.html") 

@app.route("/game")
def game():
    return render_template("game.html")
 
@app.route('/submit', methods=["POST"]) 

def submit(): 
    fname = request.form['fname'] 
    lname = request.form['lname']
    msg = request.form['msg'] 
    return f"Thanks, your name is: {fname} {lname} and you said: {msg}" 

@app.route("/api/insert_user", methods=['GET'])
def insertUserGET():
    data = request.args
    if not data:
        return jsonify({"status": "error", "message": "Invalid arguments"})
    
    lastName = data.get('last_name')
    firstName = data.get('first_name')
    email = data.get('email')

    instance = conn.cursor()
    instance.execute('INSERT INTO users (last_name, first_name, email) VALUES (%s, %s, %s)', 
                     (lastName, firstName, email))
    conn.commit()
    newID = instance.lastrowid
    return jsonify({"status": "created", "id": newID})

@app.route("/api/get_comments", methods=['GET'])
def getCOMMENTS():
    data = request.args
    arg1 = data.get('page') # this is the name used in the URL to send stuff here
    
    instance = conn.cursor()
    instance.execute(
        'SELECT page_name,author_name,message FROM comments WHERE page_name = %s',
        (arg1,)
    )
    results = instance.fetchall()
    
    return jsonify({
        'status': 'success',
        'TODO': results  # this TODO name is later used in javascript
    })

@app.route("/api/add_comment", methods=['POST'])
def insertTODO():
    data = request.form
    if not data:
        return jsonify({"status" : "error", "message": "invalid payload"})
    
    arg1 = data.get('place')     # change and add more as needed. 
    arg2 = data.get('name')
    arg3 = data.get('message')
    
    try:
        instance = conn.cursor()
        instance.execute('INSERT INTO table_name (column_names) VALUES (%s, %s)', 
                        (arg1, arg2))
        conn.commit()
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    return jsonify({"status": "success", "message": "Insert successful!"})

if __name__ == "__main__":
    app.run(debug=True)
