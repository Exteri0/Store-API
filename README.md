# Storefront Backend Project

# Instructions (MUST DO FOR THE PROJECT TO WORK)

Ok so, at first you'll need to write the following codes into a psql (shell) terminal with a super user account for the program to run:    
-----
postgres=# create database egfwd2;
postgres=# create user fwd2 with password 'udacity';
postgres=# ALTER DATABASE egfwd2 OWNER TO "fwd2";
postgres=# CREATE DATABASE egfwd2_test;
postgres=# ALTER DATABASE egfwd2_test OWNER TO "fwd2";
----
And then run "db-migrate up" in the vs code terminal to run the migrations.

Ok, now we're done with setting up our project, now the next step is to sign up with a user.
Go to Postman and do a '/users' [POST] request.
Provide the user information(firstname,lastname and password).
Finally sign in with it with the '/users/signin' [POST].
And store the resulting token to use it in any other requests you'd want to.
Also the port for this project is 5432.
I hope my project is satisfactory, Thank you.