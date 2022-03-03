const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tstilson:oeftGhUuQm47g7Qs@cluster0.nbqzb.mongodb.net/Trails?retryWrites=true&w=majority');

const Trail = mongoose.model('Trail', { rideName: {
                                            type: String,
                                            required: [true, "please specify ride name"]
                                        },
                                        diff: {
                                            type: String,
                                            required: [true, "please pick difficulty"]
                                        },
                                        des: {
                                            type: String,
                                            required:[true, "please include a short discription about the trail"]
                                        },
                                        likes: Number,
                                        comments: [{    author: {
                                                                type: String,
                                                                required: [true, "please add user name for comment"]
                                        },
                                                        content: {
                                                                type: String,
                                                                required: [true, "please add content for your comment"]
                                                        } }],
                                        miles: {
                                            type: Number,
                                            required: [true, "please include how many miles the trail is"]
                                        },
                                        elevation: String,
                                        Glat: {
                                            type: Number,
                                            required: [true, "please inculde the lattitude of trail head"]
                                        },
                                        Glgn: {
                                            type: Number,
                                            required: [true, "please include the longitude for the head"]
                                        }
});



module.exports = {
    Trail:Trail
    
}
