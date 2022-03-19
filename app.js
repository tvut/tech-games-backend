require('dotenv').config();

var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

const PORT = process.env.PORT || 8080

app.use(cors());
app.use(bodyParser.json());

var songs = [
    {
        "title": "Never Going to Give You Up",
        "artist": "Rick Astley",
        "genre": "Masterpiece",
        "liked": true
    },
    {
        "title": "Wellerman",
        "artist": "The Longest Johns",
        "genre": "Sea Shanty",
        "liked": false
    },
    {
        "title": "Drunken Sailor",
        "artist": "The Irish Rovers",
        "genre": "Sea Shanty",
        "liked": false
    },
    {
        "title": "Whores and Hounds",
        "artist": "The Irish Rovers",
        "genre": "Sea Shanty",
        "liked": false
    },
    {
        "title": "Jackie Chan",
        "artist": "Wifisfuneral",
        "genre": "Rap",
        "liked": false
    },
    {
        "title": "American Dream",
        "artist": "Skizzy Mars",
        "genre": "Rap",
        "liked": false
    },
    {
        "title": "Gucci Gang",
        "artist": "Lil Pump",
        "genre": "Masterpiece",
        "liked": false
    },
    {
        "title": "44 More",
        "artist": "Logic",
        "genre": "Rap",
        "liked": false
    },
]

  app.get("/list", function (req, res) {
    if(Math.floor(Math.random() * 10)>-1){
        res.send({
            songs
        });
    } else {
        res.send(
            {
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        )
    }
  });

  app.get("/liked", function (req, res) {
    res.send(
        songs.filter(function(ele){
            return ele.liked;
        })
      );
  });

  app.put("/add", function (req, res) {
    // console.log(req.body)
    var toAdd = req.body
    if(toAdd){
        if(!toAdd.title||!toAdd.artist||!toAdd.genre){
            res.send({
                "Error" : "need a title, artist and genre"
              });
        } else {
            if(songs.find(el => el.title===toAdd.title)){
                res.send({
                    "Error" : "item already exists"
                  });
            } else {
                toAdd.liked = false
                songs.push(toAdd)
                res.send({
                    "Success":"true"
                });
            }
        }
    } else {
        res.send({
            "Error" : "no information sent"
          });
    }
  });

  app.post("/like", function (req, res) {
    // console.log(req.body)
    toLike = req.body.title
    if(toLike){
    toUpdate = songs.find(el => el.title===toLike)
    if(toUpdate){
        // console.log(toUpdate)
        songs=songs.filter(function(ele){
            return ele.title!=toLike;
        })
        toUpdate.liked = true;
        songs.push(toUpdate);
        res.send({
            "Success":"true"
        });
    } else {
        res.send({
            "Error" : "item not found"
          });
    }
    } else{
        res.send({
            "Error" : "include a title"
        });
    }
  });

  app.post("/unlike", function (req, res) {
    // console.log(req.body)
    toLike = req.body.title
    if(toLike){
        toUpdate = songs.find(el => el.title===toLike)
        if(toUpdate){
        // console.log(toUpdate)
        songs=songs.filter(function(ele){
            return ele.title!=toLike;
        })
        toUpdate.liked = false;
        songs.push(toUpdate);
        res.send({
            "Success":"true"
        });
        } else {
            res.send({
                "Error" : "item not found"
            });
        }
    } else{
        res.send({
            "Error" : "include a title"
        });
    }
  });

  app.post("/playlist", function (req, res) {
    // console.log(req.body)
    // songs.push(req.body)
    var artist = req.body.artist
    var genre = req.body.genre
    if(artist){
        res.send(
            songs.filter(function(ele){
                return ele.artist===artist;
            })
        );
    }
    else if(genre){
        res.send(
            songs.filter(function(ele){
                return ele.genre===genre;
            })
        );
    }
    else{
        res.send({
            "Message" : "provide either an artist or a genre"
          });
    }
  });

  app.get("/judge", function (req, res) {
    rap = songs.filter(el => el.genre==="Rap").length
    shanty = songs.filter(el => el.genre==="Sea Shanty").length
    pop = songs.filter(el => el.genre==="Pop").length
    rock = songs.filter(el => el.genre==="Rock").length
    funk = songs.filter(el => el.genre==="Funk").length
    if(Math.max(rap, shanty, pop, rock, funk) == shanty){
        res.send({
            "Message" : "you must be irish matey"
          });
    } else if (Math.max(rap, shanty, pop, rock, funk) == rap){
        res.send({
            "Message" : "gucci gang gucci gang gucci gang gucci gang"
          });
    } else if (Math.max(rap, shanty, pop, rock, funk) == pop){
        res.send({
            "Message" : "ya basic"
          });
    } else if (Math.max(rap, shanty, pop, rock, funk) == rock){
        res.send({
            "Message" : "your mom called she want's her records back"
          });
    } else if (Math.max(rap, shanty, pop, rock, funk) == funk){
        res.send({
            "Message" : "not a real genre of music"
          });
    } else {
        res.send({
            "Message" : "no taste"
          });
    }
  });

  app.delete("/delete", function (req, res) {
    // console.log(req.body)
    var toDelete = req.body.title
    if(toDelete){
        // console.log(toDelete)
        l = songs.length
        songs=songs.filter(function(ele){
            return ele.title!=toDelete;
        })
        if(l==songs.length){
            res.send({
                "Error" : "item not found"
              });
        } else {
            res.send({
                "Message" : "success"
            });
        }
    } else {
        res.send({
            "Error" : "include a title"
          });
    }
  });

app.listen(PORT, () => {
    console.log(`Success! Your application is running on port ${PORT}.`);
});