const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {graphqlHTTP} = require('express-graphql')
const schema = require("./graphql/Schema.js")
const mongoose = require('mongoose')

const config = dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const monogoURL = config.parsed.MONGO_URL
mongoose.connect(monogoURL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
})

mongoose.connection.once( 'open' ,() => console.log("DB connected..."))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.get("/", (req, res) => res.send("Server is runing..."))

app.listen(8000, () => console.log("Server is runing at 8000..."))