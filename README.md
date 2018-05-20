# Puma Pay test

Nodejs module for a recurring payment scheduler 

## Getting Started

use ```git clone <repo>``` to clone the project.

### Prerequisites

You will need following dependencies
- node
- mysql

OSX
```
brew install node
npm install mysql
```

### Installing

Open the root directory and type the command

```
npm install
```
This will install all the necessary depenecies

To create a database, run the following commands

```
brew services start mysql
mysql -u root
```
after you succesfully connect to the server

```
create database <db>
SET PASSWORD FOR 'ENTER-USER-NAME-HERE'@'localhost' = PASSWORD("newpass");
```
then

```
mysql -u root -p
```
and enter password (You will also need to change the `/config/config.json` file to match your settings)


##  Documentation

For documentation run
```
gulp
```
This will generate `api-docs` folder

### Development

```
npm start
```

## Migrations and Seeds

Before running the test, run the follwing commands provided you succesfully installed mysql and created a database 

```
sequelize db:migrate
sequelize db:seed:all
```

## Running the tests

```
npm test
```

