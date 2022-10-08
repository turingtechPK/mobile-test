import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authToken from "./src/api/authToken";
import { addJwtToken } from "./src/store/jwt.slice";
import Loading from "./src/components/Loading";
import Navigation from "./src/navigation";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    setLoading(true);
    try {
      const userToken = await authToken.getToken();
      if (userToken !== null) {
        dispatch(addJwtToken({ token: userToken }));
      } else {
        console.log("No token found");
      }
    } catch (e) {
      console.log("Failed to fetch the data from storage", e);
    }
    setLoading(false);
  };

  return loading ? <Loading /> : <Navigation />;
};

export default App;
