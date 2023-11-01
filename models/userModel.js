const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    country_code: {
        type: String,
        required: true,
    },
    mobile : {
        type : String,
        required : true,
        unique: true,
    },
    username:{
        type: String,
        required : true,
        unique : true,
    },
    password:{
        type: String,
        required: true,
    },
    friends:{
        type: [String],
    },
    groups: {
        type: [String],
    },
    fcm_token: {
        type: String,
    },
    auth_token:{
        type: String,
    }
}, { timestamps: true } );

UserSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model('user', UserSchema);