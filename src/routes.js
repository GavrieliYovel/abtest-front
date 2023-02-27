import React, {useState} from 'react';

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdDescription,
  MdLock,
  MdOutlineShoppingCart, MdHelp,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";

import EditAccount from "views/admin/editAccount";
import Users from "views/admin/users";
import Plans from "views/admin/plans";
import Account from "views/admin/accounts";
import Myaccount from "views/admin/myAccount";
import EditExperiment from "views/admin/editExperiment";
import Defult from "views/admin/default";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import expirement from "views/admin/expirement";

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
    name: "Home Page",
    layout: "/admin",
    path: "/default",
    component: MainDashboard,
  },
  {
    name: "Account-edit",
    layout: "/admin",
    path: "/edit-account/:id",
    component: EditAccount
    },
    {
    name: 'Data Tables',
    layout: '/admin',
    path: '/data-tables',
    component: DataTables
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    component: Profile,
  },
  {
    name: "Logs",
    layout: "/admin",
    path: "/logs",
    component: Logs,
    secondary: true
  },
  {
    name: "Experiment Page",
    layout: "/admin",
    path: "/experimentPage",
    component: ExperimentPage,

  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
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
    name: "Accounts",
    layout: "/admin",
    path: "/accounts",
    component: Account,
  },
  {
    name: "My Account",
    layout: "/admin",
    path: "/my-account",
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
    component: Plans

  },
  {
    name: "My Experiments",

    layout: "/admin",
    path: "/experiments",
    component: expirement,
  },
  {
    name: "Edit Experiment",
    layout: "/admin",
    path: "/editExperiment",
    component: EditExperiment,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    component: SignInCentered,
  },
  {
    name: "Create Experiment",
    layout: "/admin",
    path: "/createExperiment",
    component: CreateExperiment,
  }
  ];


export default routes;
