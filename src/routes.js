import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import Plans from 'views/admin/plans';

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
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
    secondary: true
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
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered
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
];

export default routes;
