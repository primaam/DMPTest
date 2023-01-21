import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  res: {},
};

const jobDetailSlice = createSlice({
  name: 'JOB_DETAIL_SLICE',
  initialState,
  reducers: {
    storeJobDetailData: (state, actions) => {
      state.res = actions.payload;
    },
  },
});

export default jobDetailSlice.reducer;
export const {storeJobDetailData} = jobDetailSlice.actions;
