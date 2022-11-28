import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.usedPhoneToken) {
          localStorage.setItem("usedPhoneToken", data.usedPhoneToken);
          setToken(data.usedPhoneToken);
        }
      });
  }, [email]);
  return [token];
};

export default useToken;
