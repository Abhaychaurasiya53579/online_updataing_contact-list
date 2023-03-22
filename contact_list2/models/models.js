const mongoose = require("mongoose");
const contactschema = new mongoose.Schema(
{
   name : {
    type:String,
    rquired:true

    },
    phone:{
        type:String,
        required:true
    }
}
);

const contact= mongoose.model('contact_number',contactschema);
module.exports=contact;