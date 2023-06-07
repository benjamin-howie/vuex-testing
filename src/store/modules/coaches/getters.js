export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    return state.coaches.some((coach) => {
      return coach.id === rootGetters.userId;
    });
  },
  coachesFetched(state) {
    // Boolan to check if we have fetched the coaches already
    return state.coachesFetched;
  },
  singleCoach(state) {
    return state.singleCoach;
  },
};
