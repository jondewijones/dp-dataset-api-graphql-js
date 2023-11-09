import  {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
  } from "graphql";

import { getDataset, getAllDatasets } from "../request/dataset.js";
import { getEdition, getAllEditions } from "../request/edition.js";
import { getVersion, getAllVersions } from "../request/version.js";

import { DatasetSchema } from "./dataset.js";
import { EditionSchema } from "./edition.js";
import { VersionSchema } from "./version.js";

export const schema = new GraphQLSchema({
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
                resolve: (_, args) => getDataset(args.id)
            },
            datasets: {
                type: new GraphQLList(DatasetSchema),
                description: "List of all datasets",
                args: {
                    offset: { type: GraphQLInt },
                    limit: { type: GraphQLInt }
                },
                resolve: (_, args) => getAllDatasets(args.offset, args.limit)
            },
            edition: {
                type: EditionSchema,
                description: "An edition",
                args: {
                    datasetID: { type: GraphQLString },
                    editionID: { type: GraphQLString }
                },
                resolve: (_, args) => getEdition(args.datasetID, args.editionID)
            },
            editions: {
                type: new GraphQLList(EditionSchema),
                description: "List of all editions for a dataset",
                args: {
                    datasetID: { type: GraphQLString },
                    offset: { type: GraphQLInt },
                    limit: { type: GraphQLInt }
                },
                resolve: (_, args) => getAllEditions(args.datasetID, args.offset, args.limit)
            },
            version: {
                type: VersionSchema,
                description: "A version",
                args: {
                    datasetID: { type: GraphQLString },
                    editionID: { type: GraphQLString },
                    versionID: { type: GraphQLString }
                },
                resolve: (_, args) => getVersion(args.datasetID, args.editionID, args.versionID)
            },
            versions: {
                type: new GraphQLList(VersionSchema),
                description: "List of all versions for an edition of a dataset",
                args: {
                    datasetID: { type: GraphQLString },
                    editionID: { type: GraphQLString },
                    offset: { type: GraphQLInt },
                    limit: { type: GraphQLInt }
                },
                resolve: (_, args) => getAllVersions(args.datasetID, args.editionID, args.offset, args.limit)
            },
        })
    })
})