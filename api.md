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
    * [.update()](#TrelloBoards+update)
    * [.getLists(idBoards)](#TrelloBoards+getLists)
    * [.getByName(idOrganization, boardName)](#TrelloBoards+getByName)

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
    - .idOrganization <code>String</code>
    - .lists <code>Array</code>

<a name="TrelloBoards+getById"></a>

### trelloBoards.getById(idBoard)
Get board by ID

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
**Params**

- idBoard <code>string</code>

<a name="TrelloBoards+update"></a>

### trelloBoards.update()
TODO - Update

**Kind**: instance method of [<code>TrelloBoards</code>](#TrelloBoards)  
<a name="TrelloBoards+getLists"></a>

### trelloBoards.getLists(idBoards)
Create a board if it does not exist.

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

<a name="TrelloCards"></a>

## TrelloCards
**Kind**: global class  
<a name="new_TrelloCards_new"></a>

### new TrelloCards(trelloClient)
**Params**

- trelloClient [<code>TrelloClient</code>](#TrelloClient)

<a name="TrelloLists"></a>

## TrelloLists
**Kind**: global class  

* [TrelloLists](#TrelloLists)
    * [new TrelloLists(trelloClient)](#new_TrelloLists_new)
    * [.create(data, force)](#TrelloLists+create) ⇒ <code>Promise.&lt;{name:String, idBoard:String, id:String}&gt;</code>
    * [.rotateLeft(idBoard, count)](#TrelloLists+rotateLeft)
    * [.rotateRight(idBoard, count)](#TrelloLists+rotateRight)
    * [.archiveAllCardsOnList(listId)](#TrelloLists+archiveAllCardsOnList)
    * [.archiveList(listId, options)](#TrelloLists+archiveList)
    * [.createAtIndex(data, index)](#TrelloLists+createAtIndex)
    * [.shiftLeft(idBoard, count)](#TrelloLists+shiftLeft)
    * [.shiftRight(idBoard, count)](#TrelloLists+shiftRight)
    * [.moveList(listId, toBoardId, toListName)](#TrelloLists+moveList)
    * [.copyList(fromListId, toBoardId, toListName)](#TrelloLists+copyList)

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
- force <code>Boolean</code> - force list creation

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

<a name="TrelloLists+createAtIndex"></a>

### trelloLists.createAtIndex(data, index)
TODO - Apply a Shift Right Operation to all lists inside a board

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- data <code>Object</code> - List Details
- index <code>Number</code> - list index

<a name="TrelloLists+shiftLeft"></a>

### trelloLists.shiftLeft(idBoard, count)
TODO - Apply a Shift Left Operation to all lists inside a board

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- count <code>Number</code> - number of items to be shifted

<a name="TrelloLists+shiftRight"></a>

### trelloLists.shiftRight(idBoard, count)
TODO - Apply a Shift Right Operation to all lists inside a board

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- count <code>Number</code> - number of items to be shifted

<a name="TrelloLists+moveList"></a>

### trelloLists.moveList(listId, toBoardId, toListName)
Move a list

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- listId <code>String</code> - ID of the list to be moved
- toBoardId <code>String</code> - Board Identifier to move the list to
- toListName <code>Number</code> - New name of the list

<a name="TrelloLists+copyList"></a>

### trelloLists.copyList(fromListId, toBoardId, toListName)
copy a list

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- fromListId <code>String</code> - ID of the list to be copied
- toBoardId <code>String</code> - Board Identifier to copy the list to
- toListName <code>Number</code> - Name of the cloned list

<a name="TrelloOrganizations"></a>

## TrelloOrganizations
**Kind**: global class  

* [TrelloOrganizations](#TrelloOrganizations)
    * [new TrelloOrganizations(trelloClient)](#new_TrelloOrganizations_new)
    * [.searchFor(searchTerm)](#TrelloOrganizations+searchFor)

<a name="new_TrelloOrganizations_new"></a>

### new TrelloOrganizations(trelloClient)
**Params**

- trelloClient [<code>TrelloClient</code>](#TrelloClient)

<a name="TrelloOrganizations+searchFor"></a>

### trelloOrganizations.searchFor(searchTerm)
**Kind**: instance method of [<code>TrelloOrganizations</code>](#TrelloOrganizations)  
**Params**

- searchTerm <code>String</code>

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

