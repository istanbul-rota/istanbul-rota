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
    <div className="flex items-center justify-center gap-1 rounded-full bg-yellow-400 p-1 px-2">
      <EmojiEventsIcon sx={{ fontSize: 16 }} />
      <span className="text-xs font-medium">{award.title}</span>
      {isInfoVisible && (
        <>
          <IconButton
            onClick={handleClick}
            size="small"
            disableRipple
            disableFocusRipple
            disableTouchRipple
          >
            <HelpOutlineIcon
              sx={{
                fontSize: 16,
                color: "var(--color-primary)",
              }}
            />
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
            slotProps={{
              paper: {
                sx: {
                  p: 2,
                  maxWidth: 250,
                  borderRadius: 2,
                },
              },
            }}
          >
            <Box>
              <Typography variant="h6">{award.title}</Typography>
              <Typography variant="caption">{award.description}</Typography>
            </Box>
          </Popover>
        </>
      )}
    </div>
  );
};
