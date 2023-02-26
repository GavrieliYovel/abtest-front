import React from 'react';


import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart, MdHelp,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";

import EditAccount from "views/admin/editAccount";
import Users from "views/admin/users";
import Plans from "views/admin/plans";
import Account from "views/admin/accounts";

import Myaccount from "views/admin/myAccount";
import DataTables from 'views/admin/dataTables';

import EditExperiment from "views/admin/editExperiment";
import Defult from "views/admin/default";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";


// import Logs from "views/admin/logs";

import Logs from "views/admin/logs";
import ExperimentPage from "views/admin/experimentPage";
import CreateExperiment from "views/admin/createExperiment";

// Auth Imports

import SignInCentered from 'views/auth/signIn';
import ForgotPass from 'views/auth/forgetPassword';
import SignUpCentered from 'views/auth/signUp';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard
  },
  {
    name: "Account-edit",
    layout: "/admin",
    icon: <Icon as={MdHelp} width='20px' height='20px' color='inherit' />,
    path: "/edit-account/:id",
    component: EditAccount
    },
    {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: DataTables
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile

import SignInCentered from "views/auth/signIn";
import expirement from "views/admin/expirement";


const routes = [
  {
    name: "Home Page",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Logs",
    layout: "/admin",
    path: "/logs",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Logs,
    secondary: true
  },
  {
    name: "Experiment Page",
    layout: "/admin",
    path: "/experimentPage",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    component: ExperimentPage,

  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Users
    },
    {
    name: 'Forgot Password',
    layout: '/auth',
    path: '/forgot-password',
    component: ForgotPass
  },
  {

    name: 'Sign Up',
    layout: '/auth',
    path: '/sign-up',
    component: SignUpCentered
  },
  {
    name: "Account",
    layout: "/admin",
    path: "/account",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Account,
  },
  {
    name: "myAccount",
    layout: "/admin",
    path: "/my-account",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Myaccount,
  },
  {
    name: 'Confirm Code',
    layout: '/auth',
    path: '/confirm-code',
    component: SignUpCentered
  },
  {
    name: 'Plans',
    layout: '/admin',
    path: '/plans',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Plans
  }


    name: "Experiment",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/experiments",
    component: expirement,
  },
  {
    name: "Edit Experiment",
    layout: "/admin",
    path: "/editExperiment",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: EditExperiment,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Create Experiment",
    layout: "/admin",
    path: "/createExperiment",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: CreateExperiment,
  }

];

export default routes;
