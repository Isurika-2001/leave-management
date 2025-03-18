export const rootPaths = {
  homeRoot: '',
  pagesRoot: 'pages',
  applicationsRoot: 'applications',
  ecommerceRoot: 'ecommerce',
  authRoot: 'authentication',
  notificationsRoot: 'notifications',
  calendarRoot: 'calendar',
  messageRoot: 'messages',
  errorRoot: 'error',
  leaveRoot: 'leave',
  adminRoot: 'admin',
};

export default {
  home: `/${rootPaths.homeRoot}`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  leaveRequest: `/${rootPaths.leaveRoot}/leave-request`,
  leaveHistory: `/${rootPaths.leaveRoot}/leave-history`,
  leaveApproval: `/${rootPaths.leaveRoot}/leave-approval`,
  departmentManagement: `/${rootPaths.adminRoot}/department-management`,
  employeeManagement: `/${rootPaths.adminRoot}/employee-management`,
  leaveQuotaManagement: `/${rootPaths.adminRoot}/leave-quota-management`,
  notFound: `/${rootPaths.errorRoot}/404`,
};
