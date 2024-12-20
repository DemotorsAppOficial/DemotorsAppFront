import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceFormState {
  answers: Record<number, { serviceDescription: string; answer: string }>;
}

const initialState: ServiceFormState = {
  answers: {},
};

const serviceFormSlice = createSlice({
  name: 'serviceForm',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ serviceId: number; serviceDescription: string; answer: string }>) => {
      const { serviceId, serviceDescription, answer } = action.payload;
      state.answers[serviceId] = { serviceDescription, answer };
    },
    clearAnswers: (state) => {
      state.answers = {};
    },
  },
});

export const { setAnswer, clearAnswers } = serviceFormSlice.actions;
export default serviceFormSlice.reducer;
