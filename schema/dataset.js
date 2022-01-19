const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } = require("graphql");
const { edition } = require("../request/edition");
const { EditionSchema } = require("./edition");

const sharedSchema = require("./shared")

exports.DatasetSchema = new GraphQLObjectType({
    name: "Dataset",
    description: "Represents a dataset",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        national_statistic: { type: GraphQLBoolean },
        uri: { type: GraphQLString },
        unit_of_measure: { type: GraphQLString },
        theme: { type: GraphQLString },
        state: { type: GraphQLString },
        keywords: { type: new GraphQLList(GraphQLString) },
        contacts: { type: new GraphQLList(contact) },
        collection_id: { type: GraphQLString },
        license: { type: GraphQLString },
        links: { type: links },
        methodologies: { type: new GraphQLList(sharedSchema.link) },
        next_release: { type: GraphQLString },
        nomis_ref_url: { type: GraphQLString },
        publications: { type: new GraphQLList(sharedSchema.link) },
        publisher: { type: publisher },
        qmi: { type: qmi },
        related_datasets: { type: new GraphQLList(sharedSchema.link) },
        release_frequency: { type: GraphQLString },
        edition: {
            type: EditionSchema,
            args: {
                editionID: { type: GraphQLString },
            },
            resolve: (dataset, args) => {
                return edition.get(dataset.id, args.editionID)
            }
        },
        editions: {
            type: new GraphQLList(EditionSchema),
            args: {
                editionID: { type: GraphQLString },
            },
            resolve: (dataset) => {
                return edition.getAll(dataset.id)
            }
        }
    })
});

const contact = new GraphQLObjectType({
    name: "Contact",
    description: "Represents contact details for person/team responsible for the dataset",
    fields: () => ({
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        telephone: { type: GraphQLString },
    })
});

const links = new GraphQLObjectType({
    name: "DatasetLinks",
    description: "A list of links related to this resource",
    fields: () => ({
        access_rights: { type: sharedSchema.link },
        editions: { type: sharedSchema.link },
        latest_version: { type: sharedSchema.link },
        self: { type: sharedSchema.link },
        taxonomy: { type: sharedSchema.link }
    })
});

const qmi = new GraphQLObjectType({
    name: "QMI",
    description: "Object containing information on the quality and methodology index of a dataset",
    fields: () => ({
        href: { type: GraphQLString },
        descrition: { type: GraphQLString },
        title: { type: GraphQLString }
    })
});

const publisher = new GraphQLObjectType({
    name: "Publisher",
    description: "The publisher of the dataset",
    fields: () => ({
        href: { type: GraphQLString },
        descrition: { type: GraphQLString },
        title: { type: GraphQLString }
    })
});