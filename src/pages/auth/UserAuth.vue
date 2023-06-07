<template>
  <div>
    <base-dialog :show="!!error" title="Error" @close="handleError">{{
      error
    }}</base-dialog>
    <base-dialog title="Authenticating..." :show="isLoading" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please ensure the e-mail is filled correctly and that the passwod is
          longer than 6 characters.
        </p>
        <base-button>{{ submitButtonTitle }}</base-button>
        <base-button @click="switchAuthMode" type="button" mode="flat">{{
          switchModeButtonTitle
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  computed: {
    submitButtonTitle() {
      return this.loginMode ? 'Login' : 'Sign Up';
    },
    switchModeButtonTitle() {
      return this.loginMode ? 'Sign Up' : 'Login';
    },
  },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      loginMode: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      // Trivial validation

      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const authData = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.loginMode) {
          await this.$store.dispatch('login', authData);
        } else {
          await this.$store.dispatch('signUp', authData);
        }
      } catch (e) {
        this.error = e.message;
      }
      const redirectPath = this.$route.query.redirect || { name: 'coaches' };
      this.$router.replace(redirectPath);
      this.isLoading = false;
    },
    switchAuthMode() {
      this.loginMode = !this.loginMode;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
