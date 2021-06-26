const graphql = require('graphql')
const Event = require("../models/Event.js")
const User = require('../models/User.js')
const Booking = require("../models/Booking.js")
const Types = require("./Types.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = graphql


const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        login: {
            type: Types.AuthType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },

            async resolve(parent, args) {
                let user = await User.findOne({email: args.email})
                if(!user){
                    throw new Error('User does not exist.')
                }
                const isEqual = await bcrypt.compare(args.password, user.password)
                console.log(isEqual)
                if(!isEqual){
                    throw new Error('Password does not match.')
                }

                const token = await jwt.sign({userId: user._id, email: user.email}, 'somesupersecretkey', {
                    expiresIn: '1h'
                })
                return {userId: user._id, token: token, tokenExp: 1}
            }
        },
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
        },
        bookings: {
            type: new GraphQLList(Types.BookingType),
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                let res = await Booking.find({})
                .then(res => res)
                .catch(err => "Error occured.")
                return res
            }
        },
        booking: {
            type: Types.BookingType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                let res = await Booking.findById({ _id: args.id })
                .then(res => res)
                .catch(err => "Error occured.")
                return res
            }
        }
    }
})

module.exports = Query