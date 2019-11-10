# M5301

[![Build Status](https://travis-ci.org/Ugo-M/M5301.svg?branch=master)](https://travis-ci.org/Ugo-M/M5301)

## Install

```
npm install
```

## Launch:
```
npm start
```

## Lauch tests:
```
npm test
```

### Example of a curl request to sign up:

```
curl -i -X POST -H "Content-Type: application/json" -d '{ "username":"example","password":"pass" }' localhost:3000/api/auth/signup

```

### Example of an authenticated (JWT) get request with curl :
```
curl -X GET http://localhost:3000/api/user/ -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTcxMTUxMjIxLCJleHAiOjE1NzEyMzc2MjF9.46h6B23lSofOtpf28wEKPI3DXLyzC__bCxMfbkT-5l0'
```


