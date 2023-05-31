import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { UserList } from 'components/User';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const users = useAppSelector(state => state.users.list);

  const handleOnAddUser = () => {
    navigate('/users/add');
  }

  return (
    <>
      <div className="flex justify-end">
        <button
          className="bg-primary-light text-light px-6 py-3 rounded-lg
            hover:bg-primary-1 transition-all duration-300
          "
          data-testid="add-user"
          onClick={handleOnAddUser}
        >
          Add User
        </button>
      </div>
      <UserList users={users} />
    </>
  )
}