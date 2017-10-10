const app        = require('express')();
const mongoose = require('mongoose');
const Clip = require('./models/clip')
const request = require('request-promise');
const moment = require('moment')
const CronJob = require('cron').CronJob;
const _ = require('underscore')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;/////////// plug bluebird for better performance 


// CONNECT TO THE DATABASE AND START THE SERVER
// =============================================================================

let connectionString = 'mongodb://user1:pass@ds141284.mlab.com:41284/goalsnow';// RANDOM DATABASE FOR TESTING ONLY
//let connectionString = 'mongodb://localhost:27017';
const port = 8000
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
    let clips;

    console.log("\nChecking for updates...")

    Clip.find().sort({ "createdAt" : -1, "_id" : 1 }).limit(20)
        .then( (results) => {

            clips = results
            const options = {
                method: 'GET',
                uri: `https://reddit.com/r/soccer/new/.json?limit=20`
            };

            return request(options)
        })
        .then(response => {
          let parsedRes = JSON.parse(response)
          let allClips, finalClips = [], urls = ["youtube","youtu.be",".mp4","streamable","imgtc","gfycat"]

          // First filter : filter vids
          allClips = _.filter(parsedRes.data.children, (clip) => {
                return !urls.every( (url)=>{
                    return !clip.data.url.includes(url)
                })
          })

          // Second filter :  filter the new ones in the loop below
          for(let clip of allClips){
            if(!clips.some( (c)=>{ return (c.title == clip.data.title) }) ) {
                finalClips.unshift({
                    title: clip.data.title,
                    url: clip.data.url,
                    score: clip.data.score,
                    nbrConmments: clip.data.num_comments,
                    createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
                })
            }
          }
          console.log(new Date()+"\n"+finalClips.length+" new clips : "+finalClips)

          if(finalClips.length){
            io.emit('new clips', finalClips)       
            return Clip.create(finalClips,()=>{ 
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