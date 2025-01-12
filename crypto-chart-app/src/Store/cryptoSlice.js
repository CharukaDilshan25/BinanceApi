import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currencyPair: 'BTCUSDT',
  dateRange: { startDate: null, endDate: null },
  priceData: [],
  status: 'idle',
  error: null,
};

export const fetchPriceData = createAsyncThunk(
  'crypto/fetchPriceData',
  async ({ currencyPair, startDate, endDate }) => {
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const interval = '1d';

    const response = await axios.get(
      `https://api.binance.com/api/v3/klines`,
      {
        params: {
          symbol: currencyPair,
          interval,
          startTime,
          endTime,
        },
      }
    );

    return response.data.map(([time, open, high, low, close]) => ({
      date: new Date(time).toLocaleDateString('en-GB'),
      close: parseFloat(close),
    }));
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCurrencyPair(state, action) {
      state.currencyPair = action.payload;
    },
    setDateRange(state, action) {
      const { startDate, endDate } = action.payload;
      state.dateRange = {
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPriceData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.priceData = action.payload;
      })
      .addCase(fetchPriceData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrencyPair, setDateRange } = cryptoSlice.actions;

export default cryptoSlice.reducer;