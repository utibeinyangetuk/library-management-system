<template>
  <div>
    <form>
      <label>Username:</label>
      <input type="text" v-model="username" />

      <label>Password:</label>
      <input type="password" v-model="password" />

      <p>
        <a href="#">Forgot Password</a>
        <a href="#">Create Account</a>
      </p>

      <label>Sign in as:</label>
      <select v-model="userType">
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button @click="submitLogin">Sign In</button>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      userType: 'member'
    }
  },
  methods: {
    submitLogin() {
      // Implement your login logic here.
      // You can access the username, password, and userType
      // from the data object.
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  label {
    margin-top: 10px;
    font-weight: bold;
  }

  input[type="text"], input[type="password"] {
    width: 100%;
    padding: 5px;
    margin-top: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: lightblue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  p {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  a {
    color: blue;
    text-decoration: none;
  }

  select {
    width: 100%;
    margin-top: 10px;
    padding: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
</style>
