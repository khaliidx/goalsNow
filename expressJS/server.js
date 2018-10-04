const app        = require('express')();
const mongoose = require('mongoose');
const Clip = require('./models/clip')
const request = require('request-promise');
const moment = require('moment')
const CronJob = require('cron').CronJob;
const _ = require('underscore')

mongoose.Promise = global.Promise;/////////// plug bluebird for better performance 


// CONNECT TO THE DATABASE AND START THE SERVER
// =============================================================================

let connectionString = 'mongodb://user1:pass@ds141284.mlab.com:41284/goalsnow';// RANDOM DATABASE FOR TESTING ONLY
//let connectionString = 'mongodb://localhost:27017';   // Local db
const port = process.env.PORT || 8000
mongoose.connect(connectionString, {useMongoClient: true,})

let server = app.listen(port, () => {
    console.log('Magic happening on port '+port+'...')
})


// webSockets Socket.IO
var io = require('socket.io')(server);

io.on('connection', socket => {
  io.emit('connected', 'user connected')    
  
  socket.on("disconnect",()=>{})
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  })
})



function update(){
    let clipsFromDB;

    console.log("\nChecking for updates...")

    Clip.find().sort({ "createdAt" : -1, "_id" : 1 }).limit(20)
        .then( (results) => {

            clipsFromDB = results
            const options = {
                method: 'GET',
                uri: `https://reddit.com/r/soccer/new/.json?limit=20`
            };

            return request(options)
        })
        .then(response => {
          let parsedRes = JSON.parse(response) //posts
          let filterdClips, newClips = [], urls = ["youtube","youtu.be",".mp4","streamable","imgtc","gfycat","streamja","clippituser",]

          // First filter : filter vids from posts
          filterdClips = _.filter(parsedRes.data.children, (clip) => {
                return !urls.every( (url)=>{
                    return !clip.data.url.includes(url)
                })
          })

          // Second filter :  filter the new clips
          for(let clip of filterdClips){
            if(!clipsFromDB.some( (c)=>{ return (c.title == clip.data.title) }) ) {
                newClips.unshift({
                    title: clip.data.title,
                    url: clip.data.url,
                    score: clip.data.score,
                    nbrComments: clip.data.num_comments,
                    commentLink: "https://www.reddit.com"+clip.data.permalink,
                    createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
                    /****************************************
                        ADDED ONE HOUR HERE FOR HEROKU
                    ****************************************/
                })
            }
          }
          console.log(new Date()+"\n"+newClips.length+" new clips : "+newClips)

          if(newClips.length){
            io.emit('new clips', newClips)       
            return Clip.create(newClips,()=>{ 
                console.log("Database updated!");
            })
          }

        }) 
        .catch( (err) => { return console.log("Update error : "+err)})
};


const job = new CronJob('*/1 * * * *',() => {
            update()
        }, () => {},
          false /* Don't Start the job right now */
    );
job.start()



/////////////////=====================  ROUTES  ===========================//////////////


// ENABLE CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/)
app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


app.get('/getClips', function(req, res) {
        
        Clip.find().sort({ "createdAt" : -1, "_id" : 1 }).limit(20)
            .then( (clips) => {
                if(clips) console.log("older clips fetched!")
                return res.send(clips)
            })

})