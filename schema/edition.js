import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

import { getVersion, getAllVersions } from "../request/version.js";

import { sharedLink } from "./shared.js";
import { VersionSchema } from "./version.js";

export const EditionSchema = new GraphQLObjectType({
    name: "Edition",
    description: "Represents an edition",
    fields: () => ({
        id: { type: GraphQLString },
        edition: { type: GraphQLString },
        description: { type: GraphQLString },
        links: { type: links },
        state: { type: GraphQLString },
        version: {
            type: VersionSchema,
            args: {
                versionID: { type: GraphQLString },
            },
            resolve: (edition, args) => {
                return getVersion(edition.links.dataset.id, edition.edition, args.versionID)
            }
        },
        versions: {
            type: new GraphQLList(VersionSchema),
            args: {
                editionID: { type: GraphQLString },
            },
            resolve: (edition) => {
                return getAllVersions(edition.links.dataset.id, edition.edition)
            }
        }
    })
})

const links = new GraphQLObjectType({
    name: "EditionLinks",
    description: "A list of links related to this resource",
    fields: () => ({
        dataset: { type: sharedLink },
        latest_version: { type: sharedLink },
        self: { type: sharedLink },
        taxonomy: { type: sharedLink }
    })  
});