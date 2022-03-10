from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)

# CREATE
# READ
# UPDATE
# DELETE