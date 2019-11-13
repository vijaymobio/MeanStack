const db = require('./db')
const mongoose = require('mongoose');
const { ObjectID } = require("mongodb");
mongoose.connect('mongodb://localhost:27017/emp2', {useNewUrlParser: true,});
// useUnifiedTopology: true
const emp = mongoose.model('emps', {name: String , city:String});

// const kitty = new emp({ id:1,name: 'vijay' , city:"ahmedabad"});
// kitty.save().then(() => console.log('meow'));

const Query = {
   greeting:() => {
      return "hello from  TutorialsPoint !!!"
   },
   students:() => db.students.list(),
   employee:() => emp.find(),
   empById:(root,args,context,info) => {
    //args will contain parameter passed in query
    return emp.findById(args.id).exec(); 
 }
}
module.exports = {Query}