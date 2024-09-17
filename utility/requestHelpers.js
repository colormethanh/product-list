

const tryTo = async (next, callback) => {
  try {
    await callback();
  } catch (err) {
    next(err);
  }
};


module.exports = {tryTo}
