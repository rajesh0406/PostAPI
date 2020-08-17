const http = require('http');
const { parse } = require('querystring');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const server = http.createServer((request, res) => {
    if (request.method === 'POST') {
        let body = [];
        request.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
         
          console.log(parse(body).fname);
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myobj =parse(body);
            dbo.collection("users").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
        });
        res.end("Updated details to the database");
        
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body style="background-color:whitesmoke">
      
       <center> <form action="" method="POST">
           <fieldset style="margin-left: 35%;margin-right: 35%" >
               <legend ><h1  style="font-family: 'Bebas Neue', cursive;color: #ff3300;letter-spacing: 1px;">User Details<img src="shield.svg" width="25px" height="25px" alt=""></h1></legend>
               <label>First Name</label>&nbsp &nbsp <input type="text"name="firstname" placeholder="First Name"><br><br>
               <label>Last Name</label>&nbsp &nbsp <input type="text" name="lastname"  placeholder="Last Name"><br><br>
               <label>Date of Birth</label>&nbsp &nbsp <input type="date" name="dob" placeholder="day/month/year"><br><br>
               <label>Mobile Number</label>&nbsp  <input type="number" name="phone_number"  placeholder="Mobile Number" maxlength="10"><br><br>
               <label>Email-Id</label>&nbsp&nbsp&nbsp&nbsp<input type="email" name="email"  placeholder="Email-Id"><br><br>
               
               <label>Gender</label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type="radio" name="gender" placeholder="Male">Male&nbsp&nbsp&nbsp&nbsp&nbsp
               <input type="radio" name="gender" placeholder="Female">Female<br><br>
               <label>Address</label>&nbsp &nbsp <textarea name="address" rows="3" cols="25" placeholder="Type Here"></textarea><br><br>
               <input type="submit" value="submit">


           
            </fieldset>
       </form></center>
    </body>
            </html>
        `);
    }
});
server.listen(3000);

