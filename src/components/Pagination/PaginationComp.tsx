import { Pagination, Stack } from "@mui/material";
import React from "react";

const PER_PAGE = 6;

type Type = {
    pageCount: number;
    onChange: (page: number, pageSize: number) => void;
}
const PaginationComp: React.FC<Type> = ({
    pageCount = 0,
    onChange
}) => {
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        onChange(value, PER_PAGE);
    };

    return (
        <Stack spacing={2}>
            <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Stack>
    );
}

export default PaginationComp;