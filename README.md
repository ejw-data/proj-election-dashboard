# dashboard-election  

Author:  Erin James Wills - ejw.data@gmail.com  

![](./static/images/mount_rushmore.jpg)  

<br>

## Overview  





## Database Setup

1.  Create a database named `election_db` in pgAdmin (postgreSQL).
1.  Open a query tool and generate the schema by running the contents of `development/data/postgres/sql_erd_final.txt`.
1.  Insert the table data by importing the contents of `development/data/postgres/data_db.csv`  
1.  Confirm your username and port number by going to the properties of the server and going to the connections tab.  Username and port are listed on this tab.  
1.  Update this information in the app.py within the `create_engine()` function.  

## Serializing Postgres Responses  
*  One option is to use Marshmallow since it's schema can be used to assist with this.  
*  Otherwise, each needed postgres column can be extracted  by using the .__dict__ constructor.  This is a fast way of fixing the problem.
*  The final method is to extract each key manually into a new dictionary and jsonify this new dictionary.  

## Map Setup  

Two of the leaflet setups are standard and don't require much work.  The two maps might be able to be combined into one map.  

The map that has two geojson overlays is a bit more difficult to manage sonce both overlays are on at the same time.  I think the code can be rewritten to get this to work.  

## Future tasks

1.  rename js files and refactor  
1.  merge two maps into one  
1.  reconfigure if possible the green black map so the data is brought in differently.  This might be a geopandas task to create a new layer.  


## Other Documents

[Original Page](./application.md)