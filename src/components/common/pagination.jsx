import lodash from "lodash";

const Pagination = (props) => {
    const generatePages = () => {
        const { numberOfPages, selectedPage, onClickPage } = props;
        const addEnable = (pageNumber) => { 
            let classLink = "page-item ";
            if (pageNumber!==selectedPage) return classLink
            return classLink + "active"
        }
        return lodash.range(1, numberOfPages + 1).map(pageNumber=>(
                <li key={pageNumber} className={addEnable(pageNumber)}>
                        <button className="page-link"
                                onClick={()=>onClickPage(pageNumber)} >
                            {pageNumber}
                        </button>
                </li>
        ))
    }
    return ( 
    <nav aria-label="Page navigation">
        <ul className="pagination">
            <li className="page-item">
            <button className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
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
}

export default Pagination;