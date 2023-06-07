export default {
  addRequest(state, payload) {
    state.requests = [...state.requests, payload];
  },
  setRequests(state, payload) {
    state.requests = payload; // payload should be array of request objects.
  },
};
