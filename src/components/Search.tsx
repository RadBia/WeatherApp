import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { GeoApi } from "../api/GeoApi";
import { City } from "../models/City";
import { RegionType } from "../models/RegionType";
import { minCharsToTriggerSearch } from "../constants/constants";

interface SearchProps {
    onSelectedCity: (city: City) => void
}

export const Search = (props: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);

  const searchCities = useCallback(async (term: string) => {
    const result = await GeoApi.getCities(term);

    const filteredResult = result.data.data.filter(
      (x) => x.type === RegionType.City
    );

    setSuggestions(filteredResult);
  }, []);

  const debouncedSearch = useMemo(
    () => debounce((term: string) => searchCities(term), 1200),
    [searchCities]
  );

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  const onSelected = (selectedCity: City) => {
    props.onSelectedCity(selectedCity)
  };

  useEffect(() => {
    if (searchTerm && searchTerm.length > minCharsToTriggerSearch) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  return (
    <div>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          value={searchTerm}
          placeholder="Find your city..."
          onChange={onSearchChange}
        />
      </InputGroup>
      {suggestions.length > 0 && <Box
        display="flex"
        flexDirection="column"
        width="100%"
        textAlign="start"
        border="1px solid gray"
        borderBottomRadius={4}
        padding={4}
      >
        <List spacing={4}>
          {suggestions.map((suggestion, index) => (
            <ListItem
              onClick={() => onSelected(suggestion)}
              cursor={"pointer"}
              key={`${suggestion.name}_${index}`}
            >
              {suggestion.name}, {suggestion.region}
            </ListItem>
          ))}
        </List>
      </Box>}
    </div>
  );
};
