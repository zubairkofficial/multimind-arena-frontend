import "./App.css";
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/store";
import { router } from "./routes";
import { setToken } from "./features/api/authSlice";

function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token)); // Update Redux state with token
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}

export default App;
