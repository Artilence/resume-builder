/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { fetchUser } from '../app/auth/authSlice';

const ProtectedRoute = ({ element: Element }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchUser())
        .unwrap()
        .finally(() => setCheckedAuth(true)); // Proceed regardless of fetch success/failure
    } else {
      setCheckedAuth(true); // User is already authenticated
    }
  }, [isAuthenticated, dispatch]);
  console.log(isAuthenticated);

  if (loading || !checkedAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Element />;
};

export default ProtectedRoute;
