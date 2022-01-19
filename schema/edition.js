const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const { version } = require("../request/version")

const sharedSchema = require("./shared");
const { VersionSchema } = require("./version");

exports.EditionSchema = new GraphQLObjectType({
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
                return version.get(edition.links.dataset.id, edition.edition, args.versionID)
            }
        },
        versions: {
            type: new GraphQLList(VersionSchema),
            args: {
                editionID: { type: GraphQLString },
            },
            resolve: (edition) => {
                return version.getAll(edition.edition)
            }
        }
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