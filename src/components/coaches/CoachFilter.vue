<template>
  <base-card>
    <h2>Find a Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked v-model="filters.frontend" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked v-model="filters.backend" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked v-model="filters.career" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-fitler'],
  props: ['initialFilters'],
  data() {
    return {
      filters: {
        ...this.initialFilters,
      },
    };
  },

  watch: {
    filters: {
      handler(newFilters) {
        this.$emit('change-filter', newFilters);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
