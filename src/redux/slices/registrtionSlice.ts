import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

interface IInitialState {
  user: IUser | null;
  error : null | string
  
}

const initialState: IInitialState = {
  user: null,
  error:null
};

const getUsers = async (): Promise<IUser[]> => {
  const usersResult = await fetch(`http://localhost:5000/users`);
  const users = await usersResult.json();
  return users;
};

export const login = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: { message: string } }
>("user/login", async (userForm, { rejectWithValue }) => {
  const users = await getUsers();
  const checkUser = users.find(
    (user) =>
      user.login === userForm.login && userForm.password === user.password
  );

  const checkUserPassword = users.some(
    (user) =>
      user.login === userForm.login && userForm.password !== user.password
  );

  if (checkUserPassword)
    return rejectWithValue({ message: "Please enter correct password" });
  if (!checkUser)
    return rejectWithValue({ message: "Couldn't find your account" });

  return checkUser;
});

export const registration = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: { message: string } }
>("user/registration", async (userForm, { rejectWithValue }) => {
  const users = await getUsers();
  const checkUser = users.some(
    (user) => user.login === userForm.login || user.phone === userForm.phone
  );

  if (!checkUser) {
    const result = await fetch(`http://localhost:5000/users`, {
      method: "POST",
      body: JSON.stringify(userForm),
      headers: { "Content-Type": "application/json" },
    });

    const user:IUser = await result.json();
    return user;
  } else {
    return rejectWithValue({ message: "User already register" });
  }
});

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.error = null
        state.user = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : null
        
      }).addCase(login.fulfilled, (state, action) => {
        state.error = null
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : null
      })
  },
});

export default registrationSlice.reducer;
