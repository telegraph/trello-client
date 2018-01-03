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
    * [.createAtIndex(data, index)](#TrelloLists+createAtIndex)
    * [.shiftLeft(idBoard, count)](#TrelloLists+shiftLeft)
    * [.shiftRight(idBoard, count)](#TrelloLists+shiftRight)

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
  +------------------------------------+
  |   +---+---+---+---+---+---+---+    |
  +-- | 1 | 2 | 3 | . | . | . | n | <--+
      +---+---+---+---+---+---+---+

Outcome:

       +---+---+---+---+---+---+---+
       | 2 | 3 | . | . | . | n | 1 |
       +---+---+---+---+---+---+---+

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- count <code>Number</code> - number of items to be rotated

<a name="TrelloLists+rotateRight"></a>

### trelloLists.rotateRight(idBoard, count)
Apply a Rotate Right Operation to all lists inside a board.

Operation:
  +------------------------------------+
  |    +---+---+---+---+---+---+---+   |
  +--> | 1 | 2 | 3 | . | . | . | n | --+
       +---+---+---+---+---+---+---+

Outcome:

       +---+---+---+---+---+---+---+
       | n | 1 | 2 | . | . | . |n-1|
       +---+---+---+---+---+---+---+

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- count <code>Number</code> - number of items to be rotated

<a name="TrelloLists+createAtIndex"></a>

### trelloLists.createAtIndex(data, index)
Apply a Shift Right Operation to all lists inside a board

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- data <code>Object</code> - List Details
- index <code>Number</code> - list index

<a name="TrelloLists+shiftLeft"></a>

### trelloLists.shiftLeft(idBoard, count)
Apply a Shift Left Operation to all lists inside a board

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- count <code>Number</code> - number of items to be shifted

<a name="TrelloLists+shiftRight"></a>

### trelloLists.shiftRight(idBoard, count)
Apply a Shift Right Operation to all lists inside a board

**Kind**: instance method of [<code>TrelloLists</code>](#TrelloLists)  
**Params**

- idBoard <code>String</code> - Board Identifier
- count <code>Number</code> - number of items to be shifted

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

