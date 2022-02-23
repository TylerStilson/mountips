const { response } = require("express")



// how to get one object based on id, and handle errors
pet.findOne({
    _id: req.params.petId
}).then((pet) => {
    if(pet){
        res.set('Access-Control-Allow-Origin', '*');
        res.json(pet);
    } else {
        res.sendStatus(404);
    }
}).catch(error => {
    console.log("query failed:" + error);
    res.sendStatus(400);
});
