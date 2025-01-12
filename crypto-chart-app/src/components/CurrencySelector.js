import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrencyPair } from '../Store/cryptoSlice';

const CurrencySelector = () => {
  const dispatch = useDispatch();
  const currencyPair = useSelector((state) => state.crypto.currencyPair);

  const handleChange = (e) => {
    dispatch(setCurrencyPair(e.target.value));
  };

  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1 text-lg">Select Coin</label>
      <select
        value={currencyPair}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded w-64"
      >
        <option value="BTCUSDT">BTC / USDT</option>
        <option value="ETHUSDT">ETH / USDT</option>
        <option value="BNBUSDT">BNB / USDT</option>
        <option value="XRPUSDT">XRP / USDT</option>
      </select>
    </div>
  );
};

export default CurrencySelector;