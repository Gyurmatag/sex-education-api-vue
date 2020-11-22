<template>
  <div class="p-4 w-full justify-center">
    <login-form />
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm'

export default {
  name: 'Login',

  components: {
    LoginForm
  }
}
</script>

<style scoped>

</style>
