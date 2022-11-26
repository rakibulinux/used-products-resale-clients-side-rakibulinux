import { useQuery } from "@tanstack/react-query";
import React, { createContext } from "react";

export const APIContext = createContext();
const APIProvider = ({ children }) => {
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
      const data = res.json();
      return data;
    },
  });

  const apiInfo = { categories, isLoading, refetch };
  return <APIContext.Provider value={apiInfo}>{children}</APIContext.Provider>;
};

export default APIProvider;
