# Books data storage

## books.json

```json
[
  {
    "bookID": 6,
    "name": "The adventures of Mike the Millipede",
    "author": "Felix Harris",
    "type": "hardcover",
    "topic": "inventions"
  },
  {
    "bookID": 1,
    "name": "SQL-mysteries",
    "author": "Antony Lee",
    "type": "softcover",
    "topic": "History"
  }
]
```

id is unique!

### Public API (methods of Datastorage class)

#### dataStorageLayer.js

- getAll()
  - returns an array of all books / []
- getOne(id)
  - returns a book object / NOT_FOUND
- insert(newBook)
  - returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE
- update(updatedBook)
  - returns UPDATE_OK / NOT_UPDATED
- remove(id)
  - REMOVE_OK / NOT_FOUND / NOT_REMOVED
- getters for status codes
  - returns an array of status codes

### Private API

#### readerWriter.js

- readStorage(storageFile)

  - returns an array of books / []

- writeStorage(storageFile, data)
  - returns true/false

#### storageLayer.js

- getAllFromStorage()

  - returns an array of books / []

- getFromStorage(id)

  - returns an book object / null

- addToStorage(newBook)

  - returns true / false

- updateStorage(updatedBook)

  - returns true / false

- removeFromStorage(id)
  - returns true / false

#### statusCodes.js

```js
const CODES={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ...
}
```

The format of an status/error message is:

```js
const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in our program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (id) => ({
    message: `No book found with id ${id}`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (id) => ({
    message: `book ${id} was inserted`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
};
```

status types are `error` or `info`
