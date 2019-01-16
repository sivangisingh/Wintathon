from flask import render_template
from flask import url_for, redirect, request, make_response,jsonify
# Importing Session Object to use Sessions
from flask import session
import json
from app import app

# @app.route('/')




# @app.route('/test1', methods=['GET', 'POST'])
# def test1():
#     if request.form.get('registration') == 'success':
#         return jsonify({'abc': 'successfuly registered'})

#     return jsonify({'abc': 'registration unsuccessful'})

# from flask import Flask, jsonify, render_template, request
# app = Flask(__name__)

# @app.route('/_add_numbers')
# def add_numbers():
#     a = request.args.get('a', 0, type=int)
#     b = request.args.get('b', 0, type=int)
#     return jsonify(result=a + b)

# @app.route('/')
# def index():
#     return 1



# @app.route('/index')
# def index():
# 	user = {'nickname': 'Mitesh'}
# 	posts = [
# 		{
# 			'author': {'nickname': 'Mitesh'},
# 			'body': 'Beautiful Day in Hyderabad!'
# 		},
# 		{
# 			'author': {'nickname': 'Mitesh'},
# 			'body': 'Andhadhun Movie was so cool.'
# 		}
# 	]
# 	return render_template('index.html',title='Home',user=user,posts=posts)

@app.route('/about', methods=['POST'])
def about():
    nodeList = request.get_json()
	# app.logger.debug("JSON received...")
    return  jsonify(nodeList)

# @app.route('/login')
# def login():
# 	return render_template('login.html')

# @app.route('/loginNext',methods=['GET','POST'])
# def loginNext():
# 	# To find out the method of request, use 'request.method'
# 	if request.method == "GET":
# 		print request.args
# 		userID = request.args.get("userid")
# 		password = request.args.get("loginpassword")
# 		# Can perform some password validation here
# 		return "Login Successful for: %s" % userID
# 	elif request.method == "POST":
# 		userID = request.form['userid']
# 		password = request.form['loginpassword']
# 		# Can perform some password validation here!
# 		return "Login Successful for: %s" % userID

# @app.route('/setCookie',methods=['GET','POST'])
# def setCookie():
# 	if request.method == "POST":
# 		userID = request.form['userid']
# 		# Create the Response Object
# 		resp = make_response(render_template('landing.html'))
# 		# Set the cookie value. Will use this name to refer to the cookies later
# 		resp.set_cookie('userID',userID)
# 		return resp

# @app.route('/readCookie')
# def readCookie():
# 	# Get all the cookies in request.cookies and then get the cookie named userID
# 	userID = request.cookies.get('userID')
# 	return '<h1>Hello '+ userID +' !!</h1>'

# @app.route('/home')
# def homePage():
# 	# Check if userID session exists!
# 	if 'userID' in session:
# 		return 'Logged in As: ' + session['userID'] + ' <br> Click <a href="/logout">here</a> to logout!'
# 	return "You are not logged in! <br>Click <a href = '/loginSession'></b>Here</b></a> to Login!"

# @app.route('/loginSession',methods=['GET','POST'])
# def loginSession():
# 	if request.method == "POST":
# 		# Create a session variable
# 		session['userID'] = request.form['userid']
# 		return redirect(url_for('homePage'))
# 	return '''
# 	<form action = "" method = "post">
#       <p><input type = "text" name = "userid" /></p>
#       <p><input type = "submit" value = "Login" /></p>
#    </form>
	
#    '''

# @app.route('/logout')
# def logout():
# 	# Remove the session variable if present
# 	session.pop('userID',None)
# 	return redirect(url_for('homePage'))