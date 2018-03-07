## Classes

<dl>
<dt><a href="#TrelloBoards">TrelloBoards</a></dt>
<dd></dd>
<dt><a href="#TrelloCards">TrelloCards</a></dt>
<dd></dd>
<dt><a href="#TrelloLists">TrelloLists</a></dt>
<dd></dd>
<dt><a href="#TrelloOrganizations">TrelloOrganizations</a></dt>
<dd></dd>
<dt><a href="#TrelloClient">TrelloClient</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#validateConfig">validateConfig(config)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Validates the configuration object.</p>
</dd>
</dl>

<a name="TrelloBoards"></a>

## TrelloBoards
**Kind**: global class  

* [TrelloBoards](#TrelloBoards)
    * [new TrelloBoards(trelloClient)](#new_TrelloBoards_new)
    * [.searchFor(searchTerm)](#TrelloBoards+searchFor)
    * [.create(data, force)](#TrelloBoards+create) ⇒ <code>Promise.&lt;Array.&lt;{name:String, idOrganization:String, id:String, lists:Array}&gt;&gt;</code>
    * [.delete(boardId)](#TrelloBoards+delete)
    * [.clone(fromBoard, toBoard)](#TrelloBoards+clone)
    * [.getById(idBoard)](#TrelloBoards+getById)
    * [.update(board)](#TrelloBoards+update) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.getLists(idBoards)](#TrelloBoards+getLists)
    * [.getCustomFields(idBoards)](#TrelloBoards+getCustomFields)
    * [.getByName(idOrganization, boardName)](#TrelloBoards+getByName)
    * ~~[.renameBoard(boardId, newName)](#TrelloBoards+renameBoard)~~

<a name="new_TrelloBoards_new"></a>

### new TrelloBoards(trelloClient)
**Params**

- trelloClient [<code>TrelloClient</code>](#TrelloClient)

<a name="TrelloBoards+searchFor"></a>

### trelloBoards.searchFor(searchTerm)
**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- searchTerm <code>String</code>

<a name="TrelloBoards+create"></a>

### trelloBoards.create(data, force) ⇒ <code>Promise.&lt;Array.&lt;{name:String, idOrganization:String, id:String, lists:Array}&gt;&gt;</code>
Create a board if it does not exist.

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- data <code>object</code>
    - .name <code>String</code>
    - .idOrganization <code>String</code>
    - .lists <code>Array</code>
- force <code>Boolean</code> - force list creation

<a name="TrelloBoards+delete"></a>

### trelloBoards.delete(boardId)
TODO: Delete an existing board

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- boardId <code>string</code>

<a name="TrelloBoards+clone"></a>

### trelloBoards.clone(fromBoard, toBoard)
TODO: Delete an existing board

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- fromBoard <code>object</code>
    - [.name] <code>string</code> - This must be set if id is not defined
    - [.id] <code>string</code> - This must be set if name is not defined
- toBoard <code>object</code>
    - .name <code>String</code>
    - .lists <code>Array</code>

<a name="TrelloBoards+getById"></a>

### trelloBoards.getById(idBoard)
Get board by ID

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- idBoard <code>string</code>

<a name="TrelloBoards+update"></a>

### trelloBoards.update(board) ⇒ <code>Promise.&lt;\*&gt;</code>
This method allow us to update a board definition. If the board id is not present or not
valid properties exist to be updated, an error is thrown.

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- board <code>object</code> - Board object to be updated
    - [.id] <code>string</code>
    - [.name] <code>string</code>

<a name="TrelloBoards+getLists"></a>

### trelloBoards.getLists(idBoards)
Create a board if it does not exist.

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- idBoards <code>String</code>

<a name="TrelloBoards+getCustomFields"></a>

### trelloBoards.getCustomFields(idBoards)
Get custom fields assigned to a board.

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- idBoards <code>String</code>

<a name="TrelloBoards+getByName"></a>

### trelloBoards.getByName(idOrganization, boardName)
Get a board by name

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- idOrganization <code>String</code>
- boardName <code>String</code>

<a name="TrelloBoards+renameBoard"></a>

### ~~trelloBoards.renameBoard(boardId, newName)~~
***Deprecated***

rename a board

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- boardId <code>String</code> - ID of the board to be renamed
- newName <code>String</code> - Name for the list to be changed to

<a name="TrelloCards"></a>

## TrelloCards
**Kind**: global class  

* [TrelloCards](#TrelloCards)
    * [new TrelloCards(trelloClient)](#new_TrelloCards_new)
    * [.updateCard(idCard, parameters)](#TrelloCards+updateCard)
    * [.getCardDetails(idCard, options)](#TrelloCards+getCardDetails)

<a name="new_TrelloCards_new"></a>

### new TrelloCards(trelloClient)
**Params**

- trelloClient [<code>TrelloClient</code>](#TrelloClient)

<a name="TrelloCards+updateCard"></a>

### trelloCards.updateCard(idCard, parameters)
Update a card

**Kind**: instance method of [<code>TrelloCards</code>](#TrelloCards)  
**Params**

- idCard <code>String</code>
- parameters <code>Object</code> - valid options can be found here https://developers.trello.com/reference#cardsid-1

<a name="TrelloCards+getCardDetails"></a>

### trelloCards.getCardDetails(idCard, options)
Get a cards details

**Kind**: instance method of [<code>TrelloCards</code>](#TrelloCards)  
**Params**

- idCard <code>String</code>
- options <code>Object</code>
    - [.customFields] <code>Boolean</code> - If custom fields should be included in the response

<a name="TrelloLists"></a>

## TrelloLists
**Kind**: global class  

* [TrelloLists](#TrelloLists)
    * [new TrelloLists(trelloClient)](#new_TrelloLists_new)
    * [.create(data, force)](#TrelloLists+create) ⇒ <code>Promise.&lt;{name:String, idBoard:String, id:String}&gt;</code>
    * [.setPosition(idList, position)](#TrelloLists+setPosition) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.getByName(idBoard, listName, allowMultiple)](#TrelloLists+getByName) ⇒ <code>PromiseLike.&lt;T&gt;</code>
    * [.rotateLeft(idBoard, count)](#TrelloLists+rotateLeft)
    * [.rotateRight(idBoard, count)](#TrelloLists+rotateRight)
    * [.archiveAllCardsOnList(listId)](#TrelloLists+archiveAllCardsOnList)
    * [.archiveList(listId, options)](#TrelloLists+archiveList)
    * [.moveList(toBoardId, fromListId, toListName, pos)](#TrelloLists+moveList)
    * [.copyList(toBoardId, fromListId, toListName, pos)](#TrelloLists+copyList)
    * [.moveCards(toBoardId, listId, toListId)](#TrelloLists+moveCards)
    * [.update(list)](#TrelloLists+update) ⇒ <code>Promise.&lt;\*&gt;</code>
    * ~~[.renameList(listId, newName)](#TrelloLists+renameList)~~

<a name="new_TrelloLists_new"></a>

### new TrelloLists(trelloClient)
**Params**

- trelloClient [<code>TrelloClient</code>](#TrelloClient)

<a name="TrelloLists+create"></a>

### trelloLists.create(data, force) ⇒ <code>Promise.&lt;{name:String, idBoard:String, id:String}&gt;</code>
Create a list if it does not exist.

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- data <code>object</code>
    - .name <code>string</code>
    - .idBoard <code>string</code>
    - [.pos] <code>String</code> | <code>Number</code> - The position to place the list, possible values are "top", "bottom", or a positive floating point number
- force <code>Boolean</code> - force list creation

<a name="TrelloLists+setPosition"></a>

### trelloLists.setPosition(idList, position) ⇒ <code>Promise.&lt;\*&gt;</code>
This method sets a list position.

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idList <code>String</code> - List Id.
- position <code>String</code> | <code>Number</code> - List Position

<a name="TrelloLists+getByName"></a>

### trelloLists.getByName(idBoard, listName, allowMultiple) ⇒ <code>PromiseLike.&lt;T&gt;</code>
This method is used to search for a list By name in a Board.
The board is identified by a `idBoard`.

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- listName <code>String</code> - List Name to search for
- allowMultiple <code>Boolean</code> - If this is set to true, an array of lists will be returned, otherwise only one list will be returned or an error thown if the number of found list !==1

<a name="TrelloLists+rotateLeft"></a>

### trelloLists.rotateLeft(idBoard, count)
Apply a Rotate Left Operation to all lists inside a board.

Operation:
```
  +------------------------------------+
  |   +---+---+---+---+---+---+---+    |
  +-- | 1 | 2 | 3 | . | . | . | n | <--+
      +---+---+---+---+---+---+---+
```

Outcome:
```
       +---+---+---+---+---+---+---+
       | 2 | 3 | . | . | . | n | 1 |
       +---+---+---+---+---+---+---+
```

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- count <code>Number</code> - number of items to be rotated

<a name="TrelloLists+rotateRight"></a>

### trelloLists.rotateRight(idBoard, count)
Apply a Rotate Right Operation to all lists inside a board.

Operation:
```
  +------------------------------------+
  |    +---+---+---+---+---+---+---+   |
  +--> | 1 | 2 | 3 | . | . | . | n | --+
       +---+---+---+---+---+---+---+
```

Outcome:
```
       +---+---+---+---+---+---+---+
       | n | 1 | 2 | . | . | . |n-1|
       +---+---+---+---+---+---+---+
```

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- count <code>Number</code> - number of items to be rotated

<a name="TrelloLists+archiveAllCardsOnList"></a>

### trelloLists.archiveAllCardsOnList(listId)
Archive all cards on a list

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- listId <code>String</code>

<a name="TrelloLists+archiveList"></a>

### trelloLists.archiveList(listId, options)
Archive a list

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- listId <code>String</code>
- options <code>Object</code>
    - .archiveCards <code>Boolean</code> - If this is set to true, all cards on the list will be archived before the list is archived

<a name="TrelloLists+moveList"></a>

### trelloLists.moveList(toBoardId, fromListId, toListName, pos)
Move a list

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- toBoardId <code>String</code> - Board Identifier to move the list to
- fromListId <code>String</code> - ID of the list to be moved
- toListName <code>String</code> - New name of the list
- pos <code>String</code> | <code>Number</code> <code> = bottom</code> - The position to place the list, possible values are "top", "bottom", or a positive floating point number

<a name="TrelloLists+copyList"></a>

### trelloLists.copyList(toBoardId, fromListId, toListName, pos)
copy a list

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- toBoardId <code>String</code> - Board Identifier to copy the list to
- fromListId <code>String</code> - ID of the list to be copied
- toListName <code>String</code> - Name of the cloned list
- pos <code>String</code> | <code>Number</code> <code> = bottom</code> - The position to place the list, possible values are "top", "bottom", or a positive floating point number

<a name="TrelloLists+moveCards"></a>

### trelloLists.moveCards(toBoardId, listId, toListId)
Move all cards to list

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- toBoardId <code>String</code> - Board Identifier of the board containing the list to move the cards to
- listId <code>String</code> - ID of the list cards should be move to
- toListId <code>String</code> - ID of the list to move the cards to

<a name="TrelloLists+update"></a>

### trelloLists.update(list) ⇒ <code>Promise.&lt;\*&gt;</code>
This method allow us to update a list definition. If the list id is not present or not
valid properties exist to be updated, an error is thrown.

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- list <code>object</code> - List object to be updated
    - [.id] <code>string</code>
    - [.name] <code>string</code>

<a name="TrelloLists+renameList"></a>

### ~~trelloLists.renameList(listId, newName)~~
***Deprecated***

rename a list

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- listId <code>String</code> - ID of the list to be renamed
- newName <code>String</code> - Name for the list to be changed to

<a name="TrelloOrganizations"></a>

## TrelloOrganizations
**Kind**: global class  

* [TrelloOrganizations](#TrelloOrganizations)
    * [new TrelloOrganizations(trelloClient)](#new_TrelloOrganizations_new)
    * [.searchFor(searchTerm)](#TrelloOrganizations+searchFor) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.create(data, force)](#TrelloOrganizations+create) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.delete(data, deleteBoards)](#TrelloOrganizations+delete) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.getById(idOrganization)](#TrelloOrganizations+getById) ⇒ <code>Promise.&lt;{\*}&gt;</code>

<a name="new_TrelloOrganizations_new"></a>

### new TrelloOrganizations(trelloClient)
**Params**

- trelloClient [<code>TrelloClient</code>](#TrelloClient)

<a name="TrelloOrganizations+searchFor"></a>

### trelloOrganizations.searchFor(searchTerm) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
This method allow us to search for an organization given a 'searchTerm' String

**Kind**: instance method of [<code>TrelloOrganizations</code>](#TrelloOrganizations)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - Array containing organizations  
**Params**

- searchTerm <code>String</code>

<a name="TrelloOrganizations+create"></a>

### trelloOrganizations.create(data, force) ⇒ <code>Promise.&lt;\*&gt;</code>
This method allow us to create an organization if it doesn't exist or force the
creation of it if another organization with the same name already exists.
If the organization contains boards, then they are created.

**Kind**: instance method of [<code>TrelloOrganizations</code>](#TrelloOrganizations)  
**Params**

- data <code>Object</code>
- force <code>Boolean</code> <code> = false</code> - Force the organization creation even if it already exists another
with the same name.

<a name="TrelloOrganizations+delete"></a>

### trelloOrganizations.delete(data, deleteBoards) ⇒ <code>Promise.&lt;\*&gt;</code>
Deletes an organization and inner structure (boards) if the `deleteBoards` is set to true.
At least the organization id or name must be provided.

**Kind**: instance method of [<code>TrelloOrganizations</code>](#TrelloOrganizations)  
**Params**

- data <code>Object</code>
- deleteBoards <code>Boolean</code> <code> = false</code> - When true, deletes all inner boards.

<a name="TrelloOrganizations+getById"></a>

### trelloOrganizations.getById(idOrganization) ⇒ <code>Promise.&lt;{\*}&gt;</code>
Gets an organization for a given Id

**Kind**: instance method of [<code>TrelloOrganizations</code>](#TrelloOrganizations)  
**Returns**: <code>Promise.&lt;{\*}&gt;</code> - Object that describes an organization wrapped inside a promise  
**Params**

- idOrganization <code>String</code>

<a name="TrelloClient"></a>

## TrelloClient
**Kind**: global class  

* [TrelloClient](#TrelloClient)
    * [new TrelloClient(config)](#new_TrelloClient_new)
    * [.board](#TrelloClient+board) ⇒ [<code>TrelloBoards</code>](#TrelloBoards)
    * [.organization](#TrelloClient+organization) ⇒ [<code>TrelloOrganizations</code>](#TrelloOrganizations)
    * [.card](#TrelloClient+card) ⇒ [<code>TrelloCards</code>](#TrelloCards)
    * [.list](#TrelloClient+list) ⇒ [<code>TrelloLists</code>](#TrelloLists)

<a name="new_TrelloClient_new"></a>

### new TrelloClient(config)
**Params**

- config <code>Object</code>
    - .key <code>String</code>
    - .token <code>String</code>
    - .baseUrl <code>String</code>

<a name="TrelloClient+board"></a>

### trelloClient.board ⇒ [<code>TrelloBoards</code>](#TrelloBoards)
Returns a board object containing all board operations

**Kind**: instance property of [<code>TrelloClient</code>](#TrelloClient)  
**Lazy**:   
<a name="TrelloClient+organization"></a>

### trelloClient.organization ⇒ [<code>TrelloOrganizations</code>](#TrelloOrganizations)
Returns a organization object containing all organization operations

**Kind**: instance property of [<code>TrelloClient</code>](#TrelloClient)  
**Lazy**:   
<a name="TrelloClient+card"></a>

### trelloClient.card ⇒ [<code>TrelloCards</code>](#TrelloCards)
Returns a card object containing all card operations

**Kind**: instance property of [<code>TrelloClient</code>](#TrelloClient)  
**Lazy**:   
<a name="TrelloClient+list"></a>

### trelloClient.list ⇒ [<code>TrelloLists</code>](#TrelloLists)
Returns a list object containing all list operations

**Kind**: instance property of [<code>TrelloClient</code>](#TrelloClient)  
**Lazy**:   
<a name="validateConfig"></a>

## validateConfig(config) ⇒ <code>Array.&lt;String&gt;</code>
Validates the configuration object.

**Kind**: global function  
**Params**

- config <code>Object</code>
    - .key <code>String</code>
    - .token <code>String</code>

