const AdminService = require('../services/adminServices');
const jwt = require('jsonwebtoken');
const config = require('config');


_this = this;

exports.createAdmin = async function (req, res, next) {

    const email = req.body.email;
    const Admin = await AdminService.getAdminByEmail(email);

    if(Admin && Admin._id){
        return res.status(200).json({status: 200, flag: false, message: "Admin already exists with that email address."})
    }else{
        try {
            // Calling the Service function with the new object from the Request Body
            const createdAdmin = await AdminService.createAdmin(req.body)
            return res.status(200).json({status:200, flag: true, data: createdAdmin, message: "Succesfully Created Admin"})
        } catch (e) {
            //Return an Error Response Message with Code and the Error Message.
            return res.status(200).json({status: 200, flag: false, message: "Admin Creation was Unsuccesful"})
        }
    }
    
}

exports.loginAdmin = async function (req, res, next){

    const Admin = {
        email: req.body.email,
        password: req.body.password,
    }
    
    let adminLogin = await AdminService.loginAdmin(Admin);
    
    const payload = {
        adminLogin: {
          id: adminLogin.id
        }
    };
    if(adminLogin)
    {
        jwt.sign(payload, 
            config.get('jwtSecret'),
            {expiresIn: 86400 },
            (err, token) => {
            if (err) throw err;
            return res.status(200).json({status: 200, flag: true, token: token, data:adminLogin, message: "Succesfully login"})
        }
    );
    }
    else
    {
        return res.status(200).json({status: 200, flag: false,  message: "Invalid username or password"})
    }

}

exports.getAdmins = async function(req, res, next) {

    const page=req.query.page ? req.query.page : 1;
    const limit=req.query.limit? req.query.limit : 100;

    try{
        const Admins=await AdminService.getAdmins({}, page, limit);
        //Returning all the admins in our database
        return res.status(200).json({status: 200, flag: true, data: Admins, message: "Succesfully Received All Admins"});
    }catch(error){
        return res.status(200).json({status: 200, flag: false, message: e.message});
    }

}

exports.removeAdmin = async function(req, res, next) {
    if(!req.params.id){
        res.json({msg: 'Id must be there'});
    }
    try{
        var deleted = await AdminService.deleteAdmin(req.params.id);
        res.status(200).send({status: 200, flag: true, data: deleted, message: "Succesfully Deleted... "});
    }catch(error){
        return res.status(200).json({status: 200, flag: false, message: error.message})
    }
}

exports.getAdmin = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    const id = req.params.id;
    try {
        const Admin = await AdminService.getAdmin(id)
        // Return the Admin
        return res.status(200).json({status: 200, flag: true, data: Admin, message: "Succesfully Received Admin"});
    } catch (e) {
        //Error in getting Admin.
        return res.status(200).json({status: 200, flag: false, message: e.message});
    }
}

exports.updateAdmin = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.params.id) {
        return res.status(200).json({status: 200, flag: false, message: "Id must be present"})
    }

    const id = req.params.id;
    const Admin = {
        id,
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }
    try {
        var updatedAdmin = await AdminService.updateAdmin(Admin)
        return res.status(200).json({status: 200, flag: true, data: updatedAdmin, message: "Succesfully Updated Admin"})
    } catch (e) {
        return res.status(200).json({status: 200, flag: false, message: e.message})
    }
}    