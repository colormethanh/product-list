
const createKey = () => {
  return Date.now() * Math.random() * 1000
};

const calculatePaginationIndex = (currentPage, maxPage) => {
  if(currentPage + 5 > maxPage){
    return maxPage - currentPage !== 0 ? maxPage - currentPage : 1; 
  };
  return currentPage + 5;
}

module.exports = { createKey, calculatePaginationIndex };