const graphql = require('graphql')
const Event = require("../models/Event.js")
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const Mutation = require("./Mutations.js")
const Query = require("./Queries.js")

const {GraphQLSchema} = graphql


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})