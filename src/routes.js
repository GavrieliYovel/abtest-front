import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import EditExperiment from "views/admin/editExperiment";
import Defult from "views/admin/default";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// import Logs from "views/admin/logs";

import Logs from "views/admin/logs";
import ExperimentPage from "views/admin/experimentPage";
import CreateExperiment from "views/admin/createExperiment";

// Auth Imports
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
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
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
