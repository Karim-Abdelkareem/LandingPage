import axios from "axios";
import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const initalState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
function AuthProvider({ children }) {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initalState
  );

  const [authChecked, setAuthChecked] = useState(false); // <-- NEW

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            dispatch({ type: "LOGIN", payload: decoded });
          }
        } catch (error) {
          logout();
        }
      }
      setAuthChecked(true); // <-- mark auth check done
    };

    checkAuth();
  }, []);

  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://newmarkegy.com/api/auth/login`,
        formData
      );
      const { token } = response.data;

      localStorage.clear();
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      dispatch({ type: "LOGIN", payload: decoded });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        authChecked, // <-- expose this too
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
