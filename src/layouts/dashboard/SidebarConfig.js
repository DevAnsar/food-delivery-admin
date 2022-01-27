import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'داشبورد',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'کاربران',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'فروشندگان',
    path: '/dashboard/deliveries',
    icon: getIcon(peopleFill)
  },
  {
    title: 'محصولات',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  }
];

export default sidebarConfig;
