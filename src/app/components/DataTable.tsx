"use client";
/* eslint-disable */

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Avatar from "@mui/material/Avatar";
import TableHead from "@mui/material/TableHead";
import { AiOutlineDownload } from "react-icons/ai";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

interface DataTableProps {
    columns: { id: string; label: string; align: "left" | "center" | "right" }[]; // Define columns with id, label, and alignment
    rows: any[]; // The data rows (can be of any shape)
}

export default function DataTable({ columns, rows }: DataTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={columns.length} sx={{ padding: 0 }}>
                            <div className="flex justify-between items-center px-4 py-4 bg-white">
                                <h1 className="text-gray-700 font-semibold text-xl">Pagination Table</h1>
                                <AiOutlineDownload className="text-2xl text-gray-700 cursor-pointer" />
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id} align={column.align} sx={{ fontWeight: "bold" }}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align}>
                                    {column.id === "user" ? (
                                        // Display avatar and user name for the "user" column
                                        <Box display="flex" alignItems="center">
                                            <Avatar sx={{ mr: 2 }}>
                                                {row.user.charAt(0)} {/* Show first letter of user name */}
                                            </Avatar>
                                            {row.user}
                                        </Box>
                                    ) : column.id === "users" ? (
                                        // Display avatars for the "users" column (using emojis here)
                                        <Box display="flex" alignItems="center" justifyContent={"center"}>
                                            {row.users.split(' ').map((userEmoji: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                                                <Avatar key={index} sx={{ mr: 1 }}>
                                                    {userEmoji} {/* Render the emoji as avatar */}
                                                </Avatar>
                                            ))}
                                        </Box>
                                    ) : column.id === "status" ? (
                                        <div
                                            className={`w-24 m-auto px-3 py-1 text-sm font-medium rounded ${row.status === "active"
                                                ? "bg-green-100 text-green-600 border border-green-500"
                                                : row.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-600 border border-yellow-500"
                                                    : "bg-red-100 text-red-600 border border-red-500"
                                                }`}
                                        >
                                            {row[column.id]}
                                        </div>
                                    ) : (
                                        row[column.id]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={columns.length} />
                        </TableRow>
                    )}
                </TableBody>


                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columns.length}>
                            <div className="flex justify-between items-center px-4 py-1">
                                {/* Left controls */}
                                <div className="flex items-center gap-4">
                                    <button
                                        className="bg-cyan-500 text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-cyan-600"
                                        onClick={() => console.log("Force Rerender clicked")}
                                    >
                                        Force Rerender
                                    </button>
                                    <span className="text-sm text-gray-700">{rows.length} Rows</span>
                                </div>

                                {/* Right pagination controls */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700">
                                        Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
                                    </span>

                                    {/* Page input */}
                                    <span className="flex items-center gap-2">
                                        <span className="text-sm text-gray-700">Go to page:</span>
                                        <input
                                            type="number"
                                            min={1}
                                            max={Math.ceil(rows.length / rowsPerPage)}
                                            value={page + 1}
                                            onChange={(e) => {
                                                const pageNumber = Math.max(0, Math.min(Math.ceil(rows.length / rowsPerPage) - 1, Number(e.target.value) - 1));
                                                setPage(pageNumber);
                                            }}
                                            className="w-16 px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md"
                                        />
                                    </span>

                                    {/* Rows per page */}
                                    <select
                                        value={rowsPerPage}
                                        onChange={(e) => {
                                            setRowsPerPage(parseInt(e.target.value, 10));
                                            setPage(0);
                                        }}
                                        className="px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md"
                                    >
                                        {[5, 10, 25].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Pagination buttons */}
                                    <button
                                        className="px-1 py-1 text-2xl text-gray-500 hover:text-gray-700 disabled:text-gray-300"
                                        onClick={(event) => handleChangePage(event, 0)}
                                        disabled={page === 0}
                                    >
                                        «
                                    </button>
                                    <button
                                        className="px-1 py-1 text-2xl text-gray-500 hover:text-gray-700 disabled:text-gray-300"
                                        onClick={(event) => handleChangePage(event, page - 1)}
                                        disabled={page === 0}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        className="px-1 py-1 text-2xl text-gray-500 hover:text-gray-700 disabled:text-gray-300"
                                        onClick={(event) => handleChangePage(event, page + 1)}
                                        disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                                    >
                                        ›
                                    </button>
                                    <button
                                        className="px-1 py-1 text-2xl text-gray-500 hover:text-gray-700 disabled:text-gray-300"
                                        onClick={(event) => handleChangePage(event, Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1))}
                                        disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                                    >
                                        »
                                    </button>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
