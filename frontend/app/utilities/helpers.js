
const createKey = () => {
  return Date.now() * Math.random() * 1000
};

module.exports = { createKey };