import PropTypes from "prop-types";

const Pagination = ({ dataPerPage, totalData, currentPage, paginate }) => {
    const totalPages = Math.ceil(totalData / dataPerPage);
    const pageNumbers = [];

    // Include previous page if it exists
    if (currentPage > 1) {
        pageNumbers.push(currentPage - 1); // Previous page
    }

    // Include current page
    pageNumbers.push(currentPage);

    // Include next page if it exists
    if (currentPage < totalPages) {
        pageNumbers.push(currentPage + 1); // Next page
    }

    // Always include last page if it's not already in the list
    if (!pageNumbers.includes(totalPages) && totalPages > 1) {
        pageNumbers.push(totalPages); // Last page
    }

    return (
        <nav className="flex justify-center mt-4 items-center gap-4">
            <ul className="flex justify-center flex-wrap">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`mx-1 py-1 px-2 ${
                            number === currentPage
                                ? "bg-indigo-500 text-white"
                                : "bg-slate-200 hover:bg-slate-300 dark:text-[#40403f]"
                        } rounded-[5px] hover:cursor-pointer`}
                    >
                        <a onClick={() => paginate(number)}>{number}</a>
                    </li>
                ))}
            </ul>
            <div className="text-center">
                {/* Display format: current page / total pages */}
                <span className="text-md font-medium">
                    {`(${currentPage} / ${totalPages})`}
                </span>
            </div>
        </nav>
    );
};

Pagination.propTypes = {
    dataPerPage: PropTypes.number.isRequired,
    totalData: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
};

export default Pagination;
