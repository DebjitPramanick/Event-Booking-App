const graphql = require('graphql')
const Event = require("../models/Event.js")
const User = require('../models/User.js')

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
} = graphql


const AuthType = new GraphQLObjectType({
    name: "Auth",
    fields: () => ({
        userId: { type: GraphQLID },
        token: { type: GraphQLString },
        tokenExp: { type: GraphQLInt }
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        createdEvents: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({ creator: parent.id })
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
        date: { type: GraphQLString },
        creator: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.creator)
            }
        }
    })
})

const BookingType = new GraphQLObjectType({
    name: "Booking",
    fields: () => ({
        id: { type: GraphQLID },
        event: { 
            type: EventType,
            async resolve(parent, args){
                let res = await Event.findById(parent.event)
                return res
            }
        },
        user: { 
            type: UserType,
            async resolve(parent, args){
                let res = await User.findById(parent.user)
                return res
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
})

module.exports = {
    UserType,
    EventType,
    BookingType,
    AuthType
}