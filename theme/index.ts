"use client";

import { createTheme } from "@mui/material/styles";
import { breakpoints } from "./breakpoints";
import { components } from "./components";
import { palette } from "./palette";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-lato)",
  },
  palette,
  breakpoints,
  components,
});

export default theme;
