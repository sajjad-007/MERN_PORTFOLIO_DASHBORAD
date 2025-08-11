import { Button } from '@/components/ui/button';
import { logoutUser } from '@/features/slices/userSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const HomePage = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(state => state.user);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    // if (!isAuthenticated) {
    //   toast.error('user is not authenticated');
    // }
  }, [dispatch, error, loading, isAuthenticated]);
  const handlelogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h1>HomePage hello</h1>
      <Button onClick={handlelogout}> logout </Button>
    </div>
  );
};

export default HomePage;
