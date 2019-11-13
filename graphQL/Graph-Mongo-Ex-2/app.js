const Express =  require("express");
const mongoose = require('mongoose');
const ExpressGraphQl = require("express-graphql");
const {
GraphQLID,
GraphQLString,
GraphQLObjectType,
GraphQLList,
GraphQLSchema,
GraphQLNonNull
} = require("graphql")

var app = Express();
mongoose.connect('mongodb://localhost:27017/emp2', {useNewUrlParser: true,});

const PersonModel = mongoose.model("emps",{
    name:String,
    city:String
});
const PersonType = new GraphQLObjectType({
    name:"Person",
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        city:{type:GraphQLString}
    }
})
const schema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name : "Query",
        fields:{
            people:{
                type:GraphQLList(PersonType),
                resolve:(root,args,context,info)=>{
                    return  PersonModel.find().exec();                    
                }
            },
            Person:{
                type:PersonType,
                args:{
                    id:{type:GraphQLNonNull(GraphQLID)}
                },
                resolve:(root,args,context,info)=>{
                    return  PersonModel.findById(args.id).exec();                    
                }
                
            }
        }
    })
})
app.use("/graphql",ExpressGraphQl({
    schema:schema,
    graphiql:true
}))

app.listen(
    3000, () => console.info(
       `Server started on port 3000`
    )
 );