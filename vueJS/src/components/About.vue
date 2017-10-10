<template>

<div>

  <div class="right">
    <h2> Chat test</h2>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
  </div>

</div>

</template>

<script>

var socket = io("http://localhost:8000");

export default {

	data(){
		return{
			
		}
	},
	created () {
    
	    $(function () {
	      $('form').submit(function(){
	        socket.emit('chat message', $('#m').val());
	        $('#m').val('');
	        return false;
	      });
	      
	      socket.on('chat message', function(msg){
	        $('#messages').append($('<li>').text(msg));
	      });
	      socket.on('connected', function(msg){
	        $('#messages').append($('<li>').text(msg));
	      });
	    });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.right{ float:right; width : 40%; }
	form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
    #messages { list-style-type: none; margin: 0; padding: 0; }
    #messages li { padding: 5px 10px;display: block; }
    #messages li:nth-child(odd) { background: #eee; }


</style>
