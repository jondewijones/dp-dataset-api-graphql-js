import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } from "graphql";


export const sharedLink = new GraphQLObjectType({
    name: "Link",
    description: "Link and information about a resourece",
    fields: () => ({
        href: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});