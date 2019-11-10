## Authentication   
 
### Sign up
 
    route : "/api/auth/signup"
    
    parameters :
    {
        "username" : "example",
        "password" : "pass"
    }
    
    Return :
    
    | Status code |               message              |
    |:-----------:|:----------------------------------:|
    |     201     |       OK -> created user foo       |
    |     400     | Fail -> Username is already taken! |
    |     400     |          missing arguments         |
    
    exemple with a curl request
    
```
    curl -i -X POST -H "Content-Type: application/json" -d '{ "username":"example","password":"pass" }' localhost:3000/api/auth/signup
```
 