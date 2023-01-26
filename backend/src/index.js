import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import cors from "cors";
import * as dotenv from 'dotenv';
import { schema } from './schema/index.js';
 
const app = express()  
dotenv.config();  
app.use(cors());
app.use(express.json({ limit: '50mb' }));
mongoose.set('strictQuery', false);   
const FgYellow  = "\x1b[33m";

(async() => {
  await mongoose
    .connect(process.env.MONGO_GRAPHQL)
    .then(() => console.log("Connected to GraphQL DB"))
    .catch((error) => console.log(error, `DB GraphQL, ${error}`))
})();

app.use('/react-graphql', graphqlHTTP({ schema, graphiql: true }))

app.listen(process.env.PORT_GRAPHQL_LOCAL, err => {
  err ? console.log(err) : console.log(`${FgYellow} Server starded in port ${process.env.PORT_GRAPHQL_LOCAL} `)
})
