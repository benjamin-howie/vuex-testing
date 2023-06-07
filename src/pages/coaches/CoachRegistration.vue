<template>
  <base-dialog @close="handleError" :show="!!error" title="An error occured">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a Coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import { mapActions } from 'vuex';
export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveData(data) {
      try {
        await this.registerCoach(data);
        this.$router.replace({ name: 'coaches' });
      } catch (e) {
        this.error = 'Something went wrong. Please try again later.';
      }
    },
    handleError() {
      this.error = null;
      this.$router.replace({ name: 'coaches' });
    },
    ...mapActions('coaches', {
      registerCoach: 'registerCoach',
    }),
  },
};
</script>
