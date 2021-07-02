import { gql } from "@apollo/client"

export const CREATE_EVENT = gql`
mutation($name: String!, $description: String!, $price: Int!, $date: String!, $creator: ID){
    createEvent(name: $name, description: $description, price: $price, date: $date, creator: $creator){
        name
        description
        date
        price
      }
  }
`

export const GET_EVENTS = gql`
  {
    events{
        id
        name
        description
        date
        price
        creator{
            email
            id
         }
      }
  }
`

export const CREATE_USER = gql`
mutation($email: String!, $password: String){
  createUser(email: $email, password: $password){
    id
    email
    password
  }
}
`

export const GET_USER = gql`
query User($id: ID!){
  user(id: $id){
      email
      id
      createdEvents {
      id
      name
      description
      date
      price
    }
  }
}
`

export const LOGIN_USER = gql`
query Login($email: String!, $password: String!){
  login(email: $email, password: $password){
    userId
    token
    tokenExp
  }
}
`