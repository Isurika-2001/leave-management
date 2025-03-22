export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: 'ion:home-sharp',
    active: true,
    collapsible: false,
  },
  {
    title: 'Authentication',
    path: 'authentication',
    icon: 'f7:exclamationmark-shield-fill',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Sign In',
        path: 'login',
        active: true,
        collapsible: false,
      },
      {
        title: 'Sign Up',
        path: 'sign-up',
        active: true,
        collapsible: false,
      },
      {
        title: 'Forgot password',
        path: 'forgot-password',
        active: true,
        collapsible: false,
      },
      {
        title: 'Reset password',
        path: 'reset-password',
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Leave',
    path: 'leave',
    icon: 'ion:calendar',
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'Leave Request',
        path: '/leave-request',
        active: false,
        collapsible: false,
      },
      {
        title: 'Leave History',
        path: '/leave-history',
        active: false,
        collapsible: false,
      },
      {
        title: 'Leave Approval',
        path: '/leave-approval',
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Department',
    path: '/department-management',
    icon: 'mingcute:grid-fill',
    active: true,
    collapsible: false
  },
  {
    title: 'Employee',
    path: '/employee',
    icon: 'ion:person',
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'List',
        path: '/employee-management',
        active: true,  // Set to true if you want it active by default
        collapsible: false,
      },
      {
        title: 'Leave Quota',
        path: '/leave-quota-management',
        active: false,
        collapsible: false,
      },
    ],
  },  
];

export default navItems;
