import { FormControl, Button, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { SearchParamsI, useFacilityContext } from '../../contexts/FacilityContext';
const SearchFilter: React.FC = () => {
    const { fetchFacilities } = useFacilityContext();
    const [searchParams, setSearchParams] = React.useState<SearchParamsI>({searchKey: ""} as SearchParamsI);
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("search fitler", searchParams);
        e.preventDefault();
        fetchFacilities(1, searchParams);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof SearchParamsI ) => {
        setSearchParams(
            { [fieldName]: e.target.value } as unknown as SearchParamsI
        );
    }
    return (
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', marginBottom: "2rem" }}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                <OutlinedInput
                    size="small"
                    id="filled-adornment-weight"
                    value={searchParams?.searchKey}
                    onChange={e => handleChange(e, 'searchKey')}
                    aria-describedby="filled-weight-helper-text"
                    inputProps={{
                    'aria-label': 'search key',
                    }}
                />
            </FormControl>
            <Button variant="outlined" type="submit">Search <SearchIcon sx={{ml: 1}}/></Button>
        </form>
    );
}

export default SearchFilter;