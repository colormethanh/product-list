const createKey = () => {
  return Date.now() * Math.random() * 1000;
};

// Get rear pages for the pagination array
const getRearPageNumbers = (currentPage, maxVisiblePagesBehind) => {
  let visiblePagesBehind = maxVisiblePagesBehind;
  const previousPages = [];

  if (currentPage - 1 - maxVisiblePagesBehind < 0) {
    visiblePagesBehind =
      maxVisiblePagesBehind - Math.abs(currentPage - 1 - maxVisiblePagesBehind);
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
  let maxVisiblePagesBehind = Math.ceil(totalAvailablePages / 2);

  const previousPages = getRearPageNumbers(currentPage, maxVisiblePagesBehind);

  totalAvailablePages -= previousPages.length;

  const nextPages = getFrontPageNumbers(
    currentPage,
    maxPage,
    totalAvailablePages
  );

  // calc frame length
  const visiblePages = [...previousPages, currentPage, ...nextPages];

  console.log(visiblePages);

  return visiblePages;
};

module.exports = { createKey, calculatePaginationIndex };
