import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkill from './pages/ManageSkill';
import ManageTimeline from './pages/ManageTimeline';
import ManageProjects from './pages/ManageProjects';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getLoginUser } from './features/slices/userSlice';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginUser());
    
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkill />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/manage/projects" element={<ManageProjects />} />
        <Route path="/view/project/:id" />
        <Route path="/update/project/:id" />
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </Router>
  );
}

export default App;
