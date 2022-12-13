import {GraphQLSchema} from "graphql"
import { rootQuery } from "./queries";
import { rootMutation } from "./mutations";

export default new GraphQLSchema({
    query:rootQuery,
    mutation:rootMutation
})