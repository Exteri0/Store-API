# Storefront Backend Project

## Instructions (MUST DO FOR THE PROJECT TO WORK)

First, you'll need to write the following codes into a psql (shell) terminal with a super user account for the program to run:

```
postgres=# create database egfwd2;
postgres=# create user fwd2 with password 'udacity';
postgres=# ALTER DATABASE egfwd2 OWNER TO "fwd2";
postgres=# CREATE DATABASE egfwd2_test;
postgres=# ALTER DATABASE egfwd2_test OWNER TO "fwd2";
```

You're free to change the name of the user, database, password..etc. But be sure to make a .env variable with all your used variables regardless of what you used.

You can find a .env.example that is written according to the names mentioned in the shell scripts, tailor it to your preference.

And then run `db-migrate up` in the vs code terminal to run the migrations.

Now that we're done with setting up our project, now the next step is to sign up with a user.

Go to Postman and do a '/users' [POST] request.

Provide the user information(firstname,lastname and password) in the body of the request like this:

```JSON
{
    "firstName":"John",
    "lastName":"Doe",
    "password":"pass123"
}
```

Finally sign in with it with the '/users/signin' [POST].

Store the resulting token to use it in any other requests you'd want to.

One last note, this project uses the default port 5432.
