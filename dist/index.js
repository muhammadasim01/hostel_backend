"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./config/dbConnection");
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./Schema/schema"));
(0, dbConnection_1.dbconnection)();
const app = (0, express_1.default)();
// app.get('/',(req,res)=>{
//     res.send("hwlo waeroh")
// })
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true
}));
app.listen(process.env.PORT, () => {
    console.log(`server is running on the port ${process.env.PORT}`);
});
