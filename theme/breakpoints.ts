import { BreakpointsOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },
};
