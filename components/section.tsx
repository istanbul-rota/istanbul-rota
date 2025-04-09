import React from "react";
import clsx from "clsx";

type Props = {
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;
  padding?: string;
  borderRadius?: string;
  shadow?: boolean;
  gridColumn?: string;
  gridRow?: string;
};

export const Section: React.FC<Props> = ({
  backgroundColor = "bg-white",
  children,
  className = "",
  padding = "p-6",
  borderRadius = "rounded-xl",
  shadow = false,
  gridColumn = "auto",
  gridRow = "auto",
}) => {
  return (
    <div
      className={clsx(
        backgroundColor,
        padding,
        borderRadius,
        shadow && "shadow-md",
        className,
      )}
      style={{
        gridColumn,
        gridRow,
      }}
    >
      {children}
    </div>
  );
};
