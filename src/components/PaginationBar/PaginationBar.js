import React from "react";

const PaginationBar = ({ currentPage, totalPage, onPageChange }) => {

  //-------------Prepare----------------//
  const pagesShow = 5;
  let startPage = 1;
  let endPage = totalPage;

  if (totalPage > pagesShow) {
    startPage = currentPage - Math.floor(pagesShow / 2);
    endPage = currentPage + Math.floor(pagesShow / 2);

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPage) {
      startPage -= endPage - totalPage;
      endPage = totalPage;
      if (startPage < 1) startPage = 1; // reset to 1 if it goes below
    }
  }
  //-------------End pPrepare----------------//

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination-bar">
        {currentPage > 1 && (
          <>
            <li>
              <button
                className="page-link"
                onClick={() => onPageChange(1)}
              >
                First
              </button>
            </li>
            <li>
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
              >
                Prev
              </button>
            </li>
          </>
        )}

        {startPage > 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item`}
          >
            <button
              className={`page-link ${currentPage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {endPage < totalPage && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {currentPage < totalPage && (
          <>
            <li>
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
            <li>
              <button
                className="page-link"
                onClick={() => onPageChange(totalPage)}
              >
                Last
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default PaginationBar;