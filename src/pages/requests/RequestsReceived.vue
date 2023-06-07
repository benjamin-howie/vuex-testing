<template>
  <div>
    <base-dialog @close="handleError" :show="!!error" title="An error occured">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="request in requests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.userMessage"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (e) {
        this.error = e.message || 'Something went wrong.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    ...mapGetters('requests', ['requests', 'hasRequests']),
  },
  created() {
    this.loadRequests();
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
