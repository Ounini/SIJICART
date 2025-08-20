import { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ products }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const lowerSearch = searchTerm.toLowerCase();

      const results = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(lowerSearch) ||
          product.category.toLowerCase().includes(lowerSearch) ||
          product.subCategory.toLowerCase().includes(lowerSearch)
        );
      });
      console.log("Filtered:", results);
      setFilteredProducts(results);
    }
  }, [searchTerm, products]);

  return (
    <Autocomplete
      className="searchBar position-fixed z-1050"
      freeSolo
      disablePortal
      disableClearable
      id="search-bar"
      options={filteredProducts}
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name || ""
      }
      inputValue={searchTerm}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
      onChange={(event, value) => {
        if (value && typeof value === "object") {
          navigate(`/${value.category}/${value.subCategory}/${value.name}`);
        } else if (typeof value === "string") {
          navigate(`/search?q=${encodeURIComponent(value)}`);
        }
      }}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box component="li" key={key} {...rest}>
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {option.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.category} → {option.subCategory}
              </Typography>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Macbook Pro 16 inches"
          slotProps={{
            input: {
              ...params.InputProps,
              type: "search",
              endAdornment: (
                <IconButton
                  onClick={() => {
                    const query = searchTerm.trim();
                    if (query) {
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                    }
                  }}
                  edge="end"
                >
                  <SearchIcon sx={{ color: "#58355e", mr: 1 }} />
                </IconButton>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#58355e",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#58355e",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#686968",
              opacity: 1,
            },
          }}
        />
      )}
    />
  );
};

export default SearchBar;
