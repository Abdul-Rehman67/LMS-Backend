const { response } = require("../dto/send.response");
const { addBooksService, getAllBookService, CheckedOut, CheckedIn } = require("../services/book");
const addBookController = async (req, res) => {
  try {

    let payload = req.body;
    let result = await addBooksService(payload);
    if (result) {
      return res.status(result.code).send(response(result.status, result.message, {}));
    } else {
      return res.status(result.code).send(response(result.status, result.message || "Something went wrong, Please try again later", {}));
    }
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(response(false, "Server Error!", {}));
  }
};
const getAllBookController = async (req, res) => {
  try {
    let result = await getAllBookService();
    if (result) {
      return res.status(result.code).send(response(result.status, result.message, result.find));
    } else {
      return res.status(result.code).send(response(result.status, result.message || "Something went wrong, Please try again later", {}));
    }
  }
  catch (e) {
    return res.send(response(false, "Server Error!", {}));
  }
};
const CheckOutController = async (req, res) => {
  try {
    const payload = req.body;
    const id = req.params.id;
    console.log(id)
    let result = await CheckedOut(payload, id);
    if (result) {
      return res.status(result.code).send(response(result.status, result.message, result.find));
    } else {
      return res.status(result.code).send(response(result.status, result.message || "Something went wrong, Please try again later", {}));
    }
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(response(false, "Server Error!", {}));
  }
};
const CheckInController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    let result = await CheckedIn(id);
    if (result) {
      return res.status(result.code).send(response(result.status, result.message, result.find));
    } else {
      return res.status(result.code).send(response(result.status, result.message || "Something went wrong, Please try again later", {}));
    }
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(response(false, "Server Error!", {}));
  }
};

module.exports = { addBookController, getAllBookController, CheckOutController, CheckInController }

