import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: "user",
  initialState: {
    logged : false,
    name : "None",
    type : "Auxiliar",
    userId : 0,
    email : "None"
  },
  reducers: {
    login: (state, action) => {
      let user = action.payload[0];
      state.logged = true;
      state.name = user.name;
      state.type = user.rol;
      state.userId = user.userId;
      state.email = user.email;
    },
    logout: (state) => {
      state.logged = false;
      state.name = "";
      state.type = "";
      state.userId = 0;
      state.email = "";
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer