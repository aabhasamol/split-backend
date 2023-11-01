const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const AdminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true } );

AdminSchema.plugin(mongoosePaginate);

module.exports = Admin = mongoose.model('admin', AdminSchema);