import { createSlice } from '@reduxjs/toolkit';
// import { AsyncStorage } from "react-native"
export const jwtSlice = createSlice({
  name: 'jwt',
  initialState: {
    token: '',
    user_id: '',
    userName: '',
    userEmail: '',
    userProfile: ''
  },
  reducers: {
    addJwtToken: (state, action) => {
      state.token = action.payload.token;
      // state.user_id = action.payload.user_id
    },
    removeJwtToken: (state, action) => {
      state.token = '';
      // state.user_id = action.payload.user_id
    },
    userInformation: (state, action) => {
      state.userName = action.payload.userName,
        state.userEmail = action.payload.userEmail,
        state.userProfile = action.payload.userProfile
    },
  },
});

export const { addJwtToken, removeJwtToken, userInformation } = jwtSlice.actions;
export default jwtSlice.reducer;
