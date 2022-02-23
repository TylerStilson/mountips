const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tstilson:oeftGhUuQm47g7Qs@cluster0.nbqzb.mongodb.net/Trails?retryWrites=true&w=majority');

const Trail = mongoose.model('Trail', { rideName: String,
                                        diff: String,
                                        des: String,
                                        likes: Number,
                                        map: String,
                                        comments: [{    author: String,
                                                        content: String }],
                                        miles: Number,
                                        elevation: String,
                                        lat: Number,
                                        lng: Number
});
// const Comment = mongoose.model('Comment', { author: String,
//                                             comment: String
// });


module.exports = {
    Trail:Trail
    // Comment:Comment
}
