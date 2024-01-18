const express =require("express");
const app=express();
const fs=require("fs");
const path=require("path");
const port=8080;

const folderPath="./files";
if(!fs.existsSync(folderPath))
{
    fs.mkdirSync(folderPath,{recursive:true});
}

app.get("/createfiles",createFile);
app.get("/list-files",readFile);


function createFile(req,res){
    const now= new Date();
    const fileName=`${now.toISOString().replace(/:/g,"-")}.txt`;
    const filePath=path.join(folderPath,fileName);
    
    fs.writeFile(filePath,now.toString(),(err)=>{
        if(err)
        {
            res.writeHead(500);
            res.end("server error!");
            return;
        }
        res.writeHead(200,{"Content-Type":"text/plain"})
                res.end(`file created:,${fileName}`);
    } )}

function readFile(req,res){
    fs.readdir(folderPath,(err,files)=>
    {
        if(err)
        {
            res.writeHead(500);
            res.end("server error!");
            return;
        }
        const txtFiles=files.filter((file)=>path.extname(file)=='.txt');
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(txtFiles));
    })}


app.listen(port,()=>console.log(`server run on port ${port}`));