const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const model = require('./model')
const Trail = model.Trail;

// google api key AIzaSyCmA-9Gbm7DvU4gBwVckME3qy-uiS5rmjI

// const TRAILS = [{
//     rideName: "bear claw",
//     diff: "intermediate",
//     description: "lorem ipsom",
//     likes: 256,
//     mapSrc: "https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Space+Needle,Seattle+WA",
//     comments: [ {id: 1, comment: "lol so fun"},
//                 {id: 2, comment: "this sucked"},
//                 {id: 3, comment: "great time"}],
//     miles: 13.4,
//     elevation: "844' up & 847' down"
// },
// {
//     rideName: "zen",
//     diff: "intermediate",
//     description: "lorem ipsom",
//     likes: 201,
//     mapSrc: "https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Space+Needle,Seattle+WA",
//     comments: [ {id: 1, comment: "lol so fun"},
//                 {id: 2, comment: "this sucked"},
//                 {id: 3, comment: "great time"}],
//     miles: 10.1,
//     elevation: "844' up & 847' down"
// }]

app.use(express.urlencoded({ extended: false }))
app.use(cors())

//grabs all trails
app.get('/trails', (req, res) => {
    Trail.find().then((TRAILS) => {
        res.send(TRAILS);
    });
    
});

//grabs one trail
app.get('/trails/:trailId', (req, res) => {
    console.log("get function");
    Trail.findOne({
        _id: req.params.trailId
    }).then((trail) => {
        res.json(trail)
    });

    // trail = req.params.trailId;
    // res.send(TRAILS[trail]);
});

//posts a new comment on specific trail
app.post('/trails/:trailId/comments', (req, res) => {
    console.log("raw request body: ", req.body);
    // trail = req.params.trailId;
    // comment = req.params.comment;
    // user = req.params.user;
    // const commentX = new Comment({
    //                                 author: req.body.author,
    //                                 comment: req.body.comment
    // });


    Trail.findOne({
        _id: req.params.trailId
    }).then((trail) => {
        //console.log("commentx: ", commentX)
        console.log("trail: ", trail);
        console.log("req.body: ", req.body);
        console.log("comment: ", req.body.content);
        console.log("comment: ", req.body.author);
        trail.comments.push({
            author: req.body.author,
            content: req.body.content
        });
        console.log("Pcomments: ", trail)
        trail.save().then(() => {
            res.status(201).send("created");
        }).catch(() => {
            res.status(204).send("invalid request");
        });
        // var commentY = trailX.comments.push(commentX);
        // console.log("commenty: ", commentY)
        // const trail = new Trail({
        //     _id: req.params.trailId,
        //     rideName: req.body.rideName,
        //     diff: req.body.diff,
        //     des: req.body.des,
        //     likes: req.body.likes,
        //     map: req.body.map,
        //     comments: commentY,
        //     miles: req.body.miles,
        //     elevation: req.body.elevation });
        // Trail.updateOne({ _id: req.params.trailId }, trail).then(() => {
        //     res.status(201).send("Trail updated successfully!");
        // }).catch((error) => {
        //     res.status(400).json({
        //         error: error,
        //     });
        // });
        
    });
    
    // const trail = new Trail({
    //                                 _id: req.params.trailId,
    //                                 rideName: req.body.rideName,
    //                                 diff: req.body.diff,
    //                                 des: req.body.des,
    //                                 likes: req.body.likes,
    //                                 map: req.body.map,
    //                                 comments: commentY,
    //                                 miles: req.body.miles,
    //                                 elevation: req.body.elevation });

    // Trail.updateOne({ _id: req.params.trailId }, trail).then(() => {
    //     res.status(201).send("Trail updated successfully!");
    // }).catch((error) => {
    //     res.status(400).json({
    //         error: error,
    //     });
    // });
    
});


app.post('/trails', (req, res) => {
    console.log("raw request body: ", req.body);

    const trail = new Trail({
                                        rideName: req.body.rideName,
                                        diff: req.body.diff,
                                        des: req.body.des,
                                        likes: req.body.likes,
                                        map: req.body.map,
                                        comments: [],
                                        miles: req.body.miles,
                                        elevation: req.body.elevation,
                                        lat: req.body.lat,
                                        lng: req.body.lng });
    trail.save().then(() => {
        res.status(201).send("created");
    }).catch(() => {
        res.status(204).send("invalid request");
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
                                        map: req.body.map,
                                        comments: [],
                                        miles: req.body.miles,
                                        elevation: req.body.elevation,
                                        lat: req.body.lat,
                                        lng: req.body.lng
    });
    console.log("hello");
    Trail.updateOne({ _id: req.params.trailId }, trail).then(() => {
        res.status(201).send("Trail updated successfully!");
    }).catch((error) => {
        res.status(400).json({
            error: error,
        });
    });
});


// app.put('/trails/:trailId/:commentid', (req, res) => {
//     console.log("raw request body: ",  req.body);
//     trail = req.params.trailId;
//     commentId = req.params.commentid;
//     console.log(commentId);
//     let commentId2 = commentId - 1;
//     console.log(commentId2);
//     console.log(TRAILS[trail].comments[commentId2]);
//     // Object.assign(skillet.person.name, { first: 'blah', last: 'ha'});
//     Object.assign(TRAILS[trail].comments[commentId2], req.body);
//     res.status(201).send("updated");
// });

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
app.delete('/trails/:trailId/:commentid', (req, res) => {
    trail = req.params.trailId;
    commentId = req.params.commentid;
    console.log(commentId);
    let commentId2 = commentId - 1;
    console.log(commentId2);
    //TRAILS[trail].comments.delete(req.body);
    delete(TRAILS[trail].comments[commentId2])
    res.status(201).send("deleted");
});



app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
