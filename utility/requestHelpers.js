

const tryTo = (next, callback) => {
  try {
    callback();
  } catch (err) {
    next(err);
  }
};


module.exports = {tryTo}
