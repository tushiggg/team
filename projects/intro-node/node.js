const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors')

const playlist = [];
const users = [];
const songs = [];
n = 0;

const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/playlist", (req, res) => {
  res.send(JSON.stringify(playlist));
}); 

app.get("/playlist/:id",(req,res) => { 
  var id = req.params.id;
  id = id - 1;
  res.send(JSON.stringify(playlist[id])); 
} )

app.post('/playlist/:id', (req, res) => {
  playlist.push({name: "My Playlist" + " " +`#${n=n+1}`, id: `${n}`, ...req.body});
  res.send("new playlist created");
});

app.delete("/playlist/:id", (req,res) => { 
  var id = req.params.id;
  id = id - 1;
  n = n - 1;
  playlist.splice(id,1);
  res.send("playlist deleted");
})

app.put("/playlist", (req, res) => {
  const data = req.body;
  playlist.push(data);
  res.send("Success");
});

app.get("/users", (req, res) => { 
  res.send(JSON.stringify(users));
});

app.post("/users", (req, res) => {
  users.push({ id: users.length + 1, ...req.body });
  res.send("New user created");
});

app.listen(port, () => {
  `Server running at localhost:${port}/`;
});
