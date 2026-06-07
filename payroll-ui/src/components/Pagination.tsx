import "./Pagination.css";

interface Props {
    pageNumber: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    pageNumber,
    totalPages,
    onPageChange
}: Props) {
    if (
        totalPages <= 1 ||
        pageNumber < 1 ||
        pageNumber > totalPages
    ) {
        return null;
    }

    return (
        <div className="pagination">

            <button
                disabled={pageNumber === 1}
                onClick={() =>
                    onPageChange(pageNumber - 1)
                }
            >
                Previous
            </button>

            <span>
                Page {pageNumber} of {totalPages}
            </span>

            <button
                disabled={pageNumber === totalPages}
                onClick={() =>
                    onPageChange(pageNumber + 1)
                }
            >
                Next
            </button>

        </div>
    );
}