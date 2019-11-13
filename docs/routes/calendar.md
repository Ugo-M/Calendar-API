 
### List all users and their calendars
 
 
#### route
     /api/calendar/
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| Calendars                                 |
     
 
#### example
 
```
curl -X GET http://localhost:3000/api/calendar/ \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0'
```

### Get a calendar from his id
 
 
#### route
     /api/calendar/:id
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 

 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 200         	| Calendar                                  |
 | 404         	| 'Calendar not found'                      |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X GET \ 
  http://localhost:3000/api/calendar/42 \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0'
```


### Add a calendar
 
 
#### route
     /api/calendar/
     
#### header
 JWT token
 
    'token: eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9'
 
#### parameters
 
     {
         user_id : 42,
         calendar_name : 'calendar_test'
     }
 
 
#### Return 
     
 | Status code 	| message                            	|
 |-------------	|------------------------------------	|
 | 201         	| Calendar                              |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X POST \
  http://localhost:3000/api/calendar/ \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \
  -d '{
    username: 42,
    calendar_name: 'foo'
   }'
```


### update a calendar's name
 
 
#### route
     /api/calendar/:id
     
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
 | 200         	| Calendar                                  |
 | 404         	| 'Calendar not found'                      |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X PUT \ 
  http://localhost:3000/api/calendar/1 \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \ 
  -d '{
   	username: 'foo'
  }'
```


### delete a calendar
 
 
#### route
     /api/calendar/
     
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
 | 204         	| 'Calendar deleted'                        |
 | 404         	| 'Calendar not found'                      |
 | 400         	| error                                 |
     
 
#### example
 
```
curl -X DELETE \ 
  http://localhost:3000/api/calendar/ \
  -H 'Host: localhost:3000' \
  -H 'Content-Type: application/json' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0' \ 
  -d '{
   	"username": "foo"
  }'
```