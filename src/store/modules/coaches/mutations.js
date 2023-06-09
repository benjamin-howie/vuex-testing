export default {
  registerCoach(state, payload) {
    state.coaches = [...state.coaches, payload];
  },
  setCoaches(state, payload) {
    state.coaches = payload;
    state.coachesFetched = true;
  },
  setSingleCoach(state, payload) {
    state.singleCoach = payload;
  },
};
