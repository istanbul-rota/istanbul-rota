import { InputAdornment, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { Filter } from "@/types/Filter";

export const SearchInput = ({ filter }: { filter: Filter }) => {
  const t = useTranslations();

  const getPlaceholder = () => {
    switch (filter) {
      case Filter.CAFE:
        return t("Header.search-cafe-placeholder");
      case Filter.TODO:
        return t("Header.search-todo-placeholder");
      case Filter.RESTAURANTS:
        return t("Header.search-restaurant-placeholder");
      default:
        return t("Header.search-placeholder");
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <TextField
        fullWidth
        placeholder={getPlaceholder()}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch className="text-dark" size={24} />
              </InputAdornment>
            ),
            sx: {
              paddingRight: "4px",
              paddingLeft: "16px",
              borderRadius: "9999px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e5e7eb",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#9ca3af",
                borderWidth: "1px",
              },
              height: "56px",
              fontSize: "16px",
            },
            endAdornment: (
              <button className="bg-primary h-[48px] cursor-pointer rounded-[24px] px-6 hover:opacity-80">
                {t("Header.search")}
              </button>
            ),
          },
        }}
      />
    </div>
  );
};
