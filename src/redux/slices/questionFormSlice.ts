import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionFormState {
  answers: Record<number, { questionString: string; answer: string }>;
}

const initialState: QuestionFormState = {
  answers: {},
};

const questionFormSlice = createSlice({
  name: 'questionForm',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionId: number; questionString: string; answer: string }>) => {
      const { questionId, questionString, answer } = action.payload;
      state.answers[questionId] = { questionString, answer };
    },
    clearAnswers: (state) => {
      state.answers = {};
    },
  },
});

export const { setAnswer, clearAnswers } = questionFormSlice.actions;
export default questionFormSlice.reducer;
