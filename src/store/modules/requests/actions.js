import { firebaseUrl } from '../../../firebase';
export default {
  async contactCoach(context, payload) {
    // Create format object out of the payload.
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message,
    };

    // Send post request to firebase.
    const response = await fetch(
      `${firebaseUrl}requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = response.json();
    // Error handling
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request');
      throw error;
    }

    // Set the ID coming back from firebase to the local object for Vuex.

    newRequest.id = responseData.name; // ".name" is the ID provided by firebase
    newRequest.coachId = payload.coachId; // Firebase will automatically assign the coachId via the url in the post request. Here I am assigning the coachId to the request data after it has been posted to firebase, so that it remains available in the vuex store.
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `${firebaseUrl}requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Could not get requests');
      throw error;
    }
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
