<template>
  <div>
    <base-dialog @close="handleError" :show="!!error" title="An error occured">
      <p>{{ error }}</p>
    </base-dialog>
    <coach-filter
      :initialFilters="filters"
      @change-filter="setFilter"
    ></coach-filter>
    <section>
      <base-card>
        <menu class="controls">
          <base-button @click="loadCoaches(true)" mode="outline"
            >Refresh</base-button
          >
          <base-button v-if="!isLoggedIn" link :to="authWithRedirect"
            >Login to Register as a Coach</base-button
          >
          <base-button v-if="showRegisterButton" link :to="{ name: 'register' }"
            >Register as coach</base-button
          >
        </menu>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          List of Coaches
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            v-bind="coach"
          >
            {{ coach.firstName }}
          </coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: true,
      error: null,
    };
  },
  methods: {
    setFilter(updatedFilters) {
      this.filters = updatedFilters;
    },

    async loadCoaches(forceRefresh = false) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('coaches/loadCoaches', { forceRefresh });
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        this.error = e.message || 'Something went wrong';
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    authWithRedirect() {
      const redirectPath = this.$router.resolve({ name: 'register' }).href || {
        name: 'coaches',
      };
      return { name: 'auth', query: { redirect: redirectPath } };
    },
    showRegisterButton() {
      return this.isLoggedIn && !this.isCoach && !this.isLoading;
    },
    filteredCoaches() {
      return this.coaches.filter((coach) => {
        // Loop through the coaches.
        return coach.areas.some((area) => {
          // Check if any of the areas that the Coach is associated with are set to true in the filters object.
          return this.filters[area];
        });
      });
    },
    isLoggedIn() {
      return this.$store.getters['isAuthenticated'];
    },
    ...mapGetters('coaches', ['coaches', 'isCoach', 'hasCoaches']),
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  padding: 0;
  display: flex;
  justify-content: space-between;
}
</style>
