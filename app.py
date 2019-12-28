# from sqlalchemy.dialects import postgresql
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5433/election_db'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLACHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# New - added with Marshmallow test
ma = Marshmallow(app)
# End New


# Using smaller test database to see if this will work
class Election(db.Model):
    __tablename__ = 'test'
    id = db.Column(db.Integer, primary_key=True)
    x = db.Column(db.Numeric)
    y = db.Column(db.Numeric)
    z = db.Column(db.Numeric)

    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

# New - added with Marshmallow test
class ElectionSchema(ma.Schema):
    class Meta:
        fields = ('id','x','y','z')

election_schema = ElectionSchema()
elections_schema = ElectionSchema(many=True)
# End New


@app.route('/', methods=['GET'])
def index():

    # Method using Marshmallow
    data1=Election.query.all()
    result = elections_schema.dump(data1)
    return result

        # Method similar to class example, but this method does not connect to the database like the Heroku examples
        # session = Session(engine)
        # results = session.query(house_districts.first_name).all()
        # session.close()

        # Method used in tutorial
        # results = session.query(Election).filter_by(x=6).first()

        # Test:  Shows that dictionary can be sent to the browser and it works
        # return jsonify({'msg':'Hellow world'})

        # Structure of what final return should look like
        # return render_template('index.html', results = results)

if __name__ == '__main__':
    app.run()

