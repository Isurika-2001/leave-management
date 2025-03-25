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
  departmentRoot: '',  // Updated to reflect the new root path for department
  employeeRoot: 'employee',  // Updated to reflect the new root path for employee
  leaveQuotaRoot: 'leave-quota',  // Updated to reflect the new root path for leave-quota
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
  leaveApprovalView: `/${rootPaths.leaveRoot}/leave-approval/:id`,
  departmentManagement: `/${rootPaths.departmentRoot}/department-management`,  // Updated path for department
  employeeManagement: `/${rootPaths.employeeRoot}/employee-management`,  // Updated path for employee
  leaveQuotaManagement: `/${rootPaths.employeeRoot}/leave-quota-management`,  // Updated path for leave-quota under employee
  notFound: `/${rootPaths.errorRoot}/404`,
};
