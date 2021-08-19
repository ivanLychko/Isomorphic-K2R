import Home from './Content/Home';;
import Users from './Content/Users';

const routes = [
    {
        path: '/',
        component: Home,
        nameLink: 'Home',
        isShow: true,
        role: ['admin', 'manager']
    },
    {
        path: '/users',
        component: Users,
        nameLink: 'Users',
        isShow: true,
        role: ['admin']
    }

    
];

export default routes;