import { gql } from "@apollo/client"

export const CREATE_EVENT = gql`
mutation($name: String!, $description: String!, $price: Int!, $date: String!){
    createEvent(name: $name, description: $description, price: $price, date: $date){
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