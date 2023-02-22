import React, {useState} from 'react';
import {getPagesArray} from "../../utils/pages";
import './Pagination.css';

const Pagination = ({totalPages, page, changePage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const pagesArray = getPagesArray(totalPages);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = pagesArray.slice(startIndex, startIndex + itemsPerPage);

    const handleLeftButtonPress = () => {
        if (page === 1) {
            return;
        }
        if ((currentPage - 1) * itemsPerPage === page - 1) {
            setCurrentPage(currentPage - 1);
        }
        changePage(page - 1);
    }

    const handleRightButtonPress = () => {
        if (page === totalPages) {
            return;
        }
        if (currentPage * itemsPerPage < page + 1) {
            setCurrentPage(currentPage + 1);
        }
        changePage(page + 1);
    }

    const handleLeftDotPress = () => {
        changePage((currentPage - 1) * itemsPerPage);
        setCurrentPage(currentPage - 1);
    }

    const handleRightDotPress = () => {
        changePage(currentPage * itemsPerPage + 1);
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="page__wrapper">
            <button
                onClick={handleLeftButtonPress} disabled={page === 1}
                className={'page'}
            >	&#60;
                </button>
            {currentPage > 1 &&
                <button
                    onClick={handleLeftDotPress}
                    className={'page'}
                >	...
                </button>
            }
            {paginatedItems.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}
                >{p}
                </span>
            )}
            {page + itemsPerPage <= totalPages &&
                <button
                    onClick={handleRightDotPress}
                    className={'page'}
                >	...
                </button>
            }
            <button
                onClick={handleRightButtonPress} disabled={page === totalPages}
                className={'page'}
            >	&#62;
                </button>
        </div>
    );
};

export default Pagination;