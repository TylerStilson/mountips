const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const model = require('./model')
const Trail = model.Trail;



app.use(express.urlencoded({ extended: false }))
app.use(cors())

//grabs all trails
app.get('/trails', (req, res) => {
    Trail.find().then((TRAILS) => {
        res.send(TRAILS);
    });
    
});


app.get('/trails/filter/:diffS', (req,res) => {
    Trail.find({
        diff: req.params.diffS
    }).then((TRAILS) => {
        res.send(TRAILS);
    });
})


//grabs one trail
app.get('/trails/:trailId', (req, res) => {
    console.log("get function");
    Trail.findOne({
        _id: req.params.trailId
    }).then((trail) => {
        res.json(trail)
    });
});

//posts a new comment on specific trail
app.post('/trails/:trailId/comments', (req, res) => {
    console.log("raw request body: ", req.body);
    Trail.findOne({
        _id: req.params.trailId
    }).then((trail) => {
        trail.comments.push({
            author: req.body.author,
            content: req.body.content
        });
        //console.log("Pcomments: ", trail)
        trail.save().then(() => {
            res.status(201).send("created");
        }).catch((error) => {
            if (error.errors){
                let errorMessages = {};
                for (let e in error.errors){
                    errorMessages[e] = error.errors[e].message;
                }
                res.status(422).json(errorMessages);
            }else {
                res.status(500).send("server error");
            }
        }); 
    });
});


app.post('/trails', (req, res) => {
    console.log("raw request body: ", req.body);

    const trail = new Trail({
                                        rideName: req.body.rideName,
                                        diff: req.body.diff,
                                        des: req.body.des,
                                        likes: 0,
                                        comments: [],
                                        miles: req.body.miles,
                                        elevation: req.body.elevation,
                                        Glat: req.body.Glat,
                                        Glgn: req.body.Glgn });
    trail.save().then(() => {
        res.status(201).send("created");
    }).catch((error) => {
        console.error("error occurred while creating a pet", error);
        
        if(error.errors){
            let errorMessages = {};
            for (let e in error.errors){
                errorMessages[e] = error.errors[e].message;
            }
            res.status(422).json(errorMessages);
        } else{
            res.status(500).send("server error");
        }
    });
});

app.put('/trails/:trailId', (req, res) => {
    console.log("lat: ", req.body.lat);
    const trail = new Trail({
                                        _id: req.params.trailId,
                                        rideName: req.body.rideName,
                                        diff: req.body.diff,
                                        des: req.body.des,
                                        likes: req.body.likes,
                                        comments: [],
                                        miles: req.body.miles,
                                        elevation: req.body.elevation,
                                        Glat: req.body.Glat,
                                        Glgn: req.body.Glgn
    });
    Trail.updateOne({ _id: req.params.trailId }, trail).then(() => {
        res.status(201).send("Trail updated successfully!");
    }).catch((error) => {
        res.status(400).json({
            error: error,
        });
    });
});


app.delete('/trails/:trailId', (req, res) => {
    Trail.findOne({
        _id: req.params.trailId
    }).then((trail) =>{
        if (trail) {
            Trail.deleteOne({
                _id: req.params.trailId
            }).then(() => {
                res.sendStatus(204);
            });
        } else {
            res.sendStatus(404);
        }
    }).catch(error => {
        console.error("DB query failed: ", error);
        res.sendStatus(400);
    });
});


//deletes specific comment off specific trail
app.delete('/trails/deleteComment/:commentid', (req, res) => {
    Trail.findOne({
        _id: req.params.commentid
    }).then(()=>{

        Trail.deleteOne({
            _id: req.params.commentid
        }).then(() => {
            res.status(204).send("deleted");
        });
    }).catch(error => {
        console.error("DB query failed: ", error);
        res.sendStatus(400);
    });
    
});



app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
