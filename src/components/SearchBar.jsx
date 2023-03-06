import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../services/weatherSlice";
import { Box, Autocomplete, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useGetSearchWeatherQuery } from "../services/weatherApi";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  const { data } = useGetSearchWeatherQuery(search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setAutoCompleteList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleKeyDown = (event) => {
    setSearch(event.target.value);
    if (event.key === "Enter") {
      document.getElementsByClassName("text").click();
      event.target.value = "";
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
      <Autocomplete
        sx={{ width: "15rem", padding: 0 }}
        freeSolo
        disableClearable
        filterOptions={(x) => x}
        id="search"
        onChange={(event, value) => dispatch(setLocation(value))}
        options={autoCompleteList?.map((data) => data.name)}
        renderInput={(params) => (
          <TextField
            className="text"
            id="searchField"
            placeholder="locate location on the map"
            onKeyDown={handleKeyDown}
            {...params}
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <Search />{" "}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
