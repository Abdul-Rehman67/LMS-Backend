
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ISBN: { type: String, required: true },
    publishYear: { type: Number, required: true },
    coverPrice: { type: Number, required: true },
    isCheckedOut: { type: Boolean, default: false },
    checkOutDate: { type: Date },
    returnDate: { type: Date },
    checkedOutBy: {
        name: String,
        mobileNumber: String,
        nationalID: String,
        date: Date
    },
    checkOutHistory: [{
        checkedOutBy: {
            name: String,
            mobileNumber: String,
            nationalID: String,
            date: Date
        },
    }]
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;