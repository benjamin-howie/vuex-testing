<template>
  <form @submit.prevent="submitForm" action="#">
    <div class="form-control" :class="{ invalid: !formData.firstName.isValid }">
      <label for="firstName">First Name</label>
      <input
        type="text"
        @blur="formData.firstName.validate"
        id="firstName"
        v-model.trim="formData.firstName.value"
      />
      <p v-if="!formData.firstName.isValid">Please fill in a first name</p>
    </div>
    <div class="form-control" :class="{ invalid: !formData.lastName.isValid }">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        @blur="formData.lastName.validate"
        v-model.trim="formData.lastName.value"
      />
      <p v-if="!formData.lastName.isValid">Please fill in a last name</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !formData.description.isValid }"
    >
      <label for="description">Description</label>
      <textarea
        @blur="formData.description.validate"
        name="description"
        id="description"
        cols="30"
        rows="5"
        v-model.trim="formData.description.value"
      ></textarea>
      <p v-if="!formData.description.isValid">Please fill in a description</p>
    </div>
    <div class="form-control" :class="{ invalid: !formData.rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        @blur="formData.rate.validate"
        id="rate"
        v-model.number="formData.rate.value"
      />
      <p v-if="!formData.rate.isValid">Please fill in a rate</p>
    </div>
    <fieldset
      class="form-control"
      :class="{ invalid: !formData.areas.isValid }"
    >
      <legend>Your areas of expertise</legend>
      <div>
        <input
          @blur="formData.areas.validate"
          type="checkbox"
          value="frontend"
          id="frontend"
          v-model="formData.areas.value"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          @blur="formData.areas.validate"
          type="checkbox"
          value="backend"
          id="backend"
          v-model="formData.areas.value"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          @blur="formData.areas.validate"
          type="checkbox"
          value="career"
          id="career"
          v-model="formData.areas.value"
        />
        <label for="career">Career Advice</label>
      </div>
      <p v-if="!formData.areas.isValid">
        Please pick at least one area of expertise
      </p>
    </fieldset>
    <base-button>Register</base-button>
  </form>
  <h1 v-if="!formIsValid">Please check all fields are fill correctly.</h1>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      formData: {
        firstName: {
          value: '',
          isValid: true,
          validate() {
            this.isValid = this.value !== '';
            return this.isValid;
          },
        },
        lastName: {
          value: '',
          isValid: true,
          validate() {
            this.isValid = this.value !== '';
            return this.isValid;
          },
        },
        description: {
          value: '',
          isValid: true,
          validate() {
            this.isValid = this.value !== '';
            return this.isValid;
          },
        },
        rate: {
          value: null,
          isValid: true,
          validate() {
            this.isValid = this.value !== null && this.value > 0;
            return this.isValid;
          },
        },
        areas: {
          value: [],
          isValid: true,
          validate() {
            this.isValid = this.value.length > 0;
            return this.isValid;
          },
        },
      },
      formIsValid: true,
    };
  },

  methods: {
    validateForm() {
      this.formIsValid = true;
      // Check through all the inputs and run their validate method. If the validate method returns false, break out of the loop and set the form as invalid.
      for (const [inputName, inputObj] of Object.entries(this.formData)) {
        console.log(inputName);
        if (!inputObj.validate()) {
          this.formIsValid = false;
        }
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        ...this.formData,
      };
      const coachData = {
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        description: formData.description.value,
        rate: formData.rate.value,
        areas: formData.areas.value,
      };
      this.$emit('save-data', coachData);
    },
  },
};
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
