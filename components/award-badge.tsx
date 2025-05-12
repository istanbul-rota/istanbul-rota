"use client";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import React, { useState } from "react";
import { Award } from "@/types";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { IconButton, Box } from "@mui/material";

interface Props {
  award: Award;
  isInfoVisible?: boolean;
}

export const AwardBadge: React.FC<Props> = ({
  award,
  isInfoVisible = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "award-popover" : undefined;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/90 px-3 py-1.5 shadow-sm ring-1 ring-yellow-400">
      <EmojiEventsIcon
        sx={{
          fontSize: 18,
          color: "#000",
        }}
      />
      {isInfoVisible && (
        <>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              padding: 0,
              marginLeft: "-2px",
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-black">
                {award.title}
              </span>
              <HelpOutlineIcon
                sx={{
                  fontSize: 16,
                  color: "#000",
                  opacity: 0.7,
                }}
              />
            </div>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  p: 2,
                  maxWidth: 280,
                  borderRadius: 2,
                  mt: 1,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              },
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {award.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {award.description}
              </Typography>
            </Box>
          </Popover>
        </>
      )}
    </div>
  );
};
