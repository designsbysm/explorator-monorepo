import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AppBar, Box, Button, Container, Stack, styled } from "@mui/material";
import { DataGrid, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import request, { gql } from "graphql-request";
import { curry } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { serverURL } from "@/config.mjs";
import {
  enumDecode,
  enumEncode,
  enumValues,
  shipComponentClass,
  shipComponentGrade,
  shipComponentSize,
  shipComponentType,
} from "@/enums";
import CircledIcon from "@/components/CircledIcon";
import FilterSelect from "@/components/FilterSelect";
import FilterText from "@/components/FilterText";

// [ ] sticky table header
// [ ] add checkboxes to table
// [ ] get ngrok working with api, can vite proxy api?

const columns = [
  {
    field: "name",
    flex: 2,
    headerName: "Name",
  },
  {
    field: "type",
    flex: 1,
    headerName: "Type",
    valueGetter: enumDecode(shipComponentType),
  },
  {
    field: "size",
    flex: 0.6,
    headerName: "Size",
    valueGetter: enumDecode(shipComponentSize),
  },
  {
    field: "class",
    flex: 1,
    headerName: "Class",
    valueGetter: enumDecode(shipComponentClass),
  },
  {
    field: "grade",
    flex: 0.6,
    headerName: "Grade",
    valueGetter: enumDecode(shipComponentGrade),
  },
];

/**
 * @typedef {object} CustomFooterProps
 * @property {number} rowCount
 *
 * @param {CustomFooterProps} props
 * @returns {React.JSX.Element}
 */
const CustomFooter = ({ rowCount }) => (
  <GridFooterContainer>
    <GridFooter sx={{ border: "none" }} />
    <Box sx={{ p: 2 }}>{`${rowCount} Total`}</Box>
  </GridFooterContainer>
);

// Helper: encode filters, skipping empty arrays
const encodeFiltersToParams = (obj) => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      // params.set(key, value);
      // value.forEach((v) => params.append(key, v));
      params.set(key, value.join(","));
    } else if (!Array.isArray(value) && value) {
      params.set(key, value);
    }
  });

  return params;
};

/**
 * @returns {React.JSX.Element}
 */
const ShipComponents = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const n = searchParams.get("name") || "";
    const c = searchParams.get("class")?.split(",") || [];
    const g = searchParams.get("grade")?.split(",") || [];
    const s = searchParams.get("size")?.split(",") || [];
    const t = searchParams.get("type")?.split(",") || [];

    return {
      class: c,
      name: n,
      grade: g,
      size: s,
      type: t,
    };
  });
  const [components, setComponents] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await request(
        `${serverURL}/graphql`,
        gql`
          {
            allShipComponents(orderBy: NAME_ASC) {
              nodes {
                id
                name
                type
                size
                class
                grade
              }
            }
          }
        `
      ).catch(console.error);

      setComponents(data?.allShipComponents?.nodes ?? []); // }
    })();
  }, []);

  useEffect(() => {
    const filtered = components
      .filter((component) => {
        if (!filters.name) {
          return true;
        }

        return component.name
          .toLowerCase()
          .includes(filters.name.toLowerCase());
      })
      .filter((component) => {
        if (!filters.type.length) {
          return true;
        }

        return filters.type
          .map(enumEncode(shipComponentType))
          .includes(component.type);
      })
      .filter((component) => {
        if (!filters.size.length) {
          return true;
        }

        return filters.size
          .map(enumEncode(shipComponentSize))
          .includes(component.size);
      })
      .filter((component) => {
        if (!filters.class.length) {
          return true;
        }

        return filters.class
          .map(enumEncode(shipComponentClass))
          .includes(component.class);
      })
      .filter((component) => {
        if (!filters.grade.length) {
          return true;
        }

        return filters.grade
          .map(enumEncode(shipComponentGrade))
          .includes(component.grade);
      });

    const params = encodeFiltersToParams(filters);
    setSearchParams(params);

    setFiltered(filtered);
  }, [components, filters, setSearchParams]);

  const handleChange = curry((property, value) => {
    setFilters((prev) => {
      const data = { ...prev };
      data[property] = value;

      return data;
    });
  });

  return (
    <>
      <AppBar position="sticky" sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <FilterText
            defaultValue={filters.name}
            label="Name"
            onChange={handleChange("name")}
          />
          <Button onClick={() => setShowFilters((prev) => !prev)}>
            <CircledIcon
              OverlayIcon={
                showFilters ? KeyboardArrowUpIcon : KeyboardArrowDownIcon
              }
            />
          </Button>
        </Stack>
        {showFilters && (
          <>
            <Stack direction="row" spacing={2} sx={{ my: 2 }}>
              <FilterSelect
                defaultValue={filters.type}
                label="Type"
                options={enumValues(shipComponentType)}
                onChange={handleChange("type")}
              />
              <FilterSelect
                defaultValue={filters.size}
                label="Size"
                options={enumValues(shipComponentSize)}
                onChange={handleChange("size")}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FilterSelect
                defaultValue={filters.class}
                label="Class"
                options={enumValues(shipComponentClass)}
                onChange={handleChange("class")}
              />
              <FilterSelect
                defaultValue={filters.grade}
                label="Grade"
                options={enumValues(shipComponentGrade)}
                onChange={handleChange("grade")}
              />
            </Stack>
            <Button
              disabled={
                !Object.values(filters).some(
                  (v) =>
                    (Array.isArray(v) && v.length > 0) ||
                    (!Array.isArray(v) && v)
                )
              }
              onClick={() =>
                setFilters(() => ({
                  class: [],
                  name: "",
                  grade: [],
                  size: [],
                  type: [],
                }))
              }
              sx={{ mt: 2 }}
            >
              Clear All
            </Button>
          </>
        )}
      </AppBar>
      <DataGrid
        columns={columns}
        disableColumnMenu
        hideFooterPagination
        paginationMode="server"
        pagination
        rowCount={filtered.length}
        rows={filtered}
        slots={{
          footer: CustomFooter,
        }}
        slotProps={{
          footer: {
            rowCount: filtered.length,
          },
        }}
        sx={(theme) => ({
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: theme.palette.secondary.contrastText,
          },
        })}
      />
    </>
  );
};

export default ShipComponents;
