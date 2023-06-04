import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { EditUser, GetUser, login, signup } from "../service/userApi";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../service/localStorage";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import { Login, RegistrationForm, TokenType, userMapToModelType } from "../models/types/userType";
import normalizeUser from "../helpers/normalization/normalizeUser";
import normalizeEditCard from "../../cards/helpers/normalizations/normalizeEditCard";
import UserInterface from "../models/interfaces/UserInterface";
import { useSnack } from "../../providers/SnackbarProvider";
// type ErrorType = null | string;
type UserType = null | UserInterface;
const useHandleUsers = () => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState(false);
  const snack = useSnack();
  useAxios();
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();
  const [userData, setUserData] = useState<UserType>(null);
  const requestStatus = useCallback(
    (
      loading: boolean,
      errorMessage: string | null,
      user: null | TokenType = null,
      userData?: UserType 
    ) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
      if (userData) setUserData(userData);
      
    },
    [setUser]
  );

  const handleLogin = useCallback(
    async (user: Login) => {
      try {
        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, userFromLocalStorage);
        navigate(ROUTES.CARDS);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [navigate, requestStatus, setToken]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async (user: RegistrationForm) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );


  const handelEditUser = useCallback(
    async (user: userMapToModelType) => {
      try {
        setLoading(false);
        const normalize_User = normalizeUser(user);
        const UserUp = await EditUser(normalize_User);

        requestStatus(false, null, null, UserUp);

        snack("success", "The user has been successfully Created");

        navigate(ROUTES.ROOT);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [user]
  );
  const handelGetUser = useCallback(
    async (userId: string) => {
      try {
        setLoading(false);
        const userFromClient = await GetUser(userId);
        if (userFromClient) {
          requestStatus(false, null, null, userFromClient);
          return userFromClient;
        }
       
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [userData]
  );

  const value = useMemo(() => {
    return { isLoading, error, user };
  }, [isLoading, error, user]);

  return {
    value,
    handleLogin,
    handleLogout,
    handleSignup,
    handelGetUser,
    handelEditUser
  };
};

export default useHandleUsers;
