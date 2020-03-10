import React, { useState } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import FxRates from './FxRates';
import CfdPage from './Cfd';
import PersonalInfoPage from './PersonalInfo';
import PersonalInfoCreatePage from './PersonalInfoCreate';

const Dashboard = () => {
  return (
    <div className='flex-1 items-center flex flex-row'>
      <div className={'w-56 bg-gray-800 h-full flex-column'}>
        <NavLink
          to={'/dashboard/personal-info'}
          className={'flex-1 p-4 block text-white'}
        >
          Personal Info
        </NavLink>
        <NavLink
          to={'/dashboard/personal-info/create'}
          className={'flex-1 p-4 block text-white'}
        >
          Create Personal Info
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
          <Route exact path={'/dashboard/personal-info'}>
            <PersonalInfoPage />
          </Route>
          <Route path={'/dashboard/personal-info/create'}>
            <PersonalInfoCreatePage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
