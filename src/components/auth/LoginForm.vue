<template>
  <div class="w-full max-w-sm m-auto bg-gray-800 rounded p-5">
    <div class="flex text-xl text-white justify-center mb-5">
      Login
    </div>
    <form @submit.prevent="onSubmit">
      <div class="h-28">
        <label
          class="block mb-2 text-white"
          for="email"
        >Email</label>
        <input
          id="email"
          v-model="vv.emailAddress.$model"
          class="w-full p-2 border-b-2 outline-none"
          type="email"
          name="email"
          :class="{ 'is-invalid': vv.emailAddress.$error }"
        >
        <div
          v-if="vv.emailAddress.$error"
          class="block text-white"
        >
          <span>{{ vv?.emailAddress?.$errors[0]?.$message }}</span>
        </div>
      </div>
      <div class="h-28">
        <label
          class="block mb-2 text-white"
          for="password"
        >Password</label>
        <input
          id="password"
          v-model="vv.password.$model"
          class="w-full p-2 border-b-2 outline-none"
          type="password"
          name="password"
          :class="{ 'is-invalid': vv.password.$error }"
        >
        <div
          v-if="vv.password.$error"
          class="block text-white"
        >
          <span>{{ vv?.password?.$errors[0]?.$message }}</span>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="text-white font-bold bg-primary p-2 rounded-lg">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { toRef, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

export default {
  name: 'LoginForm',

  setup () {
    const loginForm = reactive({
      emailAddress: '',
      password: ''
    })
    const rules = {
      emailAddress: { required, email },
      password: { required }
    }

    const vv = useVuelidate(rules, {
      emailAddress: toRef(loginForm, 'emailAddress'),
      password: toRef(loginForm, 'password')
    })

    const onSubmit = () => {
      vv.value.$touch()
    }

    return { vv, onSubmit }
  }
}
</script>

<style scoped>

</style>