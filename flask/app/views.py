from flask import render_template
from flask import url_for, redirect, request, make_response,jsonify
# Importing Session Object to use Sessions
from flask import session
import json
from app import app
import urllib
from bs4 import BeautifulSoup
from datetime import datetime
import sqlite3
import os.path
import flask
from werkzeug import secure_filename

@app.route('/about', methods=['POST'])
def about():
    url='https://www.linkedin.com/learning/search?keywords=python'
      
    #open with GET method 
    resp=urllib.urlopen(url).read() 
    soup=BeautifulSoup(resp)
    nodeList = request.get_json()    	  
    #http_respone 200 means OK status 
    # if resp.status_code==200: 
        # we need a parser,Python built-in HTML parser is enough . 
        # soup=BeautifulSoup(resp.text,'html.parser')
        # l is the list which contains all the text i.e news  
    data=soup.findAll("ul",attrs={"class":"entity-feed-list"}) 
    return  jsonify(data)
