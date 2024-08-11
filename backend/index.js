const express=require('express')
const app=express()
const multer = require('multer');
const path=require('path');
const fs = require('fs');
const cors=require('cors');
const bodyParser=require('body-parser')
app.use(cors())
app.set('view engine', 'ejs');
app.use(bodyParser.json())

// const upload = multer({
//     dest: 'public/users-avatar',
// //destination folder is automatically created if it's not available
//     limits: {
//         fileSize: 5000000 // 5mb
//     },
//     fileFilter: (req, file, callback) => {
//         console.log(file);
//         if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
//             return callback(new Error('Please upload a Picture(PNG or JPEG)'))
//         }
//         callback(undefined, true);
//     }

// })

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(file)
                callback(null, 'public/avatar');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now()+'-'+file.originalname);
    }
});

const upload=multer({storage:storage})

//Used with sendFile function
// const filePath=path.resolve(__dirname,'index.html');

app.get('/upload', (req,res) => {
    res.render('pages/index')
})

app.post('/upload', upload.array('avatar',12), (req,res) => 
    {
    console.log("Hello There");
    // res.send("File successfully uploaded")
    // res.redirect('/upload');
    res.json({data: "success"});
})

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Start the server"
    })
})


app.listen(3000)
