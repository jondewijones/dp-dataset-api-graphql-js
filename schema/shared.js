const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } = require("graphql");


const link = new GraphQLObjectType({
    name: "Link",
    description: "Link and information about a resourece",
    fields: () => ({
        href: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

module.exports = {
    link: link
}
