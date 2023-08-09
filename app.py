# Dependencies
from flask import Flask, render_template, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import json

# Establish flask 
app = Flask(__name__)


# Database Setup
ENV = 'dev'

if ENV == 'dev':
    engine = create_engine('postgresql://postgres:postgres@localhost:5432/election_db')
else:
    engine = create_engine('postgres://bdwrgfxtgonvby:333ccd10d6c1f8d04a9c2bd3023b9e48b343371559c97a034a28080decf9892c@ec2-107-22-216-123.compute-1.amazonaws.com:5432/d6cd55jo1ktp4t')


# Reflect an existing database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Election = Base.classes.districts

# Create routes and api

# shows index.html page
@app.route('/') 
def index():
    return render_template("index.html")


# displays district information on district.html page
@app.route("/<district>")
def district_info(district):

    # Create session (link) from Python to the DB
    session = Session(engine)
    elections = session.query(Election).filter_by(code=district)
    
    results = []
    for u in elections:
        temp = u.__dict__
        del temp['_sa_instance_state']
        results.append(temp)
    
    session.close()
    location = district
    return render_template("district.html", data = results, district=location)


# used to make the line chart on the index.html page
@app.route("/api/all")
def district_table():

    # Create our session (link) from Python to the DB
    session = Session(engine)
    elections = session.query(Election).all() 
    
    results = []
    for u in elections:
        temp = u.__dict__
        del temp['_sa_instance_state']
        results.append(temp)

    session.close()
    return jsonify(json.dumps(results))   #jsonify(elections)


@app.route("/api/<district>")
def district_api(district):

    # Create our session (link) from Python to the DB
    session = Session(engine)
    elections = session.query(Election).filter_by(code=district)
    
    results = []
    for u in elections:
        temp = u.__dict__
        del temp['_sa_instance_state']
        results.append(temp)
    
    session.close()
    return json.dumps(results)


# used to make area plot on the district.html page
@app.route("/api/election/president/<district>")
def district_election_api(district):

    # Create our session (link) from Python to the DB
    session = Session(engine)
    election = session.query(Election).filter_by(code=district).all()
    session.close()
    for item in election:
        temp = item.__dict__
        v2000d = temp["votepercent_president2000_democrat"]
        v2000r = temp["votepercent_president2000_republican"]
        v2004d = temp["votepercent_president2004_democrat"]
        v2004r = temp["votepercent_president2004_republican"]
        v2008d = temp["votepercent_president2008_democrat"]
        v2008r = temp["votepercent_president2008_republican"]
        v2012d = temp["votepercent_president2012_democrat"]
        v2012r = temp["votepercent_president2012_republican"]
        v2016d = temp["votepercent_president2016_democrat"]
        v2016r = temp["votepercent_president2016_republican"]

        graph_data = [{"date":"00-Jan-01", "Democrat":v2000d, "Republican":v2000r},
        {"date":"04-Jan-01", "Democrat":v2004d, "Republican":v2004r},
        {"date":"08-Jan-01", "Democrat":v2008d, "Republican":v2008r},
        {"date":"12-Jan-01", "Democrat":v2012d, "Republican":v2012r},
        {"date":"16-Jan-01", "Democrat":v2016d, "Republican":v2016r}]

    return jsonify(graph_data)


if __name__ == '__main__':
    app.debug=True
    app.run()




