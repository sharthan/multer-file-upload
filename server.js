const multer = require("multer");
const upload = multer({ dest: __dirname + "uploads/" });

const express = require("express");

const app = express();
app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/'));

app.use(express.json());


app.get("/public", function (req, res){
    res.render("index",
    {});
});

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
	console.dir(req.body);
	console.log(req.files);
	res.json({ message: "Successfully uploaded files" });
}

app.listen(5000, () => {
	console.log(`Server started... https://localhost:5000`);
});
