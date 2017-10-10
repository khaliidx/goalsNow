<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="">HOME</router-link></li>
        <li><router-link to="">About</router-link></li>
        <li><a href="#">contact</a></li>
        <li><a href="#">login</a></li>
      </ul>
    </nav>

    <a href="\"><h1>GoalsNow</h1></a>

    <div id="description">
       <p> A Web App that streams all <b>goals</b> and <b>Clips</b> from the subreddit <a href="https://www.reddit.com/r/soccer"><em>/r/soccer</em></a></p>
       <p> Built using <b>nodeJS/ExpressJS</b> & <b>MongoDB</b> in the <sub>backend</sub> , <b>vueJS</b> in the <sup>frontend</sup><br>And <b>Socket.IO</b> for realtime updates from the <a href="https://www.reddit.com/dev/api/"><em>reddit API</em></a></p>
    </div>

    <router-view></router-view>

  </div>
</template>


<script>

export default {
  name: 'app',
}

</script>


<style>
  body{
    background-color: black;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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

  nav li{
    display: inline;
    padding-right: 50px;
  }

  #description {
    height: 150px;
    text-align: center;
  }

  #description em,#description b{
    color:#005580;
  }

</style>

