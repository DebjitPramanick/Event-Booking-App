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


export const GET_BOOKED_EVENTS = gql`
query Booking($userId: ID!){
   bookings(userId: $userId){
     id
     createdAt
     user{
       email
       id
     }
     event{
       id
       name
       description
       price
       date
       creator{
         email
         id
       }
     }
   }
}
`

export const BOOK_EVENT = gql`
mutation($event: ID!, $user: ID!){
   createBooking(event: $event, user: $user){
     event {
       id
       name
     }
     user {
       id
       email
     }
     createdAt
     updatedAt
     id
   }
 }
`

export const CANCEL_BOOK_EVENT = gql`
mutation($id: String!){
   cancelBooking(id: $id){
       name
       description
   }
 }
`