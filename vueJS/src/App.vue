<template>
  <div id="app">

    <a href="\" id="mainHeader"><h1>Goals<span style="color:#005580">Now</span></h1></a>

    <div id="description">
       <p> A Web App that streams all <b>goals</b> and <b>Clips</b> from the subreddit <a href="https://www.reddit.com/r/soccer"><em>/r/soccer</em></a></p>
       <p> Built using <b>nodeJS/ExpressJS</b> & <b>MongoDB</b> in the <sub>backend</sub> , <b>vueJS</b> in the <sup>frontend</sup><br>And <b>Socket.IO</b> for realtime updates from the <a href="https://www.reddit.com/dev/api/"><em>reddit API</em></a></p>
    </div>

    <router-view></router-view>

   <footer>Made by </strong><a href="https://github.com/khaliidx">Khalid Mouhcine</a> | 2017 GoalsNow.</footer>

  </div>
</template>


<script>

export default {
  name: 'app',
}

</script>


<style>

  body{
    height:auto;
    position:relative;
    margin: 0;
    padding-bottom: 6rem;
    background-color: black;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  #mainHeader h1{
    padding-top: 50px;
    font-size: 4em;
  }

    h1{
    text-align: center;
    font-size: 2em;
    margin-bottom: 60px;      
    font-weight: 200;
    color: #fff;
    margin-top: 0;
  }

  nav{
    color: white;
    text-transform: uppercase;
    font-weight: normal;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 20px;
  }

  nav a{
    color: #005580;
  }

  a{
    color: #999;
    font-size: 16px;
    text-decoration: none;
        -webkit-transition: color 0.2s ease;
    transition: color 0.2s ease;
  }

  a:hover{
    color: #fff;
  }


  #description {
    height: 150px;
    text-align: center;
  }

  #description em,#description b{
    color:#005580;
  }
  
  footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background-color: black;
    color: #fff;
    text-align: center;
}

  .Site {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

</style>

