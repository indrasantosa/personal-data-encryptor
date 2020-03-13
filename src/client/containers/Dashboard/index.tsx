import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import PersonalInfoPage from './PersonalInfo';
import PersonalInfoCreatePage from './PersonalInfoCreate';
import PersonalInfoShare from './PersonalInfoShare';
import PersonalInfoRetrieveShared from './PersonalInfoRetrieveShared';

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
          <Route
            exact
            path={'/dashboard/personal-info'}
            component={PersonalInfoPage}
          ></Route>
          <Route
            path={'/dashboard/personal-info/create'}
            component={PersonalInfoCreatePage}
          ></Route>
          <Route
            path={'/dashboard/personal-info/:infoShareId/share'}
            component={PersonalInfoShare}
          ></Route>
          <Route
            path={'/dashboard/retrieve-shared'}
            strict={false}
            component={PersonalInfoRetrieveShared}
          ></Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
