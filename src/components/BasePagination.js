import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
/**
 * Pagination 
 * 
 * @param { Number } totalItemsCount
 * @param { Number } currentPageParam
 * @param { Number } pageRangeDisplayed
 * @param { Number } pageRangeDisplayed
 * @param { String } linkClass
 * @param { String } activeClass
 * @param { * } onChange
 * 
 * @returns {JSX}
 */
export default function BasePagination({
    totalItemsCount,
    currentPageParam,
    pageRangeDisplayed = 5,
    perPage = 10,
    linkClass = "page-link",
    activeClass = "active-link",
    onChange
}) {

    const [currentPage, setCurrentPage] = useState(currentPageParam);
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (totalItemsCount <= perPage) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [totalItemsCount, perPage])

    /**
     * Handel PageNumber Change 
     * 
     * @param { Number } pageNumber 
     *  
     */
    function handlePageChange(pageNumber) {
        /**
         * check if you are at the same page do nothing 
         */
        if (pageNumber === currentPage) return;
        setCurrentPage(pageNumber);
        onChange(pageNumber);
    }

    return show ?
        (<div className="pagination-wrapper d-flex justify-content-center">
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={perPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                linkClass={linkClass}
                activeClass={activeClass}
                disabledClass="disabled-link"
                onChange={handlePageChange}
            />
        </div>
        ) : []


}