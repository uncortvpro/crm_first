import Authorize from './pages/Authorize.vue'
import Profile from './pages/Profile.vue'

export const routes = [
    {
        name: 'Authorize',
        path: '/',
        component: Authorize,
    },
    {
        name: 'Profile',
        path: '/profile',
        component: Profile,
    },
]
