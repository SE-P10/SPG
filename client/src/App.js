import { React, useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { LoginForm } from "./pages/Login";
import { ShopEmployee } from "./pages/ShopEmployeePage";
import { ClientPage } from "./pages/ClientPage";
import { HomePage } from "./pages/HomePage";
import { FarmerPage } from "./pages/FarmerPage";
import { AboutPage } from "./pages/AboutPage";
import { WarehousePage } from "./pages/WarehousePage";
import { ManagerPage } from "./pages/ManagerPage";
import { RegistrationForm } from "./ui-components/RegistrationForm";
import { BrowserProducts } from "./ui-components/BrowseProducts";
import MyNavbar from "./ui-components/MyNavbar";
import GlobalState from './utility/GlobalState';
import API from "./API";
import "./css/custom.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [virtualTimeDate, setVirtualTimeDate] = useState(dayjs());
  const [timeDateOffset, setTimeDateOffset] = useState(0);

  useEffect(() => {
    //per non perdere utente loggato se aggiorno pagina, da qui viene l'errore della GET 401(unhautorized)
    const checkAuth = async () => {
      const userTmp = await API.getUserInfo();
      setLoggedIn(true);
      setUser(userTmp);
    };
    //fare api per prendere orario
    checkAuth().catch((err) => console.log(err));
  }, []);

  const doLogin = async (credentials) => {
    try {
      const userTm = await API.logIn(credentials);
      setLoggedIn(true);
      setUser(userTm);
      setMessage({ msg: "Welcome ", type: "success" });
    } catch (err) {
      setMessage({ msg: err, type: "danger" });
    }
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(null);
    setMessage("");
  };

  const closeMessage = () => {
    setMessage("");
  };

  /**
   * Handle VirtualTime updates
   */
  useEffect(() => {
    let loaded = false;

    async function timeHandler() {
      if (!loaded) {
        loaded = true;
        setTimeDateOffset(await API.getTime(true));
      }

      // prevent pooling the server
      let timeoffset = timeDateOffset || 0;

      setVirtualTimeDate(dayjs().add(timeoffset, "second"));
    }

    timeHandler();

    const interval = setInterval(timeHandler, 1000);

    return () => clearInterval(interval);
  }, [timeDateOffset]);

  const [state, setState] = useState({
    useHistoryBack: false
  });

  return (
    <GlobalState.Provider value={[state, setState]}>
      <BrowserRouter>

        <MyNavbar
          doLogOut={doLogOut}
          loggedIn={loggedIn}
          closeMessage={closeMessage}
          changeTimeDate={setTimeDateOffset}
          virtualTimeDate={virtualTimeDate}
        />

        <Routes>
          <Route
            exact
            path='/'
            element={
              <HomePage className='w-100' />
            }
          />

          <Route
            exact
            path='/products'
            element={
              <BrowserProducts />
            }
          />
          <Route
            exact
            path='/shopemployee'
            element={
              user !== null && user.role === "1" ? (
                <ShopEmployee
                  hour={virtualTimeDate.format("H")}
                  dow={virtualTimeDate.format("dddd")}
                  user={user}
                  loggedIn={loggedIn}
                />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            exact
            path='/warehouse'
            element={
              user !== null && user.role === "3" ? (
                <WarehousePage user={user} hour={virtualTimeDate.format("H")} dow={virtualTimeDate.format("dddd")} />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            exact
            path='/manager'
            element={
              user !== null && user.role === "4" ? (
                <ManagerPage user={user} hour={virtualTimeDate.format("H")} dow={virtualTimeDate.format("dddd")} />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            exact
            path='/signup'
            element={
              <RegistrationForm
                className='below'
                loggedIn={loggedIn}
                doLogin={doLogin}
              />
            }
          />

          <Route
            exact
            path='/farmerpage'
            element={
              user !== null && user.role === "2" ? (
                <FarmerPage
                  hour={virtualTimeDate.format("H")}
                  dow={virtualTimeDate.format("dddd")}
                  user={user}
                />
              ) : (
                <Navigate to='/login' />
              )
            }
          />

          <Route
            exact
            path='/clientpage'
            element={
              user !== null && user.role === "0" ? (
                <ClientPage
                  virtualTimeDate={virtualTimeDate}
                  hour={virtualTimeDate.format("H")}
                  dow={virtualTimeDate.format("dddd")}
                  user={user}
                />
              ) : (
                <Navigate to='/login' />
              )
            }
          />

          <Route
            exact
            path='/about'
            element={
              <AboutPage user={user} />
            }
          />
          <Route
            path='/login'
            element={
              loggedIn && user !== null ? (
                <>
                  {user.role === "0" ? <Navigate to='/clientpage' /> : null}
                  {user.role === "1" ? <Navigate to='/shopemployee' /> : null}
                  {user.role === "2" ? <Navigate to='/farmerpage' /> : null}
                  {user.role === "3" ? <Navigate to='/warehouse' /> : null}
                  {user.role === "4" ? <Navigate to='/manager' /> : null}
                </>
              ) : (
                <LoginForm
                  closeMessage={closeMessage}
                  message={message}
                  login={doLogin}
                />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalState.Provider>
  );
};

export default App;
