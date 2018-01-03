# Trello Client

Trello Client Extensions API

## Trello Client Instance: 

```javascript
const TrelloClient= require("trello-client");

let client = new TrelloClient({
    key  : '111111111111111111111111',
    token: '111111111111111111111111111111111111111111111111111111111111111111111111'
})
```

| Name    | Type   | Mandatory | Description                                           |
|---------|:------:|:---------:|-------------------------------------------------------|
| key     | String | Yes       | Trello's Access Key                                   |
| token   | String | Yes       | Trello's Access Token                                 | 
| baseUrl | String | No        | Trellos Base Url. (Default: https://api.trello.com/1) |


## Trello Client Operations: 

### JSdoc

JSDocs can be generated by running ```npm run docs:build``` or [here](/jsdoc/index.html)

## On going:
 - Adding more operations;
 - Improving Documentation;
 - Adding more tests;
