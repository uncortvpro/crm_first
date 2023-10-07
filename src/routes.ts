import Authorize from './pages/Authorize.vue'
import Profile from './pages/Profile.vue'
import Clients from './pages/Clients.vue'
import Protocols from './pages/Protocols.vue'
import MailingList from './pages/MailingList.vue'
import BIProzzoro from './pages/BIProzzoro.vue'

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
        redirect: to => {
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
