import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } from "graphql";
import { getEdition, getAllEditions} from "../request/edition.js";
import { EditionSchema } from "./edition.js";

import { sharedLink } from "./shared.js";

export const DatasetSchema = new GraphQLObjectType({
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
        methodologies: { type: new GraphQLList(sharedLink) },
        next_release: { type: GraphQLString },
        nomis_ref_url: { type: GraphQLString },
        publications: { type: new GraphQLList(sharedLink) },
        publisher: { type: publisher },
        qmi: { type: qmi },
        related_datasets: { type: new GraphQLList(sharedLink) },
        release_frequency: { type: GraphQLString },
        edition: {
            type: EditionSchema,
            args: {
                editionID: { type: GraphQLString },
            },
            resolve: (dataset, args) => {
                return getEdition(dataset.id, args.editionID)
            }
        },
        editions: {
            type: new GraphQLList(EditionSchema),
            args: {
                editionID: { type: GraphQLString },
            },
            resolve: (dataset) => {
                return getAllEditions(dataset.id)
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
        access_rights: { type: sharedLink },
        editions: { type: sharedLink },
        latest_version: { type: sharedLink },
        self: { type: sharedLink },
        taxonomy: { type: sharedLink }
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