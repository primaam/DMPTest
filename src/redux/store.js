import {configureStore} from '@reduxjs/toolkit';
import JobDataStore from './JobRed';
import JobDetailDataStore from './JobDetailRed';

export const store = configureStore({
  reducer: {
    JobDataStore,
    JobDetailDataStore,
  },
});
