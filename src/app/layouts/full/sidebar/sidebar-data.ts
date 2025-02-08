import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Cuentas',
  },
  {
    displayName: 'Usuarios',
    iconName: 'solar:widget-add-line-duotone',
    route: '/users',
  },
  // {
  //   displayName: 'Dashboard',
  //   iconName: 'solar:widget-add-line-duotone',
  //   route: '/dashboard',
  // },
  // {
  //   navCap: 'Gestión',
  //   divider: true
  // },
  // {
  //   displayName: 'Ventas',
  //   iconName: 'solar:archive-minimalistic-line-duotone',
  //   route: '/admin/sale',
  // },
  {
    displayName: 'Ventas',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/admin/sales',
  },
  {
    displayName: 'Empleados',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/admin/employees',
  },
  {
    displayName: 'Transportistas',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/admin/carriers',
  },
  {
    displayName: 'Inventario Productos',
    iconName: 'solar:file-text-line-duotone',
    route: '/admin/products-inventory',
  },
  {
    displayName: 'Productos',
    iconName: 'solar:file-text-line-duotone',
    route: '/admin/products',
  },
  // {
  //   displayName: 'Badge',
  //   iconName: 'solar:archive-minimalistic-line-duotone',
  //   route: '/admin/badge',
  // },
  // {
  //   displayName: 'Chips',
  //   iconName: 'solar:danger-circle-line-duotone',
  //   route: '/admin/chips',
  // },
  // {
  //   displayName: 'Lists',
  //   iconName: 'solar:bookmark-square-minimalistic-line-duotone',
  //   route: '/admin/lists',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'solar:text-field-focus-line-duotone',
  //   route: '/admin/tooltips',
  // },
  // {
  //   displayName: 'Forms',
  //   iconName: 'solar:file-text-line-duotone',
  //   route: '/admin/forms',
  // },
  // {
  //   displayName: 'Tables',
  //   iconName: 'solar:tablet-line-duotone',
  //   route: '/admin/tables',
  // },
  // {
  //   navCap: 'Auth',
  //   divider: true
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'solar:login-3-line-duotone',
  //   route: '/authentication/login',
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'solar:user-plus-rounded-line-duotone',
  //   route: '/authentication/register',
  // },
  // {
  //   navCap: 'Extra',
  //   divider: true
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'solar:sticker-smile-circle-2-line-duotone',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'solar:planet-3-line-duotone',
  //   route: '/extra/sample-page',
  // },
];
