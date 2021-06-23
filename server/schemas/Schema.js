const graphql = require('graphql')
const Event = require("../models/Event.js")

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = graphql


const EventType = new GraphQLObjectType({
    name: "Event",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        date: { type: GraphQLString }
    }
})

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({})
            }
        },
        event: {
            type: EventType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Event.findById({_id: args.id})
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createEvent: {
            type: EventType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                date: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const event = new Event({
                    name: args.name,
                    description: args.description,
                    price: args.price,
                    date: args.date
                })

                let res = await event.save()
                return res
            }

        }
    }
})


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})