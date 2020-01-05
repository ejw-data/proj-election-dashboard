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

class Election(db.Model): 
    __tablename__ = 'districts'
    id = db.Column(db.Integer, primary_key=True)
    district = db.Column(db.String) 
    code = db.Column(db.String) 
    party = db.Column(db.String)  
    first_name = db.Column(db.String)  
    last_name = db.Column(db.String)  
    first_elected = db.Column(db.Integer) 
    birth_year = db.Column(db.Integer)   
    gender = db.Column(db.String) 
    race_ethnicity = db.Column(db.String) 
    religion = db.Column(db.String)
    lgbtq = db.Column(db.String)
    votepercent_president2016_democrat = db.Column(db.Float) 
    votepercent_president2016_republican = db.Column(db.Float) 
    votepercent_president2012_democrat = db.Column(db.Float)
    votepercent_president2012_republican = db.Column(db.Float) 
    votepercent_president2008_democrat = db.Column(db.Float) 
    votepercent_president2008_republican = db.Column(db.Float) 
    rvotepercent_house_democrat = db.Column(db.Float) 
    rvotepercent_house_republican = db.Column(db.Float) 
    votepercent_president2004_democrat = db.Column(db.Float)  	
    votepercent_president2004_republican = db.Column(db.Float)	
    votepercent_president2000_democrat = db.Column(db.Float) 	
    votepercent_president2000_republican = db.Column(db.Float)	
    votepercent2014_house_democrat = db.Column(db.Float) 
    votepercent2014_house_republican = db.Column(db.Float) 
    two_party2012_dem = db.Column(db.Float) 
    two_party2012_rep = db.Column(db.Float)
    acs_population_adult_white = db.Column(db.Float)
    acs_population_adult_black = db.Column(db.Float) 
    acs_population_adult_latino = db.Column(db.Float)
    acs_population_adult_asianpacificislander = db.Column(db.Float) 
    acs_population_adult_native = db.Column(db.Float)  
    acs_population_adult_other = db.Column(db.Float)
    acs_bachelordegree_age25plus = db.Column(db.Float)
    acs_ba_rank = db.Column(db.Float) 
    acs_ba_white = db.Column(db.Float) 
    acs_ba_white_rank = db.Column(db.Float) 
    acs_medianincome = db.Column(db.Float)
    acs_medianincome_rank = db.Column(db.Float) 
    noncollege_white_share = db.Column(db.Float)
    tvotetotal_president = db.Column(db.Float)
    qvote_president_democrat = db.Column(db.Float) 
    qvote_president_republican = db.Column(db.Float)
    votetotal_president2012 = db.Column(db.Float)
    vote_president2012_democrat = db.Column(db.Float)
    vote_president2012_republican = db.Column(db.Float)  
    votetotal_president2008 = db.Column(db.Float)
    vote_president2008_democrat = db.Column(db.Float) 
    vote_president2008_republican = db.Column(db.Float) 
    votetotal2016_house = db.Column(db.Float) 
    vote_house2016_democrat = db.Column(db.Float) 
    vote_house2016_republican = db.Column(db.Float)  
    vote_house2016_other = db.Column(db.Float) 
    vote_total2014_house = db.Column(db.Float) 
    vote_house2014_democrat = db.Column(db.Float)   
    vote_house2014_republican = db.Column(db.Float)  
    vote_house2014_other = db.Column(db.Float)
    house2_party2012_dem = db.Column(db.Float)
    house2_party2012_rep = db.Column(db.Float) 
    acs_population_total = db.Column(db.Float) 
    acs_votingagepopulation_total = db.Column(db.Float)


    def __init__(self, district, code, party, first_name, last_name, first_elected, birth_year, gender, race_ethnicity, religion, lgbtq, votepercent_president2016_democrat, 
    votepercent_president2016_republican, votepercent_president2012_democrat, votepercent_president2012_republican, votepercent_president2008_democrat, 
    votepercent_president2008_republican, rvotepercent_house_democrat, rvotepercent_house_republican, votepercent_president2004_democrat, votepercent_president2004_republican, 
    votepercent_president2000_democrat, votepercent_president2000_republican, votepercent2014_house_democrat, votepercent2014_house_republican, two_party2012_dem, 
    two_party2012_rep, acs_population_adult_white, acs_population_adult_black, acs_population_adult_latino, acs_population_adult_asianpacificislander, 
    acs_population_adult_native, acs_population_adult_other, acs_bachelordegree_age25plus, acs_ba_rank, acs_ba_white, acs_ba_white_rank, acs_medianincome, 
    acs_medianincome_rank, noncollege_white_share, tvotetotal_president, qvote_president_democrat, qvote_president_republican, votetotal_president2012, 
    vote_president2012_democrat, vote_president2012_republican, votetotal_president2008, vote_president2008_democrat, vote_president2008_republican, votetotal2016_house, 
    vote_house2016_democrat, vote_house2016_republican, vote_house2016_other, vote_total2014_house, vote_house2014_democrat, vote_house2014_republican, vote_house2014_other, 
    house2_party2012_dem, house2_party2012_rep, acs_population_total, acs_votingagepopulation_total):
        self.district = district
        self.code = code
        self.party = party 
        self.first_name = first_name
        self.last_name = last_name 
        self.first_elected = first_elected 
        self.birth_year = birth_year 
        self.gender = gender 
        self.race_ethnicity = race_ethnicity 
        self.religion = religion 
        self.lgbtq = lgbtq 
        self.votepercent_president2016_democrat = votepercent_president2016_democrat 
        self.votepercent_president2016_republican = votepercent_president2016_republican 
        self.votepercent_president2012_democrat = votepercent_president2012_democrat 
        self.votepercent_president2012_republican = votepercent_president2012_republican 
        self.votepercent_president2008_democrat = votepercent_president2008_democrat 
        self.votepercent_president2008_republican = votepercent_president2008_republican 
        self.rvotepercent_house_democrat = rvotepercent_house_democrat 
        self.rvotepercent_house_republican = rvotepercent_house_republican 
        self.votepercent_president2004_democrat = votepercent_president2004_democrat 
        self.votepercent_president2004_republican = votepercent_president2004_republican 
        self.votepercent_president2000_democrat = votepercent_president2000_democrat 
        self.votepercent_president2000_republican = votepercent_president2000_republican 
        self.votepercent2014_house_democrat = votepercent2014_house_democrat 
        self.votepercent2014_house_republican = votepercent2014_house_republican 
        self.two_party2012_dem = two_party2012_dem 
        self.two_party2012_rep = two_party2012_rep 
        self.acs_population_adult_white = acs_population_adult_white 
        self.acs_population_adult_black = acs_population_adult_black
        self.acs_population_adult_latino = acs_population_adult_latino 
        self.acs_population_adult_asianpacificislander = acs_population_adult_asianpacificislander 
        self.acs_population_adult_native = acs_population_adult_native 
        self.acs_population_adult_other = acs_population_adult_other 
        self.acs_bachelordegree_age25plus = acs_bachelordegree_age25plus 
        self.acs_ba_rank = acs_ba_rank 
        self.acs_ba_white = acs_ba_white 
        self.acs_ba_white_rank = acs_ba_white_rank 
        self.acs_medianincome = acs_medianincome 
        self.acs_medianincome_rank = acs_medianincome_rank 
        self.noncollege_white_share = noncollege_white_share 
        self.tvotetotal_president = tvotetotal_president 
        self.qvote_president_democrat = qvote_president_democrat 
        self.qvote_president_republican = qvote_president_republican 
        self.votetotal_president2012 = votetotal_president2012 
        self.vote_president2012_democrat = vote_president2012_democrat 
        self.vote_president2012_republican = vote_president2012_republican 
        self.votetotal_president2008 = votetotal_president2008 
        self.vote_president2008_democrat = vote_president2008_democrat 
        self.vote_president2008_republican = vote_president2008_republican 
        self.votetotal2016_house = votetotal2016_house 
        self.vote_house2016_democrat = vote_house2016_democrat 
        self.vote_house2016_republican = vote_house2016_republican 
        self.vote_house2016_other = vote_house2016_other
        self.vote_total2014_house = vote_total2014_house 
        self.vote_house2014_democrat = vote_house2014_democrat 
        self.vote_house2014_republican = vote_house2014_republican 
        self.vote_house2014_other = vote_house2014_other 
        self.house2_party2012_dem = house2_party2012_dem 
        self.house2_party2012_rep = house2_party2012_rep 
        self.acs_population_total = acs_population_total 
        self.acs_votingagepopulation_total = acs_votingagepopulation_total

class ElectionSchema(ma.ModelSchema):
    class Meta:
        model = Election
        json_module = simplejson



@app.route('/')    # removed:  , methods=['GET']
def index():
    # test = db.session.query(Election).all()
    # for record in test:
    #     print(record.x)
    return render_template("index.html")

@app.route("/<district>")
def district_info(district):
    election = Election.query.filter_by(id=district)
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
    election = Election.query.filter_by(id=num)
    election_schema = ElectionSchema(many=True)
    result = election_schema.dump(election)
    data = result[0]
    return {"data":data}


#Need Route for my scatter and line graphs and route for individual pages.
#Also I need to import my api key so that it remains hidden and remove the config file from the webpage.

if __name__ == '__main__':
    app.run()




