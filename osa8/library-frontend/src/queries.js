import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`
export const ALL_BOOKS = gql `
  query {
    allBooks {
      title,
      published,
      author,
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
      author
      genres
    }}
`
export const UPDATE_BIRTHYEAR = gql `
  mutation setAuthorBirthyear(
    $author: String!,
    $year: Int!) {
  editAuthor(name: $author, setBornTo: $year) {
    name
    born
  }
}
`

const queries = {
  ALL_AUTHORS
}

export default queries