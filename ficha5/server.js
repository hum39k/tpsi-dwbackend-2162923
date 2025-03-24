var fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

function maxid(){
  max= dataobj.data[0].id;
  for(let i = 1; i < dataobj.data.length; i++){
    if (dataobj.data[i].id > max)
      max = dataobj.data[i].id;
  }
  return max + 1;
}


var filecontent = fs.readFileSync('data.json');

dataobj = JSON.parse(filecontent);

app.get('/users', (req, res) => {
  res.send(dataobj)
})


app.post('/users', (req, res) => {
  
  var newperson = req.body;

  dataobj.data.push(newperson);
  dataobj.data[dataobj.data.length - 1].id = maxid();

  res.send(dataobj);
})


app.delete('/users/:id', (req, res) => {
  
  var delid = req.params.id;

  // for (let i = 0; i < dataobj.data.length; i++) {
  //   if(dataobj.data[i].id == delid){
  //     dataobj.data.splice(i,1);
  //   }    
  // }
  const result = dataobj.data.filter((person) => person.id != delid)
  if (result.length == dataobj.data.length)
    res.status(404).send("ID not found");
  else{
    dataobj.data = result;
    res.send("ID:" + id + " was deleted");
  }
  
})


app.get('/users/:id', (req, res) => {
  var id = req.params.id;
  var person = null
  for (let i = 0; i < dataobj.data.length; i++) {
    if(dataobj.data[i].id == id){
      person = dataobj.data[i];
    }
  }
  if (person)
    res.send(person);
  else
    res.status(404).send("ID not found");
})


app.put('/users/:id', (req,res) => {
  var person = req.body;
  var id = req.params.id
  person.id = id
  var check = false
  for (let i = 0; i < dataobj.data.length; i++) {
    if(dataobj.data[i].id == id){
      dataobj.data[i] = person;
      res.send(dataobj.data[i]);
      check = true;
    }
  }
  if (!check){
    res.status(404).send("ID not found")
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

