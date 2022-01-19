const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } = require("graphql");


exports.DatasetSchema = new GraphQLObjectType({
    name: "Dataset",
    description: "Represents a dataset",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        national_statistic: {type: GraphQLBoolean },
        uri: { type: GraphQLString },
        unit_of_measure: { type: GraphQLString },
        theme: { type: GraphQLString },
        state: { type: GraphQLString },
        keywords: { type: new GraphQLList(GraphQLString) },
        contacts: { type: new GraphQLList(contact) },
        collection_id: { type: GraphQLString },
        license: { type: GraphQLString },
        links: { type: links },
        methodologies: { type: new GraphQLList(link) },
        next_release: { type: GraphQLString },
        nomis_ref_url: { type: GraphQLString },
        publications:  {type: new GraphQLList(link) },
        publisher: { type: publisher },
        qmi: { type: qmi },
        related_datasets: { type: new GraphQLList(link) },
        release_frequency: { type: GraphQLString },
    })
});

const contact = new GraphQLObjectType({
    name: "Contact",
    description: "Represents contact details for person/team responsible for the dataset",
    fields: () => ({
        email: { type: GraphQLString },
        name: {type: GraphQLString },
        telephone: { type: GraphQLString },
    })
});

const links = new GraphQLObjectType({
    name: "DatasetLinks",
    description: "A list of links related to this resource",
    fields: () => ({
        access_rights: { type: link },
        editions: { type: link },
        latest_version: { type: link },
        self: { type: link },
        taxonomy: { type: link }
    })  
});

const link = new GraphQLObjectType({
    name: "Link",
    description: "Link and information about a resourece",
    fields: () => ({
        href: { type: GraphQLString },
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
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