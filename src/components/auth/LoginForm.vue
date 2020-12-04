<template>
  <div class="w-full max-w-sm m-auto p-5 rounded bg-gray-800">
    <div class="flex text-xl justify-center mb-5 text-white">
      {{ $t('login.title') }}
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
        <button
          class="p-2 disabled:opacity-50 rounded-lg text-white font-bold bg-primary"
          :disabled="loginLoading"
        >
          {{ $t('common.submit') }}
        </button>
      </div>
      <div
        v-if="loginError"
        class="flex justify-start text-md text-white"
      >
        {{ $t('login.error.loginRequest') }}: {{ loginError.message }}
      </div>
    </form>
  </div>
</template>

<script>
import { toRef, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { useMutation } from '@vue/apollo-composable'

import loginMutation from '@/graphql/mutations/login.mutation.gql'
import authDataLocalQuery from '@/graphql/queries/authDataLocal.query.gql'
import router from '@/router'

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

    const {
      mutate: login,
      loading: loginLoading,
      error: loginError,
      onDone: loginDone
    } = useMutation(loginMutation, () => ({
      variables: {
        email: loginForm.emailAddress,
        password: loginForm.password
      },
      update: (cache, { data: { login } }) => {
        const data = cache.readQuery({ query: authDataLocalQuery })
        data.authDataLocal = {
          __typename: 'AuthDataLocal',
          accessToken: login.accessToken,
          accessTokenExpiration: login.accessTokenExpiration,
          user: login.user
        }
        cache.writeQuery({ query: authDataLocalQuery, data })
      }
    }))

    const onSubmit = () => {
      vv.value.$touch()
      if (vv.value.$invalid) return
      login()
    }

    loginDone(result => {
      router.push('/dashboard')
    })

    return { vv, onSubmit, loginLoading, loginError }
  }
}
</script>

<style scoped>

</style>
