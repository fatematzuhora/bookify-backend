### Task Estimation
* Develop `USER` module including `signup` and `signin` endpoints. **[ 3hrs ]**
    - A hashed password will store in the database, including a unique SALT key
    - Signup required email verification
    - Successful login will return a JWT token
    - Logout and expire JWT token
* Develop `PROPERTY` module including CRUD endpoints. **[ 3hrs ]**
    - Build relationship between Property & User
    - Develop Image upload functionality
* Build AuthGuard to ensure user who is not the creator of the property can not update / delete the property. **[ 1hr ]**
* Develop `RATING` module including CRUD endpoints. **[ 3hrs ]**
    - Build relationship between Property, Rating & User
    - User can not give a rating on their own property
* Implement AuthGuard to ensure user who is not the creator of the rating can not update / delete the rating. **[ 0.5h ]**
* Develop `COMMENT` module including CRUD endpoints. **[ 2hrs ]**
    - Build relationship between Property, Comment & User
* Implement AuthGuard to ensure the user who is not the creator of the comment can not update / delete the comment. **[ 0.5h ]**
* Develop search endpoint. **[ 2hrs ]**
* Implement pagination on the search endpoint. **[ 1hr ]**
* Develop Image upload functionality for `USER` as avatar. **[ 1hr ]**
* Dockerize the app. **[ 1hr ]**

#### Estimate [ 18hrs ]
#### Confidence [ 75% ]
