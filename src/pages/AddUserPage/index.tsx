import React from 'react';
import { UserForm } from 'components/UserForm';


export const AddUserPage: React.FC = () => {
  return (
    <div>
      <h3 className="text-center font-bold mb-8">Add New User</h3>
      <UserForm />
    </div>
  );
}