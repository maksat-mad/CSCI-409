import React, {useState} from 'react';
import {getPagesArray} from "../../utils/pages";
import './Pagination.css';

const Pagination = ({totalPages, page, changePage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const pagesArray = getPagesArray(totalPages);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = pagesArray.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    return (
        <div className="page__wrapper">
            <button
                onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                className={'page'}
            >	&#60;
                </button>
            {paginatedItems.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}
                >{p}
                </span>
            )}
            <button
                onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                className={'page'}
            >	&#62;
                </button>
        </div>
    );
};

export default Pagination;