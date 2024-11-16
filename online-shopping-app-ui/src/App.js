// import React from 'react';
// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <>
//       <Navbar/>
//     </>
//   );
// }

// export default App;

import React from "react";
import {AuthProvider} from "./context/authContext"
import { AppRoutes } from "./Routes.js/routes";
import {Header} from "./components/common/Header/header"
import { Loader } from "./components/common/Loader/loader";

function App() {
  return (
    <AuthProvider>
    <AppRoutes><Header />
          <Loader/></AppRoutes>
    </AuthProvider>
  );
}

export default App;
