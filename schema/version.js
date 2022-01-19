const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");

const sharedSchema = require("./shared")

exports.VersionSchema = new GraphQLObjectType({
    name: "Version",
    description: "Represents a version",
    fields: () => ({
        id: { type: GraphQLString },
        collection_id: { type: GraphQLString },
        dimensions: { type: new GraphQLList(codelist) },
        downloads: { type: downloads },
        edition: { type: GraphQLString },
        headers: { type: new GraphQLList(GraphQLString) },
        last_updated: { type: GraphQLString },
        links: { type: links },
        state: { type: GraphQLString },
        release_date: { type: GraphQLString },
        total_observations: { type: GraphQLInt },
        version: { type: GraphQLInt },
    })
});

const links = new GraphQLObjectType({
    name: "VersionLinks",
    description: "A list of links related to this resource",
    fields: () => ({
        dataset: { type: sharedSchema.link },
        dimensions: { type: sharedSchema.link },
        edition: { type: sharedSchema.link },
        job: { type: sharedSchema.link },
        self: { type: sharedSchema.link },
        spatial: { type: sharedSchema.link },
        version: { type: sharedSchema.link },
    })  
});

const codelist = new GraphQLObjectType({
    name: "Codelist",
    description: "Codelist info for each dimension",
    fields: () => ({
        description: { type: GraphQLString },
        id: { type: GraphQLString },
        href: { type: GraphQLString },
        label: { type: GraphQLString },
        name: { type: GraphQLString }
    })  
});

const downloads = new GraphQLObjectType({
    name: "Downloads",
    description: "A list of downloads",
    fields: () => ({
        csv: { type: download },
        xls: { type: download }
    }) 
});

const download = new GraphQLObjectType({
    name: "Download",
    description: "Download information",
    fields: () => ({
        href: { type: GraphQLString },
        size: { type: GraphQLString }
    }) 
});