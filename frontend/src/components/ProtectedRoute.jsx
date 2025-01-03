/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import {
  useRefreshTokenMutation,
  useFetchUserQuery,
} from '../app/auth/authAPI';
import { setUser, logout } from '../app/auth/authSlice';

const ProtectedRoute = ({ element: Element }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [checkedAuth, setCheckedAuth] = useState(false);

  // Fetch user on mount
  const {
    data: userData,
    error,
    isLoading,
    refetch,
    isSuccess,
  } = useFetchUserQuery();

  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    if (isSuccess) {
      // If fetchUser is successful, set user and mark auth as checked
      dispatch(setUser(userData));
      setCheckedAuth(true);
    } else if (error && (error?.status === 401 || error?.status === 403)) {
      // If 401 or 403, attempt refresh token
      refreshToken()
        .unwrap()
        .then(() => {
          refetch();
        })
        .catch(() => {
          dispatch(logout());
          setCheckedAuth(true);
        });
    } else if (error) {
      // Handle all other errors
      setCheckedAuth(true);
    }
  }, [isSuccess, error, dispatch, refetch, refreshToken, userData]);

  if (isLoading || !checkedAuth) {
    return <div>Loading...</div>; // Loading spinner while checking auth
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Element />;
};

export default ProtectedRoute;
