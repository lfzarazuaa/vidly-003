import lodash from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, selectedPage, onPageChanged } = props;
  const generatePages = () => {
    const addSelectedPage = (pageNumber) => {
      let classLink = "page-item";
      return pageNumber !== selectedPage ? classLink : classLink + " active";
    };
    const numberOfPages = itemsCount / pageSize || 0;
    return lodash.range(1, numberOfPages + 1).map((pageNumber) => (
      <li key={pageNumber} className={addSelectedPage(pageNumber)}>
        <button className="page-link" onClick={() => onPageChanged(pageNumber)}>
          {pageNumber}
        </button>
      </li>
    ));
  };
  return (
    <nav aria-label="Page navigation" className="container mt-4">
      <ul className="pagination row justify-content-center">
        <li className="page-item">
          <button className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {generatePages()}
        <li className="page-item">
          <button className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};

export default Pagination;
