import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import all components
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Flowbite from "./pages/Flowbite/Flowbite";
import AddTask from "./pages/AddTask/AddTask";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DataGridView from "./components/Recovery";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/signup" element={<PublicRoute component={Signup} />} />
          <Route path="/login" element={<PublicRoute component={Login} />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path="/addtask"
            element={<PrivateRoute component={AddTask} />}
          />
          <Route
            path="/tasklist"
            element={<PrivateRoute component={Flowbite} />}
          />
          <Route
            path="/tasklistdata"
            element={<PrivateRoute component={DataGridView} />}
          />

          <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
