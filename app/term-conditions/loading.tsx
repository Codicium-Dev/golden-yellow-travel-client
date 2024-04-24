import { PuffLoader } from "react-spinners";
import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
    </div>
  );
};

export default Loading;
