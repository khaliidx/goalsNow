<template>
<div>

  <div class="left">
      <button v-on:click="showClips()" style="left:45%;position: relative;">Older clips</button>
      <div class="loading" v-if="loading" style="text-align: center">
        <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style="margin-top: 10px;color:white"></i><em> listening...</em>
      </div>
  
      <div v-if="error" class="error">
        {{ error }}
      </div>

      <ul class="list"></ul>

  </div>

</div>
</template>

<script>


import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
var socket = io("https://node3-dbhvmzvgfk.now.sh");//http://localhost:8000


export default {
  
  data() {
    return{
      clips: [],
      loading: true,
      clipsFetched: null,
      error: null
    }
  },
  created() {

    $(function () {
      socket.on('new clips', c =>{
        for(let clip of c){
          $('.list').prepend('<li><a href="'+clip.url+'">'+clip.title+'</a></li>');
        }
      })
    })
  },

  methods: {
    
    showClips(){
      Vue.axios.get('https://node3-dbhvmzvgfk.now.sh/getClips')//http://localhost:8000/getClips
        .then(response=>{

          $('.list').empty();
          for(let clip of response.data){
            $('.list').append('<li><a target="_blank" href="'+clip.url+'">'+clip.title+'</a></li>');
          }
        })
        .catch(function(e){ this.error = err.toString();console.log(e) })
    },
  }
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
      list-style: none;
      width:90%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .list >>> li{
      padding: 10px 15px;
    }
    .list >>> li:nth-child(odd) { background: #00334d; }/*#555*/
    
</style>