 
### List all users and their calendars
 
 
#### route  (GET)
     /api/user/
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| Users                                 |
     
 
#### example
 
```
curl -X GET http://localhost:3000/api/user/ -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0'
```

### Get an user from his id
 
 
#### route  (GET)
     /api/user/id/:id
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 

 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| User                                  |
 | 404         	| 'User not found'                      |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X GET http://localhost:3000/api/user/id/1 -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0'
```


### Get an user from his name
 
 
#### route  (GET)
     /api/user/name/:name
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 

 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| User                                  |
 | 404         	| 'User not found'                      |
 | 400         	| error                                 |
     
 
 
#### example
 
```
curl -X GET \
  http://localhost:3000/api/user/name/foo \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \
```


### Get an user's id from his name
 
 
#### route  (GET)
     /api/user/id/
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 
#### parameters
 
     {
         "username" : "foo"
     }
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| User's id                             |
 | 404         	| 'User not found'                      |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X GET \ 
  http://localhost:3000/api/user/name/foo \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \ 
  -d '{
   	"username": "foo"
  }'
```


### update an user's name
 
 
#### route  (PUT)
     /api/user/:id
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 
#### parameters
 
     {
         "username" : "foo"
     }
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| User                                  |
 | 404         	| 'User not found'                      |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X PUT \ 
  http://localhost:3000/api/user/1 \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \ 
  -d '{
   	"username": "foo"
  }'
```


### delete an user
 
 
#### route  (DELETE)
     /api/user/
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 
#### parameters
 
     {
         "username" : "foo"
     }
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 204         	| 'User deleted'                        |
 | 404         	| 'User not found'                      |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X DELETE \ 
  http://localhost:3000/api/user/ \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \ 
  -d '{
   	"username": "foo"
  }'
```