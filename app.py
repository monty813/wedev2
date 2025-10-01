from flask import Flask, request, render_template 

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about") 
def about(): 
     return render_template("about.html") 
 
@app.route('/submit', methods=["POST"]) 

def submit(): 
    fname = request.form['fname'] 
    lname = request.form['lname']
    msg = request.form['msg'] 
    return f"Thanks, your name is: {fname} {lname} and you said: {msg}" 


if __name__ == "__main__":
    app.run(debug=True)