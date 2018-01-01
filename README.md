# Trello Client

Trello Client Extensions API

## Trello Client Instance: 

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


## Trello Client Operations: 

### Organization:
It is possible to interact Organization using the object `client.organization`. 

#### Create
Creates an organization if does not exist.

```javascript
let resultP = client.organization.create(data, force = false);
```

#### Delete
Creates an organization if does not exist.

```javascript
let resultP = client.organization.delete(data, deleteBoards = false);
```

#### GetByName
Search for a specific organization by `organizationName`

```javascript
let resultP = client.organization.getByName(organizationName);
```

#### GetById
Search for a specific organization by `idOrganization`

```javascript
let resultP = client.organization.getById(idOrganization);
```

#### GetBoards
Returns all boards for an organization given an `idOrganization`

```javascript
let resultP = client.organization.getBoards(idOrganization);
```

#### SearchFor:
```javascript
let resultP = client.organization.searchFor(searchTerm);
```

### Boards:
It is possible to interact Boards using the object `client.board`. 

#### Create
```javascript
let resultP = client.board.create(data, force = false)
```

#### Delete
```javascript
let resultP = client.board.delete(boardId)
```

#### Clone 
```javascript
let resultP = client.board.clone(fromBoard, toBoard)
```

#### GetById
```javascript
let resultP = client.board.getById(idBoard)
```

#### GetLists
```javascript
let resultP = client.board.getLists(idBoards)
```

#### GetByName
```javascript
let resultP = client.board.getByName(idOrganization, boardName)
```

#### SearchFor
```javascript
let resultP = client.board.searchFor(searchTerm)
```

### Lists:
It is possible to interact Lists using the object `client.list`. 

create(data, force = false)

setPosition(idList, position)

getByName(idBoard, listName)


#### Rotate Left
Apply a Rotate Left Operation to all lists inside a board.
rotateLeft(idBoard, count)

#### Rotate Right     
Apply a Rotate Right Operation to all lists inside a board.
rotateRight(idBoard, count)

### Cards:

## On going:
 - Adding more operations;
 - Improving Documentation;
 - Adding more tests;
