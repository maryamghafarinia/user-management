import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { DefaultLayout } from 'layouts/DefaultLayout';
import { HomePage } from 'pages/Home';
import { AddUserPage } from 'pages/AddUserPage';
import { UserDetailsPage } from 'pages/UserDetailsPage';
import { getUsers } from 'store/user/slice'
import { useAppDispatch } from 'store/hooks';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsers({ page: 1 }));
  })

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="users" element={<HomePage />} />
          <Route path="users/:id" element={<UserDetailsPage />} />
          <Route path="users/add" element={<AddUserPage />} />
          <Route index element={<HomePage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter >
  );
}

export default App;
