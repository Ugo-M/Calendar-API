## Authentication  

 
### Sign up


#### route
    /api/user/auth/signup
    
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
    

#### example

```
curl -X POST \
  http://localhost:3000/api/user/auth/signup/ \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -d '{
  	"username": "foo",
  	"password": "bar"
  }'
``` 

 
### Log In
 
 
#### route
     /api/user/auth/login
     
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
     
 
#### example
 
```
curl -X POST \
  http://localhost:3000/api/user/auth/login/ \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -d '{
	"username": "foo",
	"password": "bar"
}'
```