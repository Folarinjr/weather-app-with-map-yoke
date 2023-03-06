import * as React from "react";
import { LeftNavContainer } from "../theme/styled";
import logo from "../assets/react.svg";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../services/weatherSlice";
import { TextField } from "@mui/material";
import { useCallback, useState, useEffect } from "react";

const data = [
  { id: 1, name: "Ibadan" },
  { id: 2, name: "Lagos" },
  { id: 3, name: "Enugu" },
  { id: 4, name: "New York" },
  { id: 5, name: "Kogi" },
  { id: 6, name: "Iseyin" },
  { id: 7, name: "Abuja" },
  { id: 8, name: "Abeokuta" },
  { id: 9, name: "Texas" },
  { id: 10, name: "Limpopo" },
  { id: 11, name: "Ekiti" },
  { id: 12, name: "Borno" },
  { id: 13, name: "Benue" },
  { id: 14, name: "Bayelsa" },
  { id: 15, name: "Anambra" },
  { id: 16, name: "Adamawa" },
  { id: 17, name: "Abia" },
  { id: 18, name: "Sokoto" },
  { id: 19, name: "Kano" },
  { id: 20, name: "Ebonyi" },
];

export default function LeftNav() {
  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.weatherState.location);

  const [searchValue, setSearchValue] = useState("");
  const [cities, setCities] = useState(data);

  const filterSearch = useCallback(() => {
    const filteredCities = cities?.filter((el) =>
      searchValue === ""
        ? true
        : el.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCities(filteredCities);
    if (searchValue === "") {
      setCities(data);
    }
  }, [searchValue, cities]);

  useEffect(() => {
    filterSearch();
  }, [searchValue, filterSearch]);

  return (
    <LeftNavContainer>
      <div className="nav-img">
        {" "}
        <img src={logo} alt="logo" />
      </div>

      <Box>
        <Box width={"100%"} mb={5} mt={5}>
          <TextField
            placeholder="Filter Available Cities"
            fullWidth
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </Box>
        <Box overflow={"scroll"} maxHeight="70vh">
          {cities.map((city) => {
            return (
              <Box
                key={city.id}
                onClick={() => {
                  dispatch(setLocation(city.name));
                  setSearchValue("");
                }}
                sx={{
                  maxWidth: "max-content",
                  p: 1,
                  cursor: "pointer",
                  m: "0 auto",
                }}
                className={locationState === city.name ? "active" : ""}
              >
                {city.name}
              </Box>
            );
          })}
        </Box>
      </Box>
    </LeftNavContainer>
  );
}
