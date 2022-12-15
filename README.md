# Welcome to Library API

Library API is a simple CRUD application that allows users to manage a library catalog. The library catalog is stored in a `books.json` file, and the API provides several methods for accessing and modifying the catalog. You can use it as a boiler plate for similar operations.

## API Usage
books.json
The books.json file contains an array of book objects, with each book having the following properties:

- `bookID`: a unique ID for the book
- `name`: the name of the book
- `author`: the author of the book
- `type`: the type of book (e.g. hardcover, softcover)
- `topic`: the topic of the book

An example `books.json` file is shown below:

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

#### Public API (methods of Datastorage class)

The Library API provides several public methods for accessing and modifying the catalog. These methods are part of the `Datastorage` class and are described below:

- `getAll()`: returns an array of all books in the catalog. If the catalog is empty, an empty array is returned.
- `getOne(id)`: returns the book with the specified id from the catalog. If no book with the specified `id` is found, the method returns a `NOT_FOUND` error.
- `insert(newBook)`: inserts a new book into the catalog. The `newBook` parameter should be a book object with the same format as the objects in the `books.json` file. If the insert is successful, the method returns an `INSERT_OK` message. If the insert fails (e.g. because the `bookID` is already in use), the method returns a `NOT_INSERTED` or `ALREADY_IN_USE` error.
- `update(updatedBook)`: updates an existing book in the catalog. The `updatedBook` parameter should be a book object with the same format as the objects in the `books.json` file, including a valid `bookID` property. If the update is successful, the method returns an `UPDATE_OK` message. If the update fails (e.g. because the specified `bookID` does not exist in the catalog), the method returns a `NOT_UPDATED` error.
- `remove(id)`: removes the book with the specified `id` from the catalog. If the removal is successful, the method returns a `REMOVE_OK` message. If the removal fails (e.g. because the specified `bookID` does not exist in the catalog), the method returns a `NOT_FOUND` or `NOT_REMOVED` error.
- `getters for status codes`: returns an array of all possible status codes and their corresponding messages.

### Private API

The Library API also provides several private methods for reading and writing the `books.json` file. These methods are part of the `readerWriter`, `storageLayer`, and `statusCodes` modules and are described below:

#### `readerWriter.js`

- `readStorage(storageFile)`: reads the `books.json` file and returns an array of book objects. If the file is empty or does not exist, an empty array is returned.
- `writeStorage(storageFile, data)`: writes the specified data (which should be an array of book objects) to the `books.json` file. If the write is successful, the method returns `true`, otherwise it returns `false`.

#### `storageLayer.js``

- `getAllFromStorage()`: reads the `books.json` file and returns an array of all book objects in the catalog. If the catalog is empty, an empty array is returned.
- `getFromStorage(id)`: reads the `books.json` file and returns the book with the specified id from the catalog. If no book with the specified id is found, the method returns null.
- `addToStorage(newBook)`: inserts the specified newBook into the `books.json` file. If the insert is successful, the method returns true, otherwise it returns false.
- `updateStorage(updatedBook)`: updates the book with the specified bookID in the `books.json` file with the updatedBook object. If the update is successful, the method returns true, otherwise it returns false.
- `removeFromStorage(id)`: removes the book with the specified id from the `books.json` file. If the removal is successful, the method returns true, otherwise it returns false.

#### statusCodes.js

The statusCodes module contains a list of all possible status codes and their corresponding messages. The format of a `status/error` message is shown below:

```js
const CODES={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ...
}
```

The format of the `status/error` message is:

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

The `type` field of a message can be either `error` or `info`.

### Example
To use the Library API, you can import the `Datastorage` class and create an instance of the class. Then you can use the public methods of the class to access and modify the catalog.

```js
import { Datastorage } from "library-api";

const storage = new Datastorage();

// Get all books in the catalog
const allBooks = storage.getAll();

// Get the book with id 6
const book = storage.getOne(6);

// Insert a new book into the catalog
const newBook = {
  bookID: 3,
  name: "The Cat in the Hat",
  author: "Dr. Seuss",
  type: "hardcover",
  topic: "children's literature",
};
const insertResult = storage.insert(newBook);

// Update an existing book in the catalog
const updatedBook = {
  bookID: 6,
  name: "The Adventures of Mike the Millipede: The Sequel",
  author: "Felix Harris",
  type: "hardcover",
  topic: "inventions",
};
const updateResult = storage.update(updatedBook);

// Remove a book from the catalog
const removeResult = storage.remove(1);

// Get the list of status codes and their corresponding messages
const statusCodes = storage.statusCodes;
```

The `Datastorage` class provides a simple and convenient way to access and modify the library catalog. You can use it as a starting point for your own library management application.
