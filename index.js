const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { schema } = require("./schema/root")

const BIND_ADDR = process.env.BIND_ADDR || 8080

const app = express();
app.use("/", graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(BIND_ADDR, () => console.log(`server started on http://localhost:${BIND_ADDR}`));