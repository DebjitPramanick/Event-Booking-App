const graphql = require('graphql')
const Event = require("../models/Event.js")
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
} = graphql


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        createdEvents: { 
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return Event.find({creator: parent.id})
            }
        }
    })
})

const EventType = new GraphQLObjectType({
    name: "Event",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        date: { type: GraphQLInt },
        creator: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.creator)
            }
        }
    })
})

module.exports = {
    UserType, 
    EventType
}