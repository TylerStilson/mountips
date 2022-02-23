// const { response } = require("express");
var app = new Vue({
    el: '#app',
    data: {
        trails: [],
        trailId: "",
        test: "is this working",
        commentAuthor: "",
        commentContent: "",

        rideName: "",
        diff: "",
        des: "",
        likes: "",
        map: "",
        miles: "",
        elevation: "",

        googleSrc: "https://www.google.com/maps/embed/v1/place?key=AIzaSyCmA-9Gbm7DvU4gBwVckME3qy-uiS5rmjI&q=Space+Needle,Seattle+WA",

        homeBool: true,
        trailBool: false,
        begBool: false,
        interBool: false,
        expertBool: false,

        Glat: "",
        Glgn: "",




    },
    methods: {
        homeSwitch: function(){
            this.trailBool = false;
            this.homeBool = true;
        },
        trailSwitch: function(){
            this.trailBool = true;
            this.homeBool = false;
        },
        begSwitch: function(){
            console.log("the button was clicked");
            this.interBool = false;
            this.expertBool = false;
            this.begBool = true;
            console.log("the beg bool is: ", this.begBool);
            console.log("the inter bool is: ", this.interBool);
        },
        interSwitch: function(){
            console.log("the button was clicked");
            this.begBool = false;
            this.expertBool = false;
            this.interBool = true;
        },
        expertSwitch: function(){
            console.log("the button was clicked");
            this.interBool = false;
            this.begBool = false;
            this.expertBool = true;
        },

        fetchTrailsFromServer: function(){
            fetch("http:localhost:3000/trails").then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    this.trails = data;
                });
            });
        },

        addComment: function(){
            var data = "author=" + encodeURIComponent(this.commentAuthor);
            data += "&comment=" + encodeURIComponent(this.commentContent);

            fetch("http:localhost:3000/trails/"+ this.trailId + "/comment", {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                this.fetchTrailsFromServer();
            });
            this.commentId = "";
            this.commentContent = "";
        },

        addTrail: function(){
            var data = "rideName=" +encodeURIComponent(this.rideName);
            data += "&diff=" + encodeURIComponent(this.diff);
            data += "&des=" + encodeURIComponent(this.des);
            data += "&likes=" + encodeURIComponent(this.likes);
            data += "&map=" + encodeURIComponent(this.map);
            data += "&miles=" + encodeURIComponent(this.miles);
            data += "&elevation=" + encodeURIComponent(this.elevation);
            data += "&lat=" + encodeURIComponent(this.lat);
            data += "&lng=" + encodeURIComponent(this.lng);

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
            this.map = "";
            this.miles = "";
            this.elevation = "";
            this.lat = "";
            this.lng = "";
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

        deleteComment: function(){
            fetch("http:localhost:3000/trails/" + this.trailId +"/"+ this.commentId, {
                method: 'DELETE',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                this.fetchTrailsFromServer();
            });
        },

        deleteTrail: function(){
            fetch("http:localhost:3000/trails/" + this.trailId, {
                method: 'DELETE',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                this.fetchTrailsFromServer();
            });
        }

    },
    created: function(){
        console.log("app is loaded and ready!");
        this.fetchTrailsFromServer();
    },
    updated: function(){
        for(let i = 0; i<this.trails.length; i++){
            //this.$refs.map[i].innerHTML= this.trails[i].lat;

            new google.maps.Map(this.$refs.map[i], this.trail[i].lat, this.trail[i].lng, {
                //center: { lat: -34.397, lng: 150.644 },
                
                //this.$refs.map[i].rideName
                center: {lat: this.trails[i].lat,
                        lng: this.trails[i].lng},
                zoom: 8,
              });
        }
    }
});
