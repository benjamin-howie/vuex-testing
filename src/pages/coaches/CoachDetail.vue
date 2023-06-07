<template>
  <div>
    <base-dialog @close="handleError" :show="!!error" title="An error occured">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else>
      <section>
        <base-card>
          <h2>{{ fullName }}</h2>
          <h3>£{{ rate }}/hour</h3>
        </base-card>
      </section>
      <section>
        <base-card>
          <header>
            <h2>Interested?</h2>
            <base-button link :to="contactCoachLink"
              >Contact {{ fullName }}</base-button
            >
          </header>
          <router-view></router-view>
        </base-card>
      </section>
      <section class="">
        <base-card>
          <base-badge
            v-for="area in areas"
            :key="area"
            :type="area"
            :title="area"
          ></base-badge>
          <p>{{ description }}</p>
        </base-card>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseBadge from '../../components/base/BaseBadge.vue';
export default {
  components: { BaseBadge },

  data() {
    return {
      selectedCoach: {},
      isLoading: false,
      error: null,
    };
  },
  props: ['id'], // Comes from the route
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactCoachLink() {
      return { name: 'contact-coach', params: { id: this.id } };
    },
    ...mapGetters('coaches', ['coaches', 'singleCoach']),
  },
  methods: {
    async fetchCoaches() {
      await this.$store.dispatch('coaches/loadCoaches', {
        forceRefresh: false,
      });
    },
    async loadCoach() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('coaches/findCoachById', this.id);
        this.selectedCoach = this.singleCoach;
        this.isLoading = false;
      } catch (e) {
        this.error = 'Something went wrong';
      }
    },
    handleError() {
      this.error = null;
      this.$router.replace({ name: 'coaches' });
    },
  },
  created() {
    this.loadCoach();
  },
};
</script>
