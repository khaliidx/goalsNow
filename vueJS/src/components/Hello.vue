<template>
<div>

  <!-- <div class="left"> -->
      <button class="btn" v-on:click="showClips()">Older clips</button>
      <div class="loading" v-if="loading" style="text-align: center">
        <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style="margin-top: 10px;color:white"></i><em> listening...</em>
      </div>
  
      <div v-if="error" class="error">
        {{ error }}
      </div>

      <ul class="list"></ul>

  <!-- </div> -->
</div>

</template>

<script>


import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

Vue.use(VueAxios, axios)
var socket = io("https://goalsnow-backend.herokuapp.com/");//http://localhost:8000/


export default {
  
  data() {
    return{
      clips: [],
      loading: true,
      clipsFetched: null,
      error: null
    }
  },
  methods: {
    
    timeAgo(date){
       let minutes = moment.duration(moment().diff(moment(date))).asMinutes()

       if(minutes>59){
         let hours = moment.duration(moment().diff(moment(date))).asHours();
         
         if(hours>23){
           let days = moment.duration(moment().diff(moment(date))).asDays();
           return Math.floor(days)+" days ago";
        } 
         return Math.floor(hours)+" hours ago";
       } 
       if(minutes==-1) minutes=0;// sometimes moment.duration returns -1 NEEDS BETTER FIX
       return Math.floor(minutes)+" minutes ago";
    },

    showClips(){
      Vue.axios.get('https://goalsnow-backend.herokuapp.com/getClips')//http://localhost:8000/getClips
        .then(response=>{

          $('.list').empty();
          for(let clip of response.data){
              $('.list').append('<li><a target="_blank" href="'+clip.url+'">'+clip.title+
                '</a><br><span class="time">Posted '+this.timeAgo(clip.createdAt)+
                '</span> | <a target="_blank" class="comments" href="'+clip.commentLink+'">'+clip.nbrComments+' Comments</a></li>');
          }
        })
        .catch( e => { this.error = e.toString();console.log(e) })
    }
  },

  created() {
    let self = this
    $(function () {
      socket.on('new clips', c =>{
        for(let clip of c){
            $('.list').prepend('<li><a target="_blank" href="'+clip.url+'">'+clip.title+
                '</a><br><span class="time">Posted '+self.timeAgo(clip.createdAt)+
                '</span> | <a target="_blank" class="comments" href="'+clip.commentLink+'">'+clip.nbrComments+' Comments</a></li>');
        }
      })
    })
  },
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
    .left{  
      width: 70%;
      float: left;
    }

    .right{
      width: 30%;
      float: right;
    }

    .list {
      height: 100%;
      list-style: none;
      width:90%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .list >>> li{
      padding: 14px 15px;
    }
    .list >>> li:nth-child(odd) { background: #00334d; }/*#555*/

    .list >>> .time {
      font-size :.75em;
      padding-left: 10px;
    }
    .list >>> .comments {
      font-size :.75em;
      color: #fff;
      text-decoration: none;
        -webkit-transition: color 0.2s ease;
      transition: color 0.2s ease;
    }
    .list >>> .comments:hover{
      color:#999;
    }


    .btn {
      left:45%;
      position: relative;
      -webkit-border-radius: 6;
      -moz-border-radius: 6;
      border-radius: 6px;
      color: #ffffff;
      font-size: 20px;
      background: #005580;
      padding: 6px 20px 6px 20px;
      text-decoration: none;
    }

    .btn:hover {
      background: #3cb0fd;
      background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
      background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
      background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
      background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
      background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
      text-decoration: none;
    }


</style>