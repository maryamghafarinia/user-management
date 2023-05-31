import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IUser, FormStatus } from 'types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteUser, updateFormStatus } from 'store/user/slice';
import { UserItem } from './UserItem';
import styles from './index.module.scss';

interface IUserListProps {
  users: Array<IUser>;
}


export const UserList: React.FC<IUserListProps> = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(state => state.users.formStatus);

  useEffect(() => {
    if (requestStatus === FormStatus.SUCCESS) {
      dispatch(updateFormStatus(FormStatus.NONE));
      toast.success('Deleted');
    } else if (requestStatus === FormStatus.FAILURE) {
      dispatch(updateFormStatus(FormStatus.NONE));
      toast.error('Failed to delete user');
    }

    return () => { }
  }, [requestStatus, dispatch]);


  const handleOnUpdate = (idx: number) => {
    navigate(`/users/${idx}`)
  }

  const handleOnDelete = (idx: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(idx));
    }
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Website</th>
            <th>Tags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) =>
              <UserItem
                key={user.id}
                user={user}
                onUpdate={() => handleOnUpdate(user.id)}
                onDelete={() => handleOnDelete(user.id)} />)
          }
        </tbody>
      </table>
      {
        users.length === 0 && (
          <div className="text-center">
            No users found. Create a first one!
          </div>
        )
      }
      <ToastContainer />
    </div>
  )
}
