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
*  Otherwise, each needed postgres column can be extracted  