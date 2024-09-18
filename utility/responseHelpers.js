

const ResponseMessages = {
  200 : "Okay",
  404 : "Not found",
  400 : "Bad request",
  500 : "Server error"
};

const sendResponse = (res, code, custom_response=null) => {
  return res.status(code).send(custom_response || ResponseMessages[code]);
}

module.exports = {ResponseMessages, sendResponse}