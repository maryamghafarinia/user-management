import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser, FormStatus } from "types";
import type { RootState } from "store";
import * as userProvider from "providers/user";

// Define the initial state using that type
interface IUserState {
  list: IUser[];
  page: number;
  formStatus: FormStatus;
}
const initialState: IUserState = {
  list: [],
  page: 0,
  formStatus: FormStatus.NONE,
};

export const getUsers = createAsyncThunk(
  "/users/getUsers",
  // limit = 50 assumes to loading all users on loading.
  ({ page = 1, limit = 50 }: { page?: number; limit?: number }) => {
    return userProvider.getUsersRequest(page, limit);
  }
);

export const addUser = createAsyncThunk(
  "/users/createUser",
  (userInfo: FormData) => {
    return userProvider.addUserRequest(userInfo);
  }
);

export const updateUser = createAsyncThunk(
  "/users/updateUser",
  ({ id, data }: { id: number; data: FormData }) =>
    userProvider.updateUserRequest(id, data)
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  (id: number) => userProvider.deleteUserRequest(id)
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFormStatus: (state, action: PayloadAction<FormStatus>) => {
      state.formStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.list = action.payload as IUser[];
    });

    // Add a User
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload as IUser);
        state.formStatus = FormStatus.SUCCESS;
      })
      .addCase(addUser.pending, (state) => {
        state.formStatus = FormStatus.PENDING;
      })
      .addCase(addUser.rejected, (state) => {
        state.formStatus = FormStatus.FAILURE;
      });

    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        const _user = action.payload as IUser;
        state.list = state.list.map((user) =>
          user.id === _user.id ? _user : user
        );
        state.formStatus = FormStatus.SUCCESS;
      })
      .addCase(updateUser.pending, (state) => {
        state.formStatus = FormStatus.PENDING;
      })
      .addCase(updateUser.rejected, (state) => {
        state.formStatus = FormStatus.FAILURE;
      });

    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (user) => user.id !== (action.payload as IUser).id
        );
        state.formStatus = FormStatus.SUCCESS;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.formStatus = FormStatus.FAILURE;
      });
  },
});

export const { updateFormStatus } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users;

export default userSlice.reducer;
