import React, { useState } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import FxRates from './FxRates';
import CfdPage from './Cfd';

const Dashboard = () => {
  return (
    <div className='flex-1 items-center flex flex-row'>
      <div className={'w-56 bg-gray-800 h-full flex-column'}>
        <NavLink
          to={'/dashboard/fx-rates'}
          className={'flex-1 p-4 block text-white'}
        >
          FX Rates
        </NavLink>
        <NavLink
          to={'/dashboard/cfd'}
          className={'flex-1 p-4 block text-white'}
        >
          CFD
        </NavLink>
      </div>
      <div className='w-full mx-auto object-center flex-1 h-full'>
        <Navigation />
        <Switch>
          <Route path={'/dashboard/fx-rates'}>
            <FxRates />
          </Route>
          <Route path={'/dashboard/cfd'}>
            <CfdPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
