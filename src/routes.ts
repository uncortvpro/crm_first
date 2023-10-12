import Authorize from './pages/Authorize.vue'
import Profile from './pages/Profile.vue'
import Clients from './pages/Clients.vue'
import Protocols from './pages/Protocols.vue'
import MailingList from './pages/MailingList.vue'
import BIProzzoro from './pages/BIProzzoro.vue'

import { useAuthStore } from './stores'

export const routes = [
  {
    name: 'Authorize',
    path: '/',
    component: Authorize,
    beforeEnter: async (to: any, from: any) => {
      const auth = useAuthStore();
      const isToken = await auth.checkToken();
      if (isToken) {
        return { name: 'Profile' }
      }
    },
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile,
    beforeEnter: async (to: any, from: any) => {
      const auth = useAuthStore();
      const isToken = await auth.checkToken();
      if (!isToken) {
        return { name: 'Authorize' }
      }
    },
    redirect: () => {
      return { name: 'Clients' }
    },
    children: [
      {
        name: "Clients",
        path: 'clients',
        component: Clients
      },
      {
        name: "Protocols",
        path: 'protocols',
        component: Protocols
      },
      {
        name: "MailingList",
        path: 'mailing_list',
        component: MailingList
      },
      {
        name: "BIProzzoro",
        path: 'bi_prozzoro',
        component: BIProzzoro
      }
    ]
  },
]
