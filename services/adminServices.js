const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAdminByEmail = async function(email){

    try {
        // Find the User 
        const _details = await Admin.findOne({
            email: email
        });
        return _details;
    } catch (e) {
        // return a Error message describing the reason     
        console.log(e);
        throw Error("User not available");
    }
}

exports.createAdmin = async function (user) {

    const salt = await bcrypt.genSalt(10);
    
    user.password = bcrypt.hashSync(user.password, salt);
    
    const newAdmin = new Admin({
        name: user.name,
        email: user.email,
        password: user.password,
    })

    try {
        // Saving the Admin 
        const savedAdmin = await newAdmin.save();
        return savedAdmin;
    } catch (e) {
        // return a Error message describing the reason     
        console.log(e);
        throw Error("Error while Creating Admin")
    }
}

exports.loginAdmin = async function(admin){
    try{

        let adminUser = await Admin.findOne({ email: admin.email });
        if (!adminUser) {
            throw Error('Invalid email');
        }

        const isMatch = await bcrypt.compare(admin.password, adminUser.password);
        if (!isMatch) {
            return false;
        }

        const salt = await bcrypt.genSalt(10);

        adminUser.password = await bcrypt.hash(admin.password, salt);
        
        await adminUser.save();

        return adminUser;

    }catch(error){
        console.log(error);
        throw Error("Error while Login Admin")
    }
}

exports.getAdmins = async function (query, page, limit) {

    //For pagination
    const options = {
        page,
        limit
    }

    try{
        const Admins = await Admin.paginate(query, options);
        return Admins;

    }catch(error){
        console.log(error);
        throw Error('Error while Paginating Admins');
    }
}

exports.deleteAdmin = async function (id){
    try{
        
        const deleted = await Admin.findOneAndRemove({ _id: id });
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Admin Could not be deleted")
        }
        return deleted;

    }catch(error){
        
        console.log(error);
        throw Error("Error occured while deleting the admin");
    
    }
}

exports.getAdmin = async function (id) {
    try {
        // Find the Admin 
        const admin = await Admin.findOne({
            _id: id
        });
        if(admin._id){
            return admin;
        }else{
            throw Error("Admin not available");
        }    
    } catch (e) {
        console.log(e);// return a Error message describing the reason     
        throw Error("Admin not available");
    }
}

exports.updateAdmin = async function (user) {

    try {
        var oldAdmin = await Admin.findOne({
            _id: user.id
        });
    } catch (e) {

        console.log(e);
        throw Error("Error occured while Finding the Admin")
    }
    //Edit the Admin Object
    if (!oldAdmin) {
        return false;
    }

    oldAdmin.name = user.name ? user.name : oldAdmin.name
    oldAdmin.email = user.email ? user.email : oldAdmin.email

    if(user.password){
        oldAdmin.password = bcrypt.hashSync(user.password, 10);
    } 

    try{
        const savedAdmin = await oldAdmin.save()
        return savedAdmin;
    } catch (e) {
        console.log(e);
        throw Error("An Error occured while updating the Admin");
    }
}