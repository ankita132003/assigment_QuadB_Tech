import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
} from "react-router-dom";
import Summary from "../src/Components/Summary";
import Home from "../src/Components/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/summary/:id" 
  , element: <Summary />},

]);
export default router;