import { Analytics, MasterSheet, TestSheet, Logout } from '../pages';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const routes = [
    {
        type: 'sideBar',
        name: 'Master Sheet',
        key: 'masterSheet',
        component: MasterSheet,
        route: '/main/master',
        protected: true,
        icon: <ListAltIcon />
    },
    {
        type: 'sideBar',
        name: 'Test Master',
        key: 'testSheet',
        component: TestSheet,
        route: '/main/test',
        protected: true,
        icon: <ListAltIcon />
    },
    {
        type: 'sideBar',
        name: 'Analytics',
        key: 'analytics',
        component: Analytics,
        route: '/main/analytics',
        protected: true,
        icon: <AnalyticsIcon />
    },
    {
        type: 'sideBar',
        name: 'Log out',
        key: 'logout',
        route: '/main/logout',
        component: () => Logout(),
        protected: true,
        icon: <LogoutIcon />
    },
]