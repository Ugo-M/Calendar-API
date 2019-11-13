# Event routes  


## List all users and their events
 
 
#### route (GET)
     /api/event/
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| Events                                |
     
 
#### example
 
```
curl -X GET http://localhost:3000/api/event/ \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0'
```

## Get an event from his id
 
 
#### route (GET)
     /api/event/:id
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 

 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| Event                                 |
 | 404         	| 'Event not found'                     |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X GET \ 
  http://localhost:3000/api/event/42 \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0'
```


## Add an event
 
 
#### route (POST)
    /api/event/
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 
#### parameters
 
     {
         user_id : 42,
         event_name : 'foo'
     }
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 201         	| Event                                 |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X POST \
  http://localhost:3000/api/event/ \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \
  -d '{
    username: 42,
    event_name: 'foo'
   }'
```


## update an event's name
 
 
#### route  (PUT)
     /api/event/:id
     
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
 | 200         	| Event                                 |
 | 404         	| 'Event not found'                     |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X PUT \ 
  http://localhost:3000/api/event/1 \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \ 
  -d '{
   	username: 'foo'
  }'
```


## delete an event
 
 
#### route  (DELETE)
     /api/event/
     
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
 | 204         	| 'Event deleted'                       |
 | 404         	| 'Event not found'                     |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X DELETE \ 
  http://localhost:3000/api/event/ \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \ 
  -d '{
   	"username": "foo"
  }'
```