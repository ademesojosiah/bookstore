# blog-api
This is an api for a Bookstore

---

## Requirements
1. User should be able to sign up with auth0
2. logged in User should be able to create an Author Account,
3. Author should have a first_name, last_name, dob, country, books when creating an account
4. Author should able to perforn CRUD operation , create, read, Update and delete account 
5. Logged in user should be able to perforn CRUD operation on the bookstore, create, add, update, delete book

---
---

## Security
- joi input validation
- helmet security
- express rate limiter
- Good logging

---

## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm start`

---
## Base URL
- blog-api-5ecs.onrender.com


## Models
---

### author
| field  |  data_type | constraints  |
|---|---|---|
|  first_name | string  |  required|
|  last_name  |  string |  required |
|  dob |   Date |  required  |
|  country     | string  | optional| 
|  books     | array  |  | 




### Books
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required , unique|
|  shortDescription |  string |required  |
|  longDescription |  string |required  |
|  year | number |required  |
|  isbn |   string | required  |
|  price |  number |  required |


## APIs
---

### Signup User

- Route: /signup
- Method: GET
- Body: 
```
```

- Responses

Success
```

```
---
### Logout User

- Route: auth/logout
- Method: GET
- Body: 
- Responses

Success
```
```

### Protected  AUTHORS Routes

---
### Return all autors


- Route: /api/v1/authors
- Method: GET
- Responses

Success
```
{
 "nHbits": 4,
 blog:[]
}
```
---
### create an author

- Route: /api/v1/authors
- Method: POST
- Responses
- Body: 
```
{
    "firstname": "Issac",
    "lastname": "Adebayo",
    "dob": "12-21-1998",
    "country": "dutch"

}
```

- Responses

Success
```
{
    "firstname": "Issac",
    "lastname": "Adebayo",
    "dob": "1998-12-20T23:00:00.000Z",
    "country": "dutch",
    "books": [],
    "_id": "63b9b757892f349cde4251c7",
    "createdAt": "2023-01-07T18:17:59.760Z",
    "lastUpdatedAt": "2023-01-07T18:17:59.760Z",
    "__v": 0
}
```

### Update an Author 

- Route: /api/v1/authors/:id
- Method: PUT
- Responses
- Body: 
```
{
    "country": "nigeria"

}
```

- Responses

Success
```
{
    "firstname": "Issac",
    "lastname": "Adebayo",
    "dob": "1998-12-20T23:00:00.000Z",
    "country": "nigeria",
    "books": [],
    "_id": "63b9b757892f349cde4251c7",
    "createdAt": "2023-01-07T18:17:59.760Z",
    "lastUpdatedAt": "2023-01-07T18:17:59.760Z",
    "__v": 0
}
```

---

### Delete an Author 

- Route: /api/api/author/:id
- Method: delete
- Responses

Success
```
{
  "status": true,
  "blog": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```

```
### Book Route

```

### Create  a Blookstore (logged in users only )

- Route: /api/v1/books
- Method: POST
- Body: 
```
{
    "title": "i want to delete ni ooo",
    "shortDescription": "With work that ranges from the laugh out loud funny to the silence and rage of loss, Forgive Yourself These Tiny Acts of Self-Destruction is a must read. ",
    "longDescription" : "This is a collection of work that asks itself for forgiveness while becoming an instruction manual on how readers can follow suit. These complex and passionate poems make space for a narrative about the self in the wake of destruction.",
    "year":2019,
    "isbn": "978-43735-",
    "price": 40.55
}
```

- Responses

Success
```
{
    "title": "i want to deleteni ooo",
    "shortDescription": "With work that ranges from the laugh out loud funny to the silence and rage of loss, Forgive Yourself These Tiny Acts of Self-Destruction is a must read. ",
    "longDescription": "This is a collection of work that asks itself for forgiveness while becoming an instruction manual on how readers can follow suit. These complex and passionate poems make space for a narrative about the self in the wake of destruction.",
    "year": 2019,
    "isbn": "978-43735-",
    "price": 40.55,
    "_id": "63c043f4e63a8a28145234df",
    "createdAt": "2023-01-12T17:31:32.311Z",
    "lastUpdatedAt": "2023-01-12T17:31:32.311Z",
    "__v": 0
}
```
---
### Get all Books (logged in users only )


- Route: /api/v1/books
- Method: GET
- Header:
    - Authorization: Bearer {token}

- Responses

Success
```
{
    "nHbits": 4,
    "books": []
}
```
---

---
### Get book by unique Id  (logged in users only )

- Route: /api/v1/books/:id{63b72cdd075c9cdab99a0177}
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    "_id": "63b72cdd075c9cdab99a0177",
    "title": "what to expect when you're Expecting",
    "shortDescription": "America's pregnancy bible answers all your baby questions",
    "longDescription": "your pregnancy explained and your pregnant demystified, head(what to do about those headaches) to feet(why they're so swollen)",
    "year": 2016,
    "isbn": "1252reyewi56",
    "price": 2.6,
    "createdAt": "2023-01-05T20:02:37.504Z",
    "lastUpdatedAt": "2023-01-05T20:02:37.504Z",
    "__v": 0
}
```
---

### update a Book  (logged in users only )

- Route: /api/v1/books/:id
- Method: put
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "price": 2.60
}
```

- Responses

Success
```
{
    "_id": "63b72cdd075c9cdab99a0177",
    "title": "what to expect when you're Expecting",
    "shortDescription": "America's pregnancy bible answers all your baby questions",
    "longDescription": "your pregnancy explained and your pregnant demystified, head(what to do about those headaches) to feet(why they're so swollen)",
    "year": 2016,
    "isbn": "1252reyewi56",
    "price": 2.6,
    "createdAt": "2023-01-05T20:02:37.504Z",
    "lastUpdatedAt": "2023-01-05T20:02:37.504Z",
    "__v": 0
}

```
---

### delete a book (logged in users only )

- Route: /api/v1/books/:id
- Method: delete
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    "acknowledged": true,
    "deletedCount": 1
}


```
---

...

## Contributor
- Ademeso Josiah