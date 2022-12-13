import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull,
} from "graphql";
import {
  userType,
  roomType,
  complainType,
  mealType,
  hostelDetailType,
} from "./graphqltypes";
import User from "../models/user";
import Room from "../models/Room";
import RoomType from "../interfaces/roominterface";
import bcrypt from "bcryptjs";
import Complain from "../models/Complain";
import Meal from "../models/Meal";
import HostelDetails from "../models/HostelDetails";

export const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: userType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
        roomId: { type: new GraphQLNonNull(GraphQLID) },
        accountType: {
          type: new GraphQLEnumType({
            name: "accountType",
            values: {
              STUDENT: { value: "STUDENT" },
              WORKER: { value: "WORKER" },
              ADMIN: { value: "ADMIN" },
            },
          }),
        },
        token: { type: GraphQLString },

        isActive: { type: GraphQLBoolean },
      },
      async resolve(parent: any, args: any) {
        try {
          const existUser = await User.findOne({ email: args.email });
          if (existUser) return "user already exists";
          if (args.password !== args.confirmPassword)
            return { message: "password do not match" };
          const newUser: {} = await new User({
            name: args.name,
            email: args.email,
            password: args.password,
            confirmPassword: args.confirmPassword,
            roomId: args.roomId,
            isActive: args.isActive,
            accountType: args.accountType,
          }).save();
          return newUser;
        } catch (error: any) {
          console.log(error.message);
          return error.message;
        }
      },
    },
    loginUser: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent: any, args: any) {
        try {
          const existUser = await User.findOne({ email: args.email });
          if (existUser) {
            const isMatch = await bcrypt.compare(
              args.password,
              existUser.password as string
            );
            if (isMatch) {
              const token = await existUser.generateToken();
              if (token) {
                const logedinuser = await User.findOneAndUpdate(
                  { email: args.email },
                  { isAuthenticated: true },
                  { new: true }
                );

                return logedinuser;
              }
            } else {
              return { success: false, message: "invalid credentials" };
            }
          } else {
            return { success: false, message: "invalid credentials" };
          }
        } catch (error: any) {
          console.log(error.message);
          return error.message;
        }
      },
    },
    updateUser: {
      type: userType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        confirmPassword: { type: GraphQLString },
        roomId: { type: GraphQLID },
        isActive: { type: GraphQLBoolean },
      },
      async resolve(parent: any, args: any) {
        try {
          const newUser = await User.findByIdAndUpdate(
            args.id,
            {
              name: args.name,
              email: args.email,
              password: args.password,
              confirmPassword: args.confirmPassword,
              roomId: args.roomId,
              isActive: args.isActive,
            },
            { new: true }
          );
          return newUser;
        } catch (error: any) {
          console.log(error.message);
          return error.message;
        }
      },
    },
    addRoom: {
      type: roomType,
      args: {
        totalSeates: { type: GraphQLInt },
        seatsRemaining: { type: GraphQLInt },
        price: { type: GraphQLInt },
        bookedByUser: { type: GraphQLID },
        isBooked: { type: GraphQLBoolean },
      },
      async resolve(
        parent,
        { totalSeates, seatsRemaining, price, bookedByUser, isBooked }
      ) {
        try {
          const newRoom: {} = await new Room({
            totalSeates,
            seatsRemaining,
            price,
            bookedByUser,
            isBooked,
          }).save();
          return newRoom;
        } catch (error) {
          return error;
        }
      },
    },
    updateRoom: {
      type: roomType,
      args: {
        id: { type: GraphQLID },
        totalSeates: { type: GraphQLInt },
        seatsRemaining: { type: GraphQLInt },
        price: { type: GraphQLInt },
        bookedByUser: { type: GraphQLID },
        isBooked: { type: GraphQLBoolean },
      },
      async resolve(
        parent,
        { totalSeates, seatsRemaining, price, bookedByUser, isBooked, id }
      ) {
        try {
          const newRoom = await Room.findByIdAndUpdate(
            id,
            { totalSeates, seatsRemaining, price, bookedByUser, isBooked },
            { new: true }
          );
          return newRoom;
        } catch (error) {
          return error;
        }
      },
    },
    bookRoom: {
      type: roomType,
      args: {
        id: { type: GraphQLID },

        bookedByUser: { type: GraphQLID },
      },
      async resolve(parent, { bookedByUser, id }) {
        try {
          const bookedRoom = await Room.findByIdAndUpdate(
            id,
            { bookedByUser, isBooked: true },
            { new: true }
          );
          return bookedRoom;
        } catch (error) {
          return error;
        }
      },
    },
    makeComplain: {
      type: complainType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        complainMessage: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { userId, complainMessage }) {
        try {
          const user = await User.findOne({ _id: userId });
          if (user) {
            const newComplain = await new Complain({
              userId: user._id,
              userName: user.name,
              complainMessage,
            }).save();
            if (newComplain) return newComplain;
          }
        } catch (error) {
          return error;
        }
      },
    },
    addMeal: {
      type: mealType,
      args: {
        mealName: { type: new GraphQLNonNull(GraphQLString) },
        units: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, { mealName, units }) {
        try {
          const newMeal = await new Meal({ mealName, units }).save();
          if (newMeal) return newMeal;
        } catch (error) {
          return error;
        }
      },
    },
    addHostelDeatails: {
      type: hostelDetailType,
      args: {
        hostelTimming: { type: new GraphQLNonNull(GraphQLString) },
        emergencyContactNumber: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, { hostelTimming, emergencyContactNumber }) {
        try {
          const newHostelDetails = await new HostelDetails({
            hostelTimming,
            emergencyContactNumber,
          }).save();
          if (newHostelDetails) return newHostelDetails;
        } catch (error) {
          return error;
        }
      },
    },
  },
});
