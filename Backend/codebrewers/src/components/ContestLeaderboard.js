// src/ContestLeaderboard.js
import React, { useState } from 'react';
import '../App.css';

const ContestLeaderboard = ({ leaderboard = [
    { name: 'Alice', score: 1500 },
    { name: 'Bob', score: 1200 },
    { name: 'Charlie', score: 1000 },
    { name: 'Dave', score: 1300 },
    { name: 'Eve', score: 1700 },
    { name: 'Frank', score: 900 },
    { name: 'Grace', score: 800 },
    { name: 'Hank', score: 700 },
    { name: 'Ivy', score: 600 },
    { name: 'Jack', score: 500 },
    { name: 'Karen', score: 1100 },
    { name: 'Liam', score: 1400 },
    { name: 'Mia', score: 1600 }
] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    // Sort the leaderboard based on score in descending order
    const sortedLeaderboard = leaderboard
        .sort((a, b) => b.score - a.score)
        .map((entry, index) => ({
            ...entry,
            rank: index + 1 // Assign rank based on sorted position
        }));

    const totalPages = Math.ceil(sortedLeaderboard.length / entriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = sortedLeaderboard.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageDisplay = 5;
        const halfRange = Math.floor(maxPageDisplay / 2);

        let startPage = Math.max(1, currentPage - halfRange);
        let endPage = Math.min(totalPages, currentPage + halfRange);

        if (endPage - startPage < maxPageDisplay - 1) {
            startPage = Math.max(1, endPage - maxPageDisplay + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="leaderboard">
            <h3>Leaderboard</h3>
            {currentEntries.length > 0 ? (
                <ul>
                    {currentEntries.map((entry, index) => (
                        <li
                            key={index}
                            className={`leaderboard-entry ${index === 0 && currentPage === 1 ? 'top-rank' : ''}`}
                        >
                            <span>
                                {entry.rank}. <i className="fas fa-user-circle profile-icon"></i> {/* Profile icon */}
                                {entry.name}
                            </span>
                            <span>{entry.score} pts</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data available.</p>
            )}

            {/* Enhanced Pagination Controls */}
            <div className="pagination">
                <button onClick={goToFirstPage} disabled={currentPage === 1}>
                    &laquo; First
                </button>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    &lsaquo; Prev
                </button>

                {currentPage > 3 && (
                    <>
                        <button onClick={() => paginate(1)}>1</button>
                        {currentPage > 4 && <span>...</span>}
                    </>
                )}

                {renderPageNumbers()}

                {currentPage < totalPages - 2 && (
                    <>
                        {currentPage < totalPages - 3 && <span>...</span>}
                        <button onClick={() => paginate(totalPages)}>{totalPages}</button>
                    </>
                )}

                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next &rsaquo;
                </button>
                <button onClick={goToLastPage} disabled={currentPage === totalPages}>
                    Last &raquo;
                </button>
            </div>
        </div>
    );
};

export default ContestLeaderboard;