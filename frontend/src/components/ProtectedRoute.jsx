import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchUser } from '../redux/auth/authSlice';

const ProtectedRoute = ({ element: Element }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // 🔄 Fetch user if not authenticated
    if (!isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Spinner while loading user
  }

  // 🔐 If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Element />;
};

export default ProtectedRoute;
