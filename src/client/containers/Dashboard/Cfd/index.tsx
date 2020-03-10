import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCfdData } from '../../../../common/redux/screens/cfdPage/action';
import { getCfdReportPage } from '../../../../common/redux/screens';
import { getScreenState, ApplicationRootState } from '../../../../common/redux';
import {
  getCfdReportData,
  CfdModel
} from '../../../../common/redux/screens/cfdPage/reducer';

export const Cfd = () => {
  const dispatch = useDispatch();
  const cfdData: Array<CfdModel> = useSelector((state: ApplicationRootState) =>
    getCfdReportData(getCfdReportPage(getScreenState(state)))
  );
  const fetchCfdReport = (currency: string) => {
    dispatch(getCfdData(currency));
  };

  useEffect(() => {
    fetchCfdReport('GBP');
  }, []);

  return (
    <div className={'w-full p-4'}>
      <span className={'mr-2'}>Currency</span>
      <select className={'mb-4'} onChange={e => fetchCfdReport(e.target.value)}>
        <option>GBP</option>
        <option>USD</option>
        <option>EUR</option>
      </select>
      {cfdData.map(dataSet => {
        return (
          <table className={'w-full mb-8'}>
            <thead>
              <tr>
                {dataSet.headers.map((item: string) => {
                  return <th className={'border-gray-500 border'}>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {dataSet.data.map((data: Array<string>) => {
                return (
                  <tr>
                    {data.map(item => {
                      return (
                        <td className={'border-gray-500 border p-2'}>{item}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default Cfd;
