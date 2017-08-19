const Hospital = require('../models/hospital'); // Import Hospital Model Schema
const User = require('../models/user');
const config = require('../config/database'); // Import database configuration
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = (router) => { 

    router.post('/login',(req,res) => {
        if(!req.body.username){
            res.json({ success:false , message:'No username provided'});
        } else {
            if(!req.body.password){
                res.json({ success:false , message:'No password provided'});
            } else {
                User.findOne({username:req.body.username} , (err,user) =>{
                    if(err){
                        res.json({ success:false , message:err});
                    } else {
                        if(!user){
                            res.json({ success:false , message:'Invalid Username'});
                        } else {
                            User.findOne({ password:req.body.password} , (err,user) => {
                                if(err) {
                                    res.json({ success:false , message:err});
                                } else {
                                    if(!user){
                                        res.json({ success:false , message:'Invalid Password'});
                                    } else {
                                        const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                                        res.json({ success:true , message:user , token:token , user: { username:user.username }});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
  router.use((req, res, next) => {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
      // Verify the token is valid
      jwt.verify(token, config.secret, (err, decoded) => {
        // Check if error is expired or invalid
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
        } else {
          req.decoded = decoded; // Create global variable to use in any request beyond
          next(); // Exit middleware
        }
      });
    }
  });

  /**Add new Hospital**/
  router.post('/addHospital',(req,res) => {
     console.log(req.body);
     if(!req.body.hospitalName){
        res.json({ success:false , message:'No hospital Name Provided'});
     } else {
         if(!req.body.hospitalEmail){
            res.json({ success:false , message:'No E-mail Id Provided'});
         } else {
            //  const hospital = new Hospital({
            //      hospitalName:req.body.hospitalName,
            //      hospitalEmail:req.body.hospitalEmail
            //  });
            const hospital = new Hospital();
            hospital.hospitalName = req.body.hospitalName;
            hospital.hospitalEmail = req.body.hospitalEmail;
             //hospital.hospitalName = 'Fixed Name';
             //console.log(req.body.hobbies.length);
             for(let i=0;i<req.body.hobbies.length;i++){
                 console.log(req.body.hobbies[i]);
                 hospital.hobby[i] = req.body.hobbies[i];
                //hospital.hobby[i].hobbyName = req.body.hobbies[i].hobby
             }

             hospital.save((err) => {
                if(err){
                    res.json({ success:false , message:err});
                } else {
                    res.json({ success:true , message:'Hospital saved!'});
                }
             });
         }
     }
  });

//Get all hospitals

router.get('/getHospitals',(req,res) => {
    Hospital.find({ } ,(err,data)=>{
        if(err) {
            res.json({ success:false , message:err});
        } else {
            res.json({ success:true , message:data});
        }
    });
});

//Get single Hospital
 router.get('/getSingleHospital/:id',(req,res) => {
        if(!req.params.id){
            res.json({ success:false , message:'No hospital id was provided!!'});
        } else {
            Hospital.findOne({ _id: req.params.id } , (err,hospital) => {
                if(err){
                    res.json({ success:false , message:'Not a valid hospital id!!'});
                } else {
                    if(!hospital){
                        res.json({ success:false , message: 'No hospital found'});
                    } else {
                        res.json({ success:true , message:hospital});
                    }
                }
            });
        }
    });

//Update hospital
router.put('/updateHospital',(req,res) => {
    //console.log(req.body);
    if(!req.body.newHospitalId){
        res.json({ success:false , message:'No Id was provided!'});
    } else {
        req.body.newHospitalId = mongoose.Types.ObjectId(req.body.newHospitalId);//Converting string type to ObjectId type
        Hospital.findOne({ _id:req.body.newHospitalId} , (err,hospital) =>{
            if(err){
                res.json({ success:false , message:'Not a valid hospital Id'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'Hospital Id was not found'});
                } else {
                    hospital.hospitalName = req.body.newHospitalName;
                    hospital.hospitalEmail = req.body.newHospitalEmail;
                    hospital.save((err) => {
                        if(err){
                            res.json({ success:false , message:err});
                        } else {
                            res.json({ success:true , message: 'Hospital Updated!'});
                        }
                    });
                }
            }
        });
    }
});

//Delete Hospital
router.delete('/deleteHospital/:id',(req,res)=>{
    if(!req.params.id){
        res.json({ success:false , message:'No Id was provided!'});
    } else {
        Hospital.findOne({ _id:req.params.id} , (err,hospital) => {
            if(err){
                res.json({ success:false , message:err});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital was found!'})
                } else {
                    hospital.remove((err) => {
                        if(err){
                            res.json({ success:false , message:err});
                        } else {
                            res.json({ success:true , message:'Hospital deleted'});
                        }
                    });
                }
            }
        });
    }
});

//Add Branch from select hospital
router.post('/addBranch',(req,res) => {
    if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital id provided'});
    } else {
        req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);//Converting string type to ObjectId type
        Hospital.findOne({ _id : req.body.hospitalId },(err,hospital) => {
            if(err){
                res.json({ success:false , message:'Something happened!'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital matches the id'})
                } else {
                    //Add Branch
                    hospital.branchDetails.push({
                        branchName:req.body.branchName,
                        branchEmail:req.body.branchEmail
                    });
                    //Increase branch count 
                    hospital.noOfBranches++;
                    hospital.hasBranch = 'Yes';
                    //Save hospital with Brranch
                    hospital.save((err) => {
                        if(err){
                            res.json({ success:false , message:'Something went wrong!'});
                        } else {
                            res.json({ success:true , message:'Branch Added'});
                        }
                    });
                }
            }
        });
    }
});

//Get Branches
router.get('/getBranches/:id',(req,res)=>{
    if(!req.params.id){
        res.json({ success:false , message:'No id provided'});
    } else {
        req.params.id = mongoose.Types.ObjectId(req.params.id);
        
        Hospital.findOne({_id : req.params.id} , (err,hospital) => {
            if(err){
                res.json({ success:false , message:'Not a valid Id'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital found'});
                } else {
                    res.json({ success:true , message:hospital.branchDetails});
                }
            }
        });
    }
});

router.post('/getSingleBranch',(req,res) =>{
    if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital Id provided'});
    } else {
        if(!req.body.newBranchId){
            res.json({ success:false , message:'No branch Id provided'});
        } else {
            req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);
            req.body.newBranchId = mongoose.Types.ObjectId(req.body.newBranchId);
            Hospital.findOne({_id:req.body.hospitalId} ,(err,hospital) =>{
                if(err){
                    res.json({ success:false , message:'Not a valid hospital Id'});
                } else {
                    if(!hospital){
                        res.json({ success:false , message:'No hospital found!'});
                    } else {
                        for(let i=0;i<hospital.branchDetails.length;i++){
                            if(req.body.newBranchId.equals(hospital.branchDetails[i]._id)){
                                res.json({ success:true , message:hospital.branchDetails[i]});
                            }
                        }
                    }
                }
            });
        }
    }
});

//Update Branch
router.put('/updateBranch',(req,res)=>{
    req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);
    req.body.newBranchId = mongoose.Types.ObjectId(req.body.newBranchId);
    
    if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital id provided'});
    } else {
        if(!req.body.newBranchId){
            res.json({ success:false , message:'No branch id provided'});
        } else {
            req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);
            req.body.newBranchId = mongoose.Types.ObjectId(req.body.newBranchId);
            Hospital.findOne({_id:req.body.hospitalId},(err,hospital) => {
                if(err){
                    res.json({ success:false , message:'Something went wrong!'});
                } else {
                    if(!hospital){
                        res.json({ success:false , message:'Invalid hospital Id'});
                    } else {
                        for(let i=0;i<hospital.branchDetails.length;i++){
                            if(req.body.newBranchId.equals(hospital.branchDetails[i]._id)){
                                hospital.branchDetails[i].branchName = req.body.newBranchName;
                                hospital.branchDetails[i].branchEmail = req.body.newBranchEmail;
                                hospital.save((err) => {
                                    if(err){
                                        res.json({ success:false , message:'Something went wrong!'});
                                    } else {
                                        res.json({ success:true , message:'Branch updated!'})
                                    }
                                });
                            }
                        }
                    }
                }
            });
        }
    }
});

//Delete Branch
router.post('/deleteBranch',(req,res)=>{
    if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital id provided!'});
    } else {
        if(!req.body.branchId){
            res.json({ success:false , message:'No branch Id provided!'});
        } else {
            req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);
            req.body.branchId = mongoose.Types.ObjectId(req.body.branchId);
            Hospital.findOne({ _id:req.body.hospitalId } , (err,hospital) =>{
                if(err){
                    res.json({ success:false , message:'Not a valid Hospital Id!'});
                } else {
                    if(!hospital){
                        res.json({ success:false , message:'No hospital found!'});
                    } else {
                        for(let i=0;i<hospital.branchDetails.length;i++){
                            if(req.body.branchId.equals(hospital.branchDetails[i]._id)){
                                hospital.branchDetails.splice(i,1);
                                hospital.noOfBranches--;
                                if(hospital.noOfBranches < 1){
                                    hospital.hasBranch = 'No';
                                }
                                hospital.save((err) =>{
                                    if(err){
                                        res.json({ success:false , message:err});
                                    } else {
                                        res.json({ success:true , message:'Branch deleted'});
                                    }
                                });
                            }
                        }
                    }
                }
            });
        }
    }
});

//toggleHospitalStatus
router.put('/updateHospitalStatus',(req,res)=>{
    if(!req.body._id){
        res.json({ success:false , message:'No id provided!'});
    } else {
        Hospital.findOne({ _id:req.body._id },(err,hospital) =>{
            if(err){
                res.json({ success:false , message:'Not a valid id!'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospitals found!'});
                } else {
                    if(hospital.active){
                        hospital.active = false;
                        hospital.statusText = 'Activate';
                    } else {
                        hospital.active = true;
                        hospital.statusText = 'Deactivate';
                    }
                    hospital.save((err) => {
                        if(err){
                            res.json({ success:false , message:'Something went wrong!'});
                        } else {
                            res.json({ success:true , message:'Status changed!'});
                        }
                    });
                }
            }
        });
    }
});

  return router;
}