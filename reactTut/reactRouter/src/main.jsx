import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Root from "./Root";
import { About, Contact, Home } from "./components";
import User from "./components/User/User";
import Github, { githubInfoLoader } from "./components/Github/Github";

 //create a router method 1
//  const router = createBrowserRouter([
//    {
//      path: "/",
//      element: <Root />,
//      children: [
//        {
//          path: "",
//          element: <Home />,
//        },
//        {
//          path: "about",
//          element: <About />,
//        },
//        {
//          path: "contact",
//          element: <Contact />,
//        }
//      ],
//    },
//  ]);

// create a router method 2
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:id" element={<User />} />
      <Route 
        path="github" 
        element={<Github />} 
        loader={githubInfoLoader}
      />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
    {/* router provider takes a prop router in it */}
  </React.StrictMode>
);
