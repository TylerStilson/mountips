

var app = new Vue({
    el: '#app',
    data: {
        comments: [],
        trails: [],
        trailId: "",
        test: "is this working",
        commentAuthor: "",
        commentContent: "",
        trail: {},

        rideName: "",
        diff: "",
        des: "",
        likes: "",
        miles: "",
        elevation: "",
        author: "",
        content: "",
        _id: "",

        // googleSrc: "https://www.google.com/maps/embed/v1/place?key=AIzaSyCmA-9Gbm7DvU4gBwVckME3qy-uiS5rmjI&q=Space+Needle,Seattle+WA",

        homeBool: true,
        trailBool: false,
        begBool: false,
        interBool: false,
        expertBool: false,
        editBool: false,
        addTrailBool: false,
        success: false,

        Glat: "",
        Glgn: "",
        errors: {},




    },
    methods: {
        validateTrail: function(){
            this.errors = {};
            if(this.rideName.length == 0){
                this.errors.rideName = "please specify trail name";
            }
            if(!["beginner", "intermediate", "expert"].includes(this.diff.toLowerCase())){
                this.errors.diff = "enter a trail difficulty";
            }
            if(this.des.length == 0){
                this.errors.des = "please enter a description";
            }
            if(this.miles.length == 0){
                this.errors.miles = "please enter how long the ride is";
            }
            if(this.elevation.length == 0){
                this.errors.elevation = "please enter the elevation change for the ride";
            }
            if(this.Glat.length == 0){
                this.errors.Glat = "enter lattitude please";
            }
            if(this.Glgn.length == 0){
                this.errors.Glgn = "enter longitude please";
            }
            else{
                return this.newTrailIsValid;
            }
        },
        homeSwitch: function(){
            this.trailBool = false;
            this.homeBool = true;
            this.success = false;
        },
        trailSwitch: function(){
            this.trailBool = true;
            this.homeBool = false;
            this.addTrailBool = true;
        },
        begSwitch: function(){
            console.log("the button was clicked");
            this.interBool = false;
            this.expertBool = false;
            this.begBool = true;
            this.filterTrails("beginner");
        },
        interSwitch: function(){
            console.log("the button was clicked");
            this.begBool = false;
            this.expertBool = false;
            this.interBool = true;
            this.filterTrails("intermediate");
        },
        expertSwitch: function(){
            console.log("the button was clicked");
            this.interBool = false;
            this.begBool = false;
            this.expertBool = true;
            this.filterTrails("expert");
        },
        updateSwitch: function(trail){
            this.trailBool = false;
            this.homeBool = false;
            this.editBool = true;
            this.trail = trail;
            console.log("trail: ", this.trail);
            this.rideName = this.trail.rideName;
            this.des = this.trail.des;
            this.diff = this.trail.diff;
            this.miles = this.trail.miles;
            this.elevation = this.trail.elevation;
            this.Glat = this.trail.Glat;
            this.Glgn = this.trail.Glgn;
            this._id = this.trail._id;
        },

        fetchTrailsFromServer: function(){
            fetch("http:localhost:3000/trails").then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    this.trails = data;
                });
            });
        },
        filterTrails: function(diff){
            fetch(`http:localhost:3000/trails/filter/${diff}`).then((response) =>{
                response.json().then((data) => {
                    this.trails = data;
                });
            });
        },

        addComment: function(trailS){
            console.log("in addComent function ",this.commentAuthor);
            console.log("in addComent function ",this.commentContent);
            console.log("in addComent function ",trailS);
            console.log("in addComent function ",trailS._id);


            var data = "author=" + encodeURIComponent(this.commentAuthor);
            data += "&content=" + encodeURIComponent(this.commentContent);

            fetch("http:localhost:3000/trails/"+ trailS._id + "/comments", {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                this.fetchTrailsFromServer();
            });
            this.commentAuthor = "";
            this.commentContent = "";
        },

        addTrail: function(){

            if(!this.validateTrail()){
                return;
            }
            console.log("lat is: ", this.Glat)

            var data = "rideName=" +encodeURIComponent(this.rideName);
            data += "&diff=" + encodeURIComponent(this.diff);
            data += "&des=" + encodeURIComponent(this.des);
            data += "&likes=" + encodeURIComponent(this.likes);
            data += "&miles=" + encodeURIComponent(this.miles);
            data += "&elevation=" + encodeURIComponent(this.elevation);
            data += "&Glat=" + encodeURIComponent(this.Glat);
            data += "&Glgn=" + encodeURIComponent(this.Glgn);

            fetch("http:localhost:3000/trails", {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                this.fetchTrailsFromServer();
            });
            this.rideName = "";
            this.diff = "";
            this.des = "";
            this.likes = "";
            this.miles = "";
            this.elevation = "";
            this.Glat = "";
            this.Glgn = "";
            this.success = true;
        },
    

        updateComment: function(){
            var data = "comment=" + encodeURIComponent(this.commentContent);

            fetch("http:localhost:3000/trails/" + this.trailId +"/"+ this.commentId, {
                method: 'PUT',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                this.fetchTrailsFromServer();
            });
        },

        deleteComment: function(comment){
            this.commentId = comment._id;
            fetch("http:localhost:3000/trails/deleteComment" + this.commentId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                this.fetchTrailsFromServer();
            });
        },

        deleteTrail: function(trailId){
            fetch(`http:localhost:3000/trails/${trailId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                this.fetchTrailsFromServer();
            });
        },
        updateTrail: function(){
            console.log("going to update the trail....")
            var data = "rideName=" +encodeURIComponent(this.rideName);
            data += "&diff=" + encodeURIComponent(this.diff);
            data += "&des=" + encodeURIComponent(this.des);
            data += "&likes=" + encodeURIComponent(this.likes);
            data += "&miles=" + encodeURIComponent(this.miles);
            data += "&elevation=" + encodeURIComponent(this.elevation);
            data += "&Glat=" + encodeURIComponent(this.Glat);
            data += "&Glgn=" + encodeURIComponent(this.Glgn);

            fetch(`http:localhost:3000/trails/${this._id}`, {
                method:'PUT',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                this.fetchTrailsFromServer();
                this.trailBool = false;
                this.homeBool = true;
                this.editBool = false;

                this.rideName = "";
                this.diff = "";
                this.des = "";
                this.likes = "";
                this.miles = "";
                this.elevation = "";
                this.Glat = "";
                this.Glgn = "";
            });
        },
        // deleteComment: function() {
        //     console.log("in the delete function");
        // }
        // {
        //     fetch(`http:localhost:3000/trails/${trail_id}/${comment_id}`, {
        //         method: 'DELETE',
        //         body: data,
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         }
        //     }).then((response) => {
        //         this.fetchTrailsFromServer();
        //     });
        // }

    },
    computed: {
        nameIsInvalid: function(){
            return !!this.errors.rideName;
        },
        diffIsInvalid: function(){
            return !!this.errors.diff;
        },
        desIsInvalid: function(){
            return !!this.errors.des;
        },
        milesIsInvalid: function(){
            return !!this.errors.miles;
        },
        elevationIsInvalid: function(){
            return !!this.errors.elevation;
        },
        GlatIsInvalid: function(){
            return !!this.errors.Glat;
        },
        GlgnIsInvalid: function(){
            return !!this.errors.Glgn;
        },
        newTrailIsValid: function(){
            return Object.keys(this.errors).length == 0;
        }
    },
    created: function(){
        console.log("app is loaded and ready!");
        this.fetchTrailsFromServer();
    },
    updated: function(){
        if(this.homeBool == true){
            for(let i = 0; i<this.trails.length; i++){

                // for( let j = 0; j<this.trails[i].comments.length; j++ ){
                //     this.author = this.$refs.comment[j].author
                //     this.content = this.$refs.comment[j].content

                // }
                //this.$refs.map[i].innerHTML= this.trails[i].lat;

                console.log("in update function: ", this.trails[i].lat, this.trails[i].lng)

                const location = { lat: this.trails[i].Glat, lng: this.trails[i].Glgn }

                new google.maps.Map(this.$refs.map[i], {
                    //center: { lat: -34.397, lng: 150.644 },
                
                    //this.$refs.map[i].rideName
                    center: location,
                    zoom: 15,
                
                    //another comment
                });
              
            }
        }
        
    }
});
