const  express = require('express');
const port =8000;
const path = require('path');
const db = require('./config/mongodb');
const contact =require('./models/models')

const app = express();

app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'htmlfiles'));

app.use(express.static('assets'))
   
    
   

var contact_list=[
   {name:"abahy",
phone:"998171626"},
{name:"bharat",
phone:"998171626"},
{name:"nikhil",
phone:"998171626"},

]

app.get("/delete-contact/",function(req,res){

    // console.log(req.query);
    // let x = req.query.phone;
    
    // let index = contact_list.findIndex(contact => contact.phone==x);
    // contact_list.splice(index,1);

    // return res.redirect("back");

    let id = req.query.id;
    contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting");
            return;
        }
       
    });
    return res.redirect("back");
});


app.get("/",function (req,res){
    // return res.render("html1",{
    //     contactlist:contact_list,
    //     title:"contacts"});

contact.find({},function(err,contacts){
    if(err){
        console.log("error in fetching contact");
        return;
    }
    else{
    return res.render("html1",{
        contactlist:contacts,
    });
}
})
    
});

// app.get("/practise",function (req,res){
//     return res.render("practise",{
//         contactlist:contact_list,
//     });
// });


app.post("/create-contact",function(req,res){

// contact_list.push({
//     name:req.body.name,
//     phone:req.body.phone
// });
// //console.log(req.body.name);
// return res.redirect("/");

contact.create({
    name:req.body.name,
    phone:req.body.phone
},function(err,newcontact){
    if(err){
        console.log("error in saving");
        return;
    }
    else{
        console.log("*******",newcontact);
      
    }
    return res.redirect('/');
});

});





app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("my server is running");
    }
});


