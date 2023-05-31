import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { IUser, FormStatus } from 'types';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { addUser, updateUser, updateFormStatus } from 'store/user/slice';
import { fileToDataUrl } from 'utils';
import "react-toastify/dist/ReactToastify.css";

interface IUserFormProps {
  user?: IUser;
}


export const UserForm: React.FC<IUserFormProps> = ({ user }) => {
  const navigate = useNavigate();
  const formStatus = useAppSelector(state => state.users.formStatus)
  const { register, formState: { errors }, handleSubmit, setValue } = useForm()
  const dispatch = useAppDispatch();
  const [avatarFile, setAvatarFile] = useState<File>()
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar);

  useEffect(() => {
    // if 'user' exists(when editing a user), fill the form with the given value.
    if (user) {
      const keys: Array<keyof IUser> = ['name', 'lastName', 'email', 'phoneNumber', 'age', 'linkToWebsite', 'tags'];
      keys.forEach((key) => setValue(key, user[key]));
    }
    dispatch(updateFormStatus(FormStatus.NONE)); // initialize form status

    return () => { }
  }, [user, setValue, dispatch]);

  // redirect if the form status is SUCCESS.
  useEffect(() => {
    if (formStatus === FormStatus.SUCCESS) {
      dispatch(updateFormStatus(FormStatus.NONE));
      toast.success('Success');
      setTimeout(() => {
        navigate('/');
      }, 2000)
    }
    if (formStatus === FormStatus.FAILURE) {
      dispatch(updateFormStatus(FormStatus.NONE));
      toast.error('Failure');
    }

  }, [formStatus, navigate, dispatch]);

  const handleOnSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAvatarFile(e.target.files[0]);
      fileToDataUrl(e.target.files[0]).then(dataUrl => setAvatarUrl(dataUrl))
    }
  }

  const handleOnSubmit = handleSubmit((data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })
    formData.append('avatar', user?.avatar || "");
    if (avatarFile) {
      formData.append('avatarFile', avatarFile)
    }
    if (user) {
      dispatch(updateUser({
        id: user.id,
        data: formData
      }))
    } else {
      dispatch(addUser(formData))
    }
  })

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input data-testid="input-name" type="text" {...register("name", { required: true, maxLength: 50 })} />
          {errors.name?.type === 'required' && <p className="form-error">Name is required!</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input data-testid="input-lastName" type="text" {...register("lastName", { required: true, maxLength: 50 })} />
          {errors.lastName?.type === 'required' && <p className="form-error">Last name is required!</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input data-testid="input-email" type="text" {...register("email", { required: true, maxLength: 50 })} />
          {errors.email?.type === 'required' && <p className="form-error">Email is required!</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input data-testid="input-phoneNumber" type="text" {...register("phoneNumber", { required: true, maxLength: 15 })} />
          {errors.phoneNumber?.type === 'required' && <p className="form-error">PhoneNumber is required!</p>}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input data-testid="input-age" type="number" {...register("age", { required: true })} />
          {errors.age?.type === 'required' && <p className="form-error">Age is required!</p>}
        </div>

        <div className="form-group">
          <label>Avatar</label>
          {
            avatarUrl && <img data-testid="img-avatar" className="" src={avatarUrl} width="100" height="100" alt="Avatar" />
          }
          <input data-testid="input-avatarFile" className="text-light px-0" type="file" name="avatarFile" onChange={handleOnSelectFile} />
        </div>

        <div className="form-group">
          <label>Link To Website</label>
          <input data-testid="input-linkToWebsite" type="text" {...register("linkToWebsite")} />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <textarea data-testid="input-tags" {...register("tags")} ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            className="button"
            type="submit">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}