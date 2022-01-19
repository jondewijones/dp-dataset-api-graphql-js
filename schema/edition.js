const { GraphQLObjectType, GraphQLString } = require("graphql");

const sharedSchema = require("./shared")

exports.EditionSchema = new GraphQLObjectType({
    name: "Edition",
    description: "Represents an edition",
    fields: () => ({
        id: { type: GraphQLString },
        edition: { type: GraphQLString },
        description: { type: GraphQLString },
        links: { type: links },
        state: { type: GraphQLString },
    })
})

const links = new GraphQLObjectType({
    name: "EditionLinks",
    description: "A list of links related to this resource",
    fields: () => ({
        dataset: { type: sharedSchema.link },
        latest_version: { type: sharedSchema.link },
        self: { type: sharedSchema.link },
        taxonomy: { type: sharedSchema.link }
    })  
});