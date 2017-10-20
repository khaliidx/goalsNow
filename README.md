# goalsNow
A web app that streams goals and clips from the subreddit _"r/soccer"_ built using **expressJS/Socket.IO**, **MongoDB** and **vueJS**.

## Live demo

https://goalsnow-kzpprzijzg.now.sh/#/

### The backend
I used **NodeJS/ExpressJS** and **Socket.IO** for realtime updates from the database(**MongoDB**), and one HTTP endpoint for fetching the last 20 clips from the databases.

Other packages	used :  
  * **cron** for scheduling database updates from the reddit API  
  * **moment.js** for formatting dates  
  * **underscore.js** for managing arrays  

### The frontend
For the frontend I used *vueJS* with *axios* to send a GET request to my endpoint in the backend.


