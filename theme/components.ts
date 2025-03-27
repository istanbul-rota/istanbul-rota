import { Components, CssVarsTheme, Theme } from "@mui/material";

export const components: Components<
  Omit<Theme, "components" | "palette"> & CssVarsTheme
> = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },
};
