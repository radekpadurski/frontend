import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  content: TickerDetails | undefined;
}

interface Results {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}
export interface TickerDetails {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: Results[];
  status: string;
  request_id: string;
  count: number;
}

const initialState: ModalState = {
  isOpen: false,
  content: undefined
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TickerDetails>) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = undefined;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
