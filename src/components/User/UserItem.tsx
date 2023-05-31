import React from 'react';
import { IUser } from 'types';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { ReactComponent as TrashIcon } from 'assets/trash.svg';
import styles from './index.module.scss';

interface IUserItemProps {
  user: IUser;
  onDelete: () => void;
  onUpdate: () => void;
}

export const UserItem: React.FC<IUserItemProps> = ({ user, onDelete, onUpdate }) => {
  return (
    <tr>
      <td>
        <img data-testid="user-avatar" className={styles.avatar} src={user.avatar} width="50" height="50" alt={`${user.name} ${user.lastName}`} />
      </td>
      <td>{user.name} {user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.age}</td>
      <td>
        {user.linkToWebsite &&
          <a
            className="hover:underline hover:text-light-1"
            target="_blank"
            href={user.linkToWebsite}
            rel="noreferrer"
          >
            Website
          </a>
        }
        {!user.linkToWebsite && <span className="text-orange-700 text-sm">No Website Link</span>}
      </td>
      <td>{user.tags}</td>
      <td>
        <div className="flex items-center px-2">
          <EditIcon data-testid="edit-icon" className={styles.editIcon} onClick={onUpdate} />
          <TrashIcon data-testid="delete-icon" className={styles.trashIcon} onClick={onDelete} />
        </div>
      </td>
    </tr>
  )
}