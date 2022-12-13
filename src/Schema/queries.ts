import { GraphQLID, GraphQLObjectType, GraphQLList } from "graphql";
import {
  userType,
  roomType,
  complainType,
  mealType,
  hostelDetailType,
} from "./graphqltypes";
import User from "../models/user";
import Room from "../models/Room";
import Complain from "../models/Complain";
import Meal from "../models/Meal";
import HostelDetails from "../models/HostelDetails";

export const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(userType),

      async resolve(parent, args) {
        try {
          const allusers = await User.find({});
          console.log(allusers);
          return allusers;
        } catch (error) {
          return error;
        }
      },
    },
    user: {
      type: new GraphQLList(userType),
      args: { id: { type: GraphQLID } },

      async resolve(parent, args) {
        try {
          const allusers = await User.findOne({ _id: args.id });
          console.log(allusers);
          return [allusers];
        } catch (error) {
          return error;
        }
      },
    },
    room: {
      type: new GraphQLList(roomType),
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          const allrooms = await Room.findOne({ _id: args.id });
          console.log(allrooms);
          return [allrooms];
        } catch (error) {
          return error;
        }
      },
    },
    rooms: {
      type: new GraphQLList(roomType),

      async resolve(parent, args) {
        try {
          const allrooms = await Room.find({});
          console.log(allrooms);
          return allrooms;
        } catch (error) {
          return error;
        }
      },
    },
    complains: {
      type: new GraphQLList(complainType),

      async resolve(parent, args) {
        try {
          const allComplains = await Complain.find({});
          if (allComplains) return allComplains;
        } catch (error) {
          return error;
        }
      },
    },
    meals: {
      type: new GraphQLList(mealType),

      async resolve(parent, args) {
        try {
          const allMeals = await Meal.find({});
          if (allMeals) return allMeals;
        } catch (error) {
          return error;
        }
      },
    },
    hostelDeatails: {
      type: new GraphQLList(hostelDetailType),

      async resolve(parent, args) {
        try {
          const allDetails = await HostelDetails.find({});
          if (allDetails) return allDetails;
        } catch (error) {
          return error;
        }
      },
    },
  },
});
