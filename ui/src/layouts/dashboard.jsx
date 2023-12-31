import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccessToken,
  getUserProfile,
} from "../redux/features/auth/auth.actions";
// import Navbar from "../widgets/layout/Navbar";
// import Footer from "../widgets/layout/Footer";
// import {
//   fetchAccessToken,
//   fetchUserProfile,
// } from "../redux/features/auth/authActions";
// import routes from "../utils/routes";
// import { logout } from "../redux/features/auth/authSlice";
// import { persistor } from "../redux/app/store";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.accessToken) {
      dispatch(getAccessToken());
    }
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [user, dispatch]);

  //   let dashRoutes = routes.filter((route) => route.layout === "dashboard");

  const handleLogout = () => {
    // persistor.purge();
    // dispatch(logout());
    // window.location.replace("/user/login");
  };

  return (
    <div>
      {/* <Navbar routes={dashRoutes} /> */}
      {user && (
        <Link to="/" onClick={handleLogout}>
          Log out
        </Link>
      )}
      <div className="mt-9">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
