import FilterAltIcon from "@mui/icons-material/FilterAlt";
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
import FilterSelect from "@/components/FilterSelect";
import FilterText from "@/components/FilterText";

// [ ] sticky table header
// [ ] add clear filters button
// [ ] add checkboxes to table
// [ ] get ngrok working with api, can vite proxy api?

// <Container maxWidth="lg" component="main" sx={{ py: 3 }}>
//   <Outlet />
// </Container>
const StickyContainer = styled(Container)(({ theme }) => ({
  // maxWidth: theme.breakpoints.values.lg - 48,
  // marginLeft: theme.spacing(3),
  // marginRight: theme.spacing(6),
  // position: "fixed",
  // width: "100%",
}));

const StickyDataGrid = styled(DataGrid)`
  position: fixed;
  width: 100%;

  ${({ theme }) =>
    theme.breakpoints.up("lg") &&
    {
      // maxWidth: theme.breakpoints.values.lg - 48,
    }}

  ${({ theme }) =>
    theme.breakpoints.down("lg") && {
      maxWidth: theme.breakpoints.values.lg,
    }}

  ${({ theme }) =>
    theme.breakpoints.down("md") &&
    {
      // maxWidth: theme.breakpoints.values.sm,
    }}
`;

const StickyDataGrid1 = styled(DataGrid)(({ theme }) => {
  // console.log(props);

  console.log("lg", theme.breakpoints.down("lg"));
  // theme.breakpoints./*  */

  return {
    // ${(props) =>
    // props.theme.breakpoints.down('lg') && {
    //   backgroundColor: 'green',
    // }}

    // theme.breakpoints.down("lg") {

    // },

    //
    maxWidth: theme.breakpoints.values["md"],
    // marginLeft: theme.spacing(3),
    // marginRight: theme.spacing(6),
    // top: 0,
    // left: "auto",
    // right: "auto",
    position: "fixed",
    width: "100%",
  };
});

// const StickyDataGrid = styled(DataGrid)(({ theme }) => ({
//   "& .MuiDataGrid-columnHeaders": {
//     position: "sticky",
//     // Replace background colour if necessary
//     backgroundColor: theme.palette.background.paper,
//     // Display header above grid data, but below any popups
//     zIndex: theme.zIndex.mobileStepper - 1,
//     top: 0,
//   },
//   "& .MuiDataGrid-virtualScroller": {
//     // Undo the margins that were added to push the rows below the previously fixed header
//     marginTop: "0 !important",
//   },
//   "& .MuiDataGrid-main": {
//     // Not sure why it is hidden by default, but it prevented the header from sticking
//     overflow: "visible",
//   },
// }));

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
  // const location = useLocation();

  // useEffect(() => {
  // console.log("location", location);
  // console.log("windows.location", window.location.origin);
  // }, [location]);

  //  const [searchParams] = useSearchParams();
  // console.log(n, t);

  // /**
  //  * @type {useState<ShipComponents[]>}
  //  */
  // [ ]  get filter from url
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
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log("loading", loading);
  // }, [loading]);

  useEffect(() => {
    // setLoading(true);
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

    // const params2 = new URLSearchParams(filters);
    // console.log("URL Params2:", params2.toString());
    // console.log("URL Params:", filters, params.toString());

    setFiltered(filtered);
    // setLoading(false);
  }, [components, filters, setSearchParams]);

  const handleChange = curry((property, value) => {
    // setLoading(true);
    setFilters((prev) => {
      const data = { ...prev };
      data[property] = value;

      return data;
    });
  });

  // if (loading) {
  //   return (
  //     // <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
  //     <LoadingSpinner />
  //     // </Box>
  //   );
  // }

  const hasActiveFilters = Object.values(filters).some(
    (v) => Array.isArray(v) && v.length > 0
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={(theme) => ({
          // backgroundColor: "transparent",
          // px: 2,
          "--Paper-shadow": "0 !important",
          "--Paper-overlay": "none !important",
        })}
      >
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <FilterText
            defaultValue={filters.name}
            label="Name"
            onChange={handleChange("name")}
          />
          <Button
            color={hasActiveFilters ? "secondary" : "inherit"}
            onClick={() => setShowFilters((prev) => !prev)}
            variant={showFilters ? "contained" : "outlined"}
          >
            <FilterAltIcon />
          </Button>
        </Stack>
        {showFilters && (
          <>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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
          </>
        )}
      </AppBar>

      {/* <StickyContainer maxWidth="lg" sx={{ py: 3 }}> */}
      <StickyDataGrid
        // disableColumnFilter
        // disableColumnSelector
        // disableDensitySelector
        columns={columns}
        disableColumnMenu
        hideFooterPagination
        // loading={loading}
        paginationMode="server"
        pagination
        rowCount={filtered.length}
        rows={filtered}
        // showToolbar
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
      {/* </StickyContainer> */}
    </>
  );
};

export default ShipComponents;
