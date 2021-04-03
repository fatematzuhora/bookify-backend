# bookify-backend
A small API application for a travel company that will allow the user to publish, view, and search properties that are available for bookings based on user search criteria.

The API application is build using the [NestJS](https://nestjs.com/) framework and also the libraries of [TypeORM](https://typeorm.io/), [Passport](http://www.passportjs.org/), [JWT](https://jwt.io/). And [MySQL](https://www.mysql.com/) is used as a relational database.

### Quick Start
* Clone the repo:
```
git clone https://github.com/fatematzuhora/bookify-backend.git
```
* Go inside the folder:
```
cd bookify-backend
```
* Install necessary libraries:
```
npm i
```
* Create a database in your local machine.
* Configure your database settings on the following files:
```
- bookify-backend/config/default.yml
- bookify-backend/config/development.yml
```
* Insert your database name on `default.yml` file. For example, here the database name is `bookify`.
```
server:
  port: 8080

db:
  type: 'mysql'
  port: 3306
  database: 'bookify'

jwt:
  expiresIn: 3600
```
* Insert your database username and password on `development.yml` file. For example, here the username is `root` and the password is empty.
```
db:
  host: 'localhost'
  username: 'root'
  password: ''
  synchronize: true
```
* Run Project:
```
npm start
```
