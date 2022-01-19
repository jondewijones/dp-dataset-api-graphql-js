const  {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
  } = require("graphql");

const { dataset } = require("../request/dataset")

const { DatasetSchema } = require("./dataset.js");

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
        })
    })
})