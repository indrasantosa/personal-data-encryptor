import React, { useEffect } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { getFxRates } from '../../../../common/redux/screens/fxPage/action';
import { ApplicationRootState, getScreenState } from '../../../../common/redux';
import { getRates } from '../../../../common/redux/screens/loginPage/reducer';
import { getFxRatesPage } from '../../../../common/redux/screens';
import { getPersonalInfo } from '../../../../common/redux/screens/indexPersonalInfo/action';

const FxRates = () => {
  const dispatch = useDispatch();

  const fetchInitialData = (page = 1) => {
    dispatch(getPersonalInfo({ page }));
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className={'w-full p-4'}>
      <h2 className={'text-2xl'}>Personal Info</h2>
      <button>Create</button>
      <table className={'w-full'}>
        <thead>
          <tr>
            <th className={'border-gray-500 border'}>id</th>
            <th className={'border-gray-500 border'}>From Currency</th>
            <th className={'border-gray-500 border'}>To Currency</th>
            <th className={'border-gray-500 border'}>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((item: FxModel) => {
            return (
              <tr key={item.id}>
                <td className={'border-gray-500 border p-2'}>{item.id}</td>
                <td className={'border-gray-500 border p-2'}>
                  {item.fromCurrencyname}
                </td>
                <td className={'border-gray-500 border p-2'}>
                  {item.toCurrencyname}
                </td>
                <td className={'border-gray-500 border p-2'}>
                  {item.exchangerate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {[1, 2].map((item, index) => {
          return (
            <button
              className={`px-4 py-2 border mr-2 mt-2`}
              onClick={e => fetchFxRates(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FxRates;
