const graphql = require('graphql')
const Event = require("../models/Event.js")
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
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
        date: { type: GraphQLString },
        creator: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.creator)
            }
        }
    })
})

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return User.findById({ _id: args.id })
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({}).populate('creator')
            }
        },
        event: {
            type: EventType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Event.findById({ _id: args.id })
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                User.findOne({ email: args.email }).then(user => {
                    if (user) {
                        throw new Error('User exists already.')
                    }
                    return bcrypt.hash(args.password, 12);
                })
                    .then(async (passHash) => {
                        const user = new User({
                            email: args.email,
                            password: passHash
                        })
                        let res = await user.save()
                        return res
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

        createEvent: {
            type: EventType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                creator: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const event = new Event({
                    name: args.name,
                    description: args.description,
                    price: args.price,
                    date: args.date,
                    creator: '60d450d83fa5ba32da77f0eb'
                })

                return event.save()
                    .then(res => {
                        return User.findById('60d450d83fa5ba32da77f0eb')
                    })
                    .then(user => {
                        if (!user) {
                            throw new Error("Don't have a user.")
                        }
                        user.createdEvents.push(event)
                        return user.save()
                    })
                    .then(res => event)
            }
        }

    }
})


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})