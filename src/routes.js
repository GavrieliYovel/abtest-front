import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart, MdEdit, MdHelp,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import editAccount from "views/admin/editAccount";
import Users from "views/admin/users";
import Plans from "views/admin/plans";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Account-edit",
    layout: "/admin",
    icon: <Icon as={MdHelp} width='20px' height='20px' color='inherit' />,
    path: "/edit-account",
    component: editAccount,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/account",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Users,
  },
  {
    name: "Plans",
    layout: "/admin",
    path: "/plans",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Plans,
  },

];

export default routes;
