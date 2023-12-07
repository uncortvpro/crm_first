import Authorize from './pages/Authorize.vue'
import Profile from './pages/Profile.vue'
import Clients from './pages/Clients.vue'
import Protocols from './pages/Protocols.vue'
import MailingSearch from './pages/MailingSearch.vue'
import SendMail from './pages/SendMail.vue';
import BIProzzoro from './pages/BIProzzoro.vue'

import { useAuthStore } from './stores'

export const routes = [
  {
    name: 'Authorize',
    path: '/',
    component: Authorize,
    // @ts-ignore
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
    // @ts-ignore
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
        name: "MailingSearch",
        path: 'mailing_search',
        component: MailingSearch
      },
      {
        name: "SendMail",
        path: 'send_mail',
        component: SendMail
      },
      {
        name: "BIProzzoro",
        path: 'bi_prozzoro',
        component: BIProzzoro
      }
    ]
  },
]
