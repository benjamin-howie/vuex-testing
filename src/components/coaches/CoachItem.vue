<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>£{{ hourlyRate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
    </div>
    <nav class="actions">
      <base-button link mode="outline" :to="coachContactLink"
        >Contact</base-button
      >
      <base-button link :to="coachDetailLink">View Details</base-button>
    </nav>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'hourlyRate', 'areas'],
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    coachContactLink() {
      return { name: 'contact-coach', params: { id: this.id } };
    },
    coachDetailLink() {
      return { name: 'coach-detail', params: { id: this.id } };
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
