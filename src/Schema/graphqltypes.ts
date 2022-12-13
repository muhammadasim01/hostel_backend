import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";

export const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
    roomId: { type: GraphQLID },
    isActive: { type: GraphQLBoolean },
    isAuthenticated: { type: GraphQLBoolean },
    totalBill: { type: GraphQLInt },
    billPaid: { type: GraphQLBoolean },
    accountType: { type: GraphQLString },
  }),
});

export const roomType = new GraphQLObjectType({
  name: "Room",
  fields: () => ({
    id: { type: GraphQLID },
    totalSeates: { type: GraphQLInt },
    seatsRemaining: { type: GraphQLInt },
    price: { type: GraphQLString },
    bookedByUser: { type: GraphQLID },
    isBooked: { type: GraphQLBoolean },
  }),
});

export const complainType = new GraphQLObjectType({
  name: "Complain",
  fields: () => ({
    userId: { type: GraphQLString },
    userName: { type: GraphQLString },
    complainMessage: { type: GraphQLString },
  }),
});
export const mealType = new GraphQLObjectType({
  name: "Meal",
  fields: () => ({
    mealName: { type: GraphQLString },
    units: { type: GraphQLInt },
  }),
});
export const hostelDetailType = new GraphQLObjectType({
  name: "HostelDetail",
  fields: () => ({
    hostelTimming: { type: GraphQLString },
    emergencyContactNumber: { type: GraphQLInt },
  }),
});

export const messBill = new GraphQLObjectType({
  name: "MessBill",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    totalbill: { type: GraphQLInt },
  }),
});
