const Book = require('../models/Books')
const addBooksService = async (payload) => {
    try {
        const book = await Book.find({ ISBN: payload.ISBN })
        if (book.length <= 0) {
            const newBook = await Book.create(payload);
            if (newBook) return { status: true, message: "Created Successfully", code: 200 };
            else return { status: false, message: "Something went wrong, Please try again later", code: 500 };
        }
        else {
            return { status: false, message: "Already exists with this ISBN", code: 409 };
        }
    } catch (err) {
        console.log(err)
        return { status: false, message: "Server Error" };
    }
}
const getAllBookService = async () => {
    try {
        const book = await Book.find()
        if (book.length > 0) {
            return { status: true, message: "Books Selected Successfully", book, code: 200 };
        }
        else {
            return { status: false, message: "Sorry no books found", code: 404 };
        }
    } catch (err) {
        console.log(err)
        return { status: false, message: "Server Error", code: 500 };
    }

}
const CheckedIn = async (id) => {
    try {
        const book = await Book.findById(id);
        console.log(book)
        if (!book) {
            return { status: false, message: "Sorry no books found", code: 404 };
        }
        if (!book.isCheckedOut) {
            return { status: false, message: "Book is not cheked out", code: 400 };
        }
        book.isCheckedOut = false;
        book.checkOutDate = null;
        book.returnDate = null;
        await book.save();
        return { status: true, message: "Checked In Successfully!", code: 200 };



    } catch (err) {
        console.log(err)
        return { status: false, message: "Server Error", code: 500 };
    }

}
const CheckedOut = async (payload, id) => {
    const { name, mobileNumber, nationalID } = payload;
    try {
        const book = await Book.findById(id);
        console.log(book)
        if (!book) {
            return { status: false, message: "Sorry no books found", code: 404 };
        }
        if (book.isCheckedOut) {
            return { status: false, message: "Sorry book is already cheked out", code: 400 };
        }
        const returnDate = new Date();
        const weekdaysToAdd = 15;
        let addedWeekdays = 0;
        while (addedWeekdays < weekdaysToAdd) {
            returnDate.setDate(returnDate.getDate() + 1);
            const dayOfWeek = returnDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                addedWeekdays++;
            }
        }
        book.isCheckedOut = true;
        book.checkOutDate = new Date();
        book.checkedOutBy = {
            name,
            mobileNumber,
            nationalID,
            date: book.checkOutDate
        };
        book.returnDate = returnDate;

        book.checkOutHistory.push({
            checkedOutBy: book.checkedOutBy,

        });

        await book.save();
        return { status: true, message: "Checked Out Successfully!", code: 200 };



    } catch (err) {
        console.log(err)
        return { status: false, message: "Server Error", code: 500 };
    }

}

module.exports = { addBooksService, getAllBookService, CheckedOut, CheckedIn }
