## Authentication  

 
### Sign up


#### route
    /api/auth/signup
    
#### parameters

    {
        "username" : "foo",
        "password" : "bar"
    }


#### Return 
    
| Status code 	| message                            	|
|-------------	|------------------------------------	|
| 201         	| OK -> created user foo             	|
| 400         	| Fail -> Username is already taken! 	|
| 400         	| missing arguments                  	|
    

#### exemple

```
curl -i -X POST -H "Content-Type: application/json" -d '{ "username":"foo","password":"bar" }' localhost:3000/api/auth/signup
``` 

 
### Log In
 
 
#### route
     /api/auth/login
     
#### parameters
 
     {
         "username" : "foo",
         "password" : "bar"
     }
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| {"auth": true, "accessToken": "..." } |
 | 401         	| Invalid password!                  	|
 | 404         	| User not found.                     	|
     
 
#### exemple
 
```
curl -X POST \
  http://localhost:3000/api/auth/login/ \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -d '{
	"username": "foo",
	"password": "bar"
}'
```