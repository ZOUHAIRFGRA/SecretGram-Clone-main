import { useState } from "react";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notificationSlice";

const useFetch = ({ method, url }, successFn, errorFn) => {
  const [requestState, setRequestState] = useState();
  const dispatch = useDispatch();

  const requestFunction = async (values) => {
    const controller = new AbortController();
    const { signal } = controller;

    const methodUpper = method.toUpperCase();
    const fetchOptions = {
      method: methodUpper,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
      ...(methodUpper !== "GET" && { body: JSON.stringify(values) }),
      signal,
    };

    try {
      setRequestState("loading");
      const response = await fetch(`https://greyline.onrender.com/api${url}`, fetchOptions);
      const data = methodUpper !== "DELETE" ? await response.json() : null;

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong!");
      }

      setRequestState("success");
      successFn && successFn(data);
      return data;
    } catch (error) {
      if (error.name === "AbortError") return; // Ignore aborted requests
      setRequestState("error");
      dispatch(
        notificationActions.addNotification({
          message: error.message,
          type: "error",
        })
      );
      errorFn && errorFn(error);
    }
  };

  return {
    reqState: requestState,
    reqFn: requestFunction,
  };
};

export default useFetch;
