import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import store from './store/index';

import UserAuth from './pages/auth/UserAuth.vue';

import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      name: 'coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      props: true,
      name: 'coach-detail',
      component: CoachDetail,
      children: [
        {
          path: 'contact',
          name: 'contact-coach',
          component: ContactCoach,
          props: true,
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: CoachRegistration,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsReceived,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth,
      meta: {
        requiresUnauth: true,
      },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ name: 'auth' });
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next({ name: 'coaches' });
  } else {
    next();
  }
});

export default router;
