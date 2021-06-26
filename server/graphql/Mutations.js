const graphql = require('graphql')
const Event = require("../models/Event.js")
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const Types = require("./Types.js")
const Booking = require('../models/Booking.js')

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
} = graphql


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: Types.UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let res = await User.findOne({ email: args.email })
                .then(user => {
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
                return res
            }
        },

        createEvent: {
            type: Types.EventType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                creator: { type: GraphQLID }
            },
            async resolve(parent, args, req) {

                if(!req.isAuth){
                    throw new Error("Unauthenticated user!")
                }

                const event = new Event({
                    name: args.name,
                    description: args.description,
                    price: args.price,
                    date: args.date,
                    creator: args.creator
                })

                return event.save()
                    .then(res => {
                        return User.findById(args.creator)
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
        },

        createBooking: {
            type: Types.BookingType,
            args: {
                event: { type: new GraphQLNonNull(GraphQLID) },
                user: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args, req) {

                if(!req.isAuth){
                    throw new Error("Unauthenticated user!")
                }
                const booking = new Booking({
                    event: args.event,
                    user: args.user
                })

                return booking.save()
                .then(res => booking)
                .catch(err => "Error occurred.")
            }
        },

        cancelBooking: {
            type: Types.EventType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, req) {
                if(!req.isAuth){
                    throw new Error("Unauthenticated user!")
                }
                try{
                    let booking = await Booking.findById(args.id)
                    let event = await Event.findById(booking.event)
                    await Booking.deleteOne({_id: args.id})
                    return event
                }
                catch(err) {
                    console.log(err)
                }
            }
        }

    }
})


module.exports= Mutation