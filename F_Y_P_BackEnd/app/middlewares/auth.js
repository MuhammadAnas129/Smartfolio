const jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports = (req, res, next) => {
  try {
    if(!req.headers.token){
      return(
        res.status(400).json(
          {
            message: "please provide JWT token , For this Go to authorization section in postman, select type=bearer token , Provide it there",
            status:false,
          }
        )
      )
     }

    if(!req.query.current_user_id){
      return (
        res.json({
          message: "please provide current_user_id for authorization purpose",
          status: false
        })
      )
    }


    else{
        const token = req.headers.token;
        if(!token){
          return(
            res.status(400).json({
              message: "Please provide jwt token in header",
              status:false
            })
          )
        }

        if(token){
          jwt.verify(token, process.env.TOKEN, (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'unauthorize' , status:false });
            }
            else if(decoded){
              if(decoded.id != req.query.current_user_id){
                return (
                  res.status(401).json({
                    message: "This user is un authorized",
                    status:false
                  })
                )
              }
              else{
                next()
              }
            }
          })
    }    
  }
  } catch {
    res.status(401).json({
      error: "invalid token"
    });
  }
};