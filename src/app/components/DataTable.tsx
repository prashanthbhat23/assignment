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
import Avatar from "@mui/material/Avatar";
import TableHead from "@mui/material/TableHead";
import { AiOutlineDownload } from "react-icons/ai";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { GrFormView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";

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
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
                {theme.direction === "rtl" ? <FirstPageIcon /> : <KeyboardArrowLeft />}
            </IconButton>
        </Box>
    );
}

interface DataTableProps {
    columns: { id: string; label: string; align: "left" | "center" | "right" }[];
    rows: any[];
    selectable: boolean; // Add the selectable prop
}

export default function DataTable({ columns, rows, selectable }: DataTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
    const [selectAll, setSelectAll] = React.useState(false);

    const randomAvatarUrl = `https://avatars.dicebear.com/api/personas/${Math.random()}.svg`;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectRow = (rowIndex: number) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(rowIndex)) {
            newSelectedRows.delete(rowIndex);
        } else {
            newSelectedRows.add(rowIndex);
        }
        setSelectedRows(newSelectedRows);
    };

    const handleSelectAllRows = () => {
        if (selectAll) {
            setSelectedRows(new Set());
        } else {
            const allRows = new Set<number>();
            rows.forEach((_, index) => allRows.add(index));
            setSelectedRows(allRows);
        }
        setSelectAll(!selectAll);
    };

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={columns.length + 1} sx={{ padding: 0, width: "100%" }}>
                            <div className="flex justify-between items-center px-4 py-4 bg-white">
                                <h1 className="text-gray-700 font-semibold text-xl">Pagination Table</h1>
                                <AiOutlineDownload className="text-2xl text-gray-700 cursor-pointer" />
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {selectable && (
                            <TableCell padding="checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllRows}
                                    style={{ padding: '5px', marginLeft: '20px' }}
                                    className="text-cyan-500 bg-cyan-500"
                                />
                            </TableCell>
                        )}
                        {columns.map((column) => (
                            <TableCell key={column.id} align={column.align} sx={{ fontWeight: "bold" }}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {selectable && (
                                <TableCell padding="checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.has(rowIndex)}
                                        onChange={() => handleSelectRow(rowIndex)}
                                        style={{ padding: '5px', marginLeft: '20px' }}
                                        className="text-cyan-500 bg-cyan-500"
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align}>
                                    {column.id === "user" ? (
                                        <Box display="flex" alignItems="center">
                                            <Image
                                                key={rowIndex}
                                                src={require(`../assets/images/${row.icon}.png`)}
                                                alt={row.icon}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            {row.user}
                                        </Box>
                                    ) : column.id === "users" ? (
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            {row.users.split(" ").map((photoName: string, index: number) => (
                                                <Image key={index} src={require(`../assets/images/${photoName}.png`)} alt={photoName} className="h-8 w-8 rounded-full" />
                                            ))}
                                        </Box>
                                    ) : column.id === "status" ? (
                                        <div
                                            className={`w-24 m-auto px-3 py-1 text-sm font-medium rounded-full ${(() => {
                                                const status = row.status.toLowerCase();
                                                if (status === "active") {
                                                    return "bg-green-100 text-green-600 border border-green-500";
                                                } else if (status === "pending") {
                                                    return "bg-yellow-100 text-yellow-600 border border-yellow-500";
                                                } else if (status === "cancel") {
                                                    return "bg-red-100 text-red-600 border border-red-500";
                                                } else if (status === "shipped") {
                                                    return "bg-blue-100 text-blue-600 border border-blue-500";
                                                } else if (status === "delivered") {
                                                    return "bg-purple-100 text-purple-600 border border-purple-500";
                                                } else {
                                                    return "bg-gray-100 text-gray-600 border border-gray-500";
                                                }
                                            })()}`}
                                        >
                                            {row[column.id]}
                                        </div>

                                    ) : column.id === "action" ? (
                                        <Box key={column.id} display="flex" alignItems="center" justifyContent="center">
                                            {row.action.split(" ").map((item: string, index: number) => {
                                                if (item === "edit") {
                                                    return (
                                                        <div key={item} className="text-green-500 px-1 text-xl cursor-pointer">
                                                            <TbEdit  />
                                                        </div>
                                                    );
                                                }
                                                else if (item === "view") {
                                                    return (
                                                        <div key={item} className="text-blue-500 px-1 text-xl cursor-pointer">
                                                            <GrFormView  />
                                                        </div>
                                                    );
                                                }
                                                else if (item === "delete") {
                                                    return (
                                                        <div key={item} className="text-red-500 px-1 text-xl cursor-pointer">
                                                            <RiDeleteBinLine  />
                                                        </div>
                                                    );
                                                }
                                            }
                                            )}
                                        </Box>
                                    )
                                        : (
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
                                <div className="flex items-center gap-4">
                                    <button
                                        className="bg-cyan-500 text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-cyan-600"
                                        onClick={() => console.log("Force Rerender clicked")}
                                    >
                                        Force Rerender
                                    </button>
                                    <span className="text-sm text-gray-700">{rows.length} Rows</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700">
                                        Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
                                    </span>

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