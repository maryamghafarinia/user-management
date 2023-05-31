import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { UserForm } from 'components/UserForm';

export const UserDetailsPage: React.FC = () => {
  let { id } = useParams();
  const users = useAppSelector(state => state.users.list);
  const user = users.find(user => user.id === Number(id));

  return (
    <div>
      <h3 className="text-center">User Details</h3>
      <UserForm user={user} />
    </div>
  )
}