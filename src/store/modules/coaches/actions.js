import { firebaseUrl } from '../../../firebase';

function isCacheExpired(timestamp) {
  const currentTime = new Date().getTime(); // Current timestamp
  const elapsedTime = currentTime - timestamp;
  const isExpired = elapsedTime > 30 * 60 * 1000; // 30 minutes in milliseconds
  return isExpired;
}

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const coachToRegister = {
      firstName: data.firstName,
      lastName: data.lastName,
      hourlyRate: data.rate,
      description: data.description,
      areas: data.areas,
    };
    try {
      await fetch(`${firebaseUrl}coaches/${userId}.jsn?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify(coachToRegister),
      });
    } catch (e) {
      throw new Error(e);
    }

    localStorage.removeItem('cachedCoaches');

    context.commit('registerCoach', {
      ...coachToRegister,
      id: userId,
    });
  },

  async loadCoaches(context, payload) {
    const cachedCoaches = localStorage.getItem('cachedCoaches');
    if (cachedCoaches && !payload.forceRefresh) {
      const { timestamp, data } = JSON.parse(cachedCoaches);
      if (!isCacheExpired(timestamp)) {
        context.commit('setCoaches', data);
        return;
      }
    }

    const response = await fetch(`${firebaseUrl}coaches.json`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to get data');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        hourlyRate: responseData[key].hourlyRate,
        description: responseData[key].description,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    const currentTime = new Date().getTime(); // Current timestamp
    const dataToCache = {
      timestamp: currentTime,
      data: coaches,
    };
    localStorage.setItem('cachedCoaches', JSON.stringify(dataToCache));

    context.commit('setCoaches', coaches);
  },
  async findCoachById(context, payload) {
    // TO-DO: check caching

    // Check if coaches have been fetched. If so, find the coach using the existing state. If not, retrieve the coach via api.
    let foundCoach = null;
    if (
      context.getters.coaches.length !== 0 &&
      context.getters.coachesFetched
    ) {
      foundCoach = context.getters.coaches.find((coach) => {
        return coach.id === payload;
      });
    } else {
      const response = await fetch(`${firebaseUrl}coaches/${payload}.jsn`);
      foundCoach = await response.json();
    }

    context.commit('setSingleCoach', foundCoach);
  },
};
