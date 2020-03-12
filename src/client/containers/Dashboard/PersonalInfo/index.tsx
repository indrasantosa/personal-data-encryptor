import React, { useEffect } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { getPersonalInfo } from '../../../../common/redux/screens/indexPersonalInfo/action';
import { getScreenState, ApplicationRootState } from '../../../../common/redux';

const FxRates = () => {
  const dispatch = useDispatch();
  const infoLists = useSelector(state =>
    getScreenState(state as ApplicationRootState)
  );

  const fetchInitialData = (page = 1) => {
    dispatch(getPersonalInfo({ page }));
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className={'w-full p-4'}>
      <h2 className={'text-2xl'}>Personal Info</h2>
      <table className={'w-full'}>
        <thead>
          <tr>
            <th className={'border-gray-500 border p-2'}>id</th>
            <th className={'border-gray-500 border p-2'}>Label</th>
            <th className={'border-gray-500 border p-2'}>Actions</th>
            <th className={'border-gray-500 border p-2'}>Create Date</th>
          </tr>
        </thead>
        <tbody>
          {[].map((item: FxModel) => {
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
    </div>
  );
};

export default FxRates;
