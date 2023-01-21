import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  res: [],
};

const jobSlice = createSlice({
  name: 'JOB_SLICE',
  initialState,
  reducers: {
    storeJobData: (state, actions) => {
      state.res.push(actions.payload);
    },
  },
});

export default jobSlice.reducer;
export const {storeJobData} = jobSlice.actions;
