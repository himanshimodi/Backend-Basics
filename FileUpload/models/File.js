//instance of mongoose
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//route handler
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware has to be created after creation of schema and before calling mongoose.model()
fileSchema.post ("save", async function(doc) {
    try{

        console.log("DOC->",doc);

        //create transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from:`Image/Video - by Himanshi`,
            to:doc.email,
            subject:"New file uploaded on Cloudinary",
            html:`<h1>Hello guys</h1> <p>File uploaded on Cloudinary View here: <a href= "${doc.imageUrl}">${doc.imageUrl}</a> </p>`
        });

        console.log("INFO -> ",info);

    }catch(error){
        console.log(error);
    }
})

//export
const File = mongoose.model("File", fileSchema);
module.exports = File;