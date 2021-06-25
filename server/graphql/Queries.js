const graphql = require('graphql')
const Event = require("../models/Event.js")
const User = require('../models/User.js')
const Types = require("./Types.js")

const {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
} = graphql


const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        users: {
            type: new GraphQLList(Types.UserType),
            async resolve(parent, args) {
                let res = await User.find({})
                .then(res => res)
                .catch(err => err)
                return res
            }
        },
        user: {
            type: Types.UserType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                let res = await User.findById({ _id: args.id })
                .then(res => res)
                .catch(err => "Error occured.")
                return res
            }
        },
        events: {
            type: new GraphQLList(Types.EventType),
            async resolve(parent, args) {
                let res = await Event.find({}).populate('creator')
                .then(res => res)
                .catch(err => err)
                return res
            }
        },
        event: {
            type: Types.EventType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                let res = await Event.findById({ _id: args.id })
                .then(res => res)
                .catch(err => "Error occured.")
                return res

            }
        }
    }
})

module.exports = Query