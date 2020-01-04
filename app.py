# Dependencies
# ----------------------------------  https://github.com/pallets/flask-sqlalchemy/issues/98
from flask import Flask, render_template 
from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric

app = Flask(__name__)

ENV = 'prod'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5433/election_db'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://bdwrgfxtgonvby:333ccd10d6c1f8d04a9c2bd3023b9e48b343371559c97a034a28080decf9892c@ec2-107-22-216-123.compute-1.amazonaws.com:5432/d6cd55jo1ktp4t'

app.config['SQLACHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#Base = declarative_base()

class Election(db.Model):  # removed:  Base
    __tablename__ = 'test'
    id = db.Column(db.Integer, primary_key=True)
    x = db.Column(db.Numeric)
    y = db.Column(db.Numeric)
    z = db.Column(db.Numeric)

    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

@app.route('/')    # removed:  , methods=['GET']
def index():
    test = db.session.query(Election).all()
    for record in test:
        print(record.y)
    return render_template("index.html", data=test)

if __name__ == '__main__':
    app.run()




