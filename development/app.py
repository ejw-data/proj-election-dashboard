# Dependencies
# ----------------------------------  https://github.com/pallets/flask-sqlalchemy/issues/98
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Numeric
from flask_marshmallow import Marshmallow 
import simplejson

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
ma = Marshmallow(app)

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

class ElectionSchema(ma.ModelSchema):
    class Meta:
        model = Election
        json_module = simplejson



@app.route('/')    # removed:  , methods=['GET']
def index():
    test = db.session.query(Election).all()
    for record in test:
        print(record.x)
    return render_template("index.html")

@app.route("/<district>")
def district_info(district):
    election = Election.query.filter_by(x=district)
    election_schema = ElectionSchema(many=True)
    data = election_schema.dump(election)
    return render_template("district_template.html", data = data)

@app.route("/api/all")
def district_table():
    elections = Election.query.all()  #.filter_by(x=2)
    elections_schema = ElectionSchema(many=True)
    data= elections_schema.dump(elections)
    return {"data":data}

@app.route("/api/<num>")
def district_api(num):
    election = Election.query.filter_by(x=num)
    election_schema = ElectionSchema(many=True)
    result = election_schema.dump(election)
    data = result[0]
    return {"data":data}


#Need Route for my scatter and line graphs and route for individual pages.
#Also I need to import my api key so that it remains hidden and remove the config file from the webpage.

if __name__ == '__main__':
    app.run()




