const  {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
  } = require("graphql");

const { dataset } = require("../request/dataset")
const { edition } = require("../request/edition")

const { DatasetSchema } = require("./dataset");
const { EditionSchema } = require("./edition");

exports.schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQuery",
        description: "Root Query",
        fields: () => ({
            dataset: {
                type: DatasetSchema,
                description: "A dataset",
                args: {
                    id: { type: GraphQLString }
                },
                resolve: (_, args) => dataset.get(args.id)
            },
            datasets: {
                type: new GraphQLList(DatasetSchema),
                description: "List of all datasets",
                args: {
                    offset: { type: GraphQLInt },
                    limit: { type: GraphQLInt }
                },
                resolve: (_, args) => dataset.getAll(args.offset, args.limit)
            },
            edition: {
                type: EditionSchema,
                description: "An edition",
                args: {
                    datasetID: { type: GraphQLString },
                    editionID: { type: GraphQLString }
                },
                resolve: (_, args) => edition.get(args.datasetID, args.editionID)
            },
            editions: {
                type: new GraphQLList(EditionSchema),
                description: "List of all editions for a dataset",
                args: {
                    datasetID: { type: GraphQLString },
                    offset: { type: GraphQLInt },
                    limit: { type: GraphQLInt }
                },
                resolve: (_, args) => edition.getAll(args.datasetID, args.offset, args.limit)
            },
        })
    })
})