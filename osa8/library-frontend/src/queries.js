import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const ALL_BOOKS = gql `
  query getAllBooks {
    allBooks {
      title
      published
      author {
        name
        born
      },
      id
    }
  }
`

export const INIT = gql `
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
  allBooks {
    title
    published
    author
    id
  }
}
`
export const ADD_BOOK = gql `
  mutation addNewBook($title: String!
      $published: Int!
      $author: String!
      $genres: [String]!){
     addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ){
      title
      published
      author {
        name
        born
      }
      genres
      id
    }}
`
export const UPDATE_BIRTHYEAR = gql `
  mutation setAuthorBirthyear(
    $author: String!,
    $year: Int!) {
  editAuthor(name: $author, setBornTo: $year) {
    name
    born
    id
  }
}
`
export const LOGIN = gql `
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
  }
}
`


const queries = {
  ALL_AUTHORS
}

export default queries