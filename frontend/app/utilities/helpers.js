const createKey = () => {
  return Date.now() * Math.random() * 1000;
};

// Get rear pages for the pagination array
const getRearPageNumbers = (currentPage, maxPageCount) => {
  let visiblePagesBehind = maxPageCount;
  const previousPages = [];

  if (currentPage - 1 - maxPageCount < 0) {
    visiblePagesBehind =
      maxPageCount - Math.abs(currentPage - 1 - maxPageCount);
  }

  if (visiblePagesBehind === 0) return previousPages;

  for (let i = visiblePagesBehind; i > 0; i--)
    previousPages.push(currentPage - i);

  return previousPages;
};

// Get front numbers for pagination array
const getFrontPageNumbers = (currentPage, maxPage, visiblePagesAhead) => {
  const nextPages = [];
  const pagesToLastPage = maxPage - currentPage;
  const pagesForward =
    pagesToLastPage < visiblePagesAhead ? pagesToLastPage : visiblePagesAhead;

  for (let i = 1; i <= pagesForward; i++) nextPages.push(i + currentPage);

  return nextPages;
};

const calculatePaginationIndex = (currentPage, maxPage, pagesToShow = 5) => {
  let totalAvailablePages = pagesToShow - 1;
  let maxPageCount = Math.ceil(totalAvailablePages / 2);
  let previousPages = [];
  let nextPages = [];

  // if current page is near end calculate front pages first
  if (maxPageCount + currentPage > maxPage) {
    nextPages = getFrontPageNumbers(currentPage, maxPage, totalAvailablePages);
    totalAvailablePages -= nextPages.length;
    previousPages = getRearPageNumbers(currentPage, totalAvailablePages);
  } else {
    previousPages = getRearPageNumbers(currentPage, maxPageCount);
    totalAvailablePages -= previousPages.length;
    nextPages = getFrontPageNumbers(currentPage, maxPage, totalAvailablePages);
  }

  const visiblePages = [...previousPages, currentPage, ...nextPages];

  return visiblePages;
};

module.exports = { createKey, calculatePaginationIndex };
