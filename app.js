const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loginRoutes =require("./routes/login")
const postRoutes =require("./routes/post")
const secret ="RestAPI"
const User= require('./modules/user')
var jwt = require('jsonwebtoken');

// Connect to MongoDB
mongoose.connect("mongodb://localhost/restapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/v1/posts', async(req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization;

        jwt.verify(token, secret,async function(err, decoded) {
            if(err){
                res.status(500).json({
                    status:'faild',
                    message:'Not Authenticated'
                })
            }
            
            const user = await User.findOne({_id: decoded.user});
            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'User not found'
                });
            }
            req.user=user._id;
            next();
          });
    }else{
        
        return  res.status(500).json({
            status:'faild',
            message:'Not Authenticated'
        })
    }
  })
// app.use("/api/v1/users", userRoutes);
app.use("/api/v1", loginRoutes);
app.use("/api/v1/posts",postRoutes)

// Error handling for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    status: "Failed",
    message: "API Not Found"
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
