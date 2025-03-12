import { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// GLOBAL CUSTOM COMPONENTS
import Loading from "app/components/MatxLoading";
import { getMeServices, loginServices } from "app/service/auth/auth.service";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

// check token valid
const isValidToken = (accessToken) => {
  if (!accessToken) return false;
  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime; // valid if token not expired
  } catch (error) {
    console.log(error);
    return false;
  }
};

// save token and delete token
const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken); //set token to local storage
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken"); // remove token from local storage
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, user, isAuthenticated, isInitialized: true };
    }
    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, user, isAuthenticated: true };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT"
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // function login
  const login = async (username, password) => {
    const { data } = await loginServices(username, password); // excecute api login and get data
    const { token } = data; // get data authentication from data

    setSession(token); // set token from authentication to setSession

    const dataUser = await getMeServices(token); // get data user from data
    const user = dataUser.data;

    dispatch({ type: "LOGIN", payload: { user } }); //send data user to reducer type login
  };

  //function register
  const register = async (email, username, password) => {
    const { data } = await axios.post("/api/auth/register", { email, username, password });
    const { accessToken, user } = data;

    setSession(accessToken);
    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken"); // get token from local storage
        //check token valid
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get("http://192.168.10.167:8089/api/getpegawai"); //get data user login
          const user = response.data;

          dispatch({
            type: "INIT",
            payload: { isAuthenticated: true, user }
          });
        } else {
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null }
          });
        }
      } catch (err) {
        console.log(err);

        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null }
        });
      }
    })();
  }, []);

  if (!state.isInitialized) return <Loading />;

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
