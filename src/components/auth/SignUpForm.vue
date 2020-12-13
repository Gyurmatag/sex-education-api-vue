<template>
  <div class="p-4 w-full justify-center">
    <div class="w-full max-w-sm m-auto p-5 rounded bg-gray-800">
      <div class="flex text-xl justify-center mb-5 text-white">
        {{ $t('signUp.form.title') }}
      </div>
      <form @submit.prevent="onSubmit">
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="email"
          >{{ $t('signUp.form.email') }}</label>
          <input
            id="email"
            v-model="vv.emailAddress.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="email"
            name="email"
            :class="{ 'ring-4 ring-red-600': vv.emailAddress.$error }"
          >
          <div
            v-if="vv.emailAddress.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.emailAddress?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="email"
          >{{ $t('signUp.form.username') }}</label>
          <input
            id="username"
            v-model="vv.username.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="text"
            name="username"
            :class="{ 'ring-4 ring-red-600': vv.username.$error }"
          >
          <div
            v-if="vv.username.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.username?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="password"
          >{{ $t('signUp.form.password') }}</label>
          <input
            id="password"
            v-model="vv.password.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="password"
            name="password"
            :class="{ 'ring-4 ring-red-600': vv.password.$error }"
          >
          <div
            v-if="vv.password.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.password?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            class="p-2 rounded-lg text-white font-bold bg-primary disabled:opacity-50 disabled:cursor-default"
            :disabled="vv.$invalid || signUpLoading"
          >
            {{ $t('common.submit') }}
          </button>
        </div>
        <div
          v-if="signUpError"
          class="flex justify-start text-md text-white"
        >
          {{ $t('signUp.error.signUpRequest') }}: {{ signUpError.message }}
        </div>
      </form>
      <div class="text-sm text-white">
        {{ $t('signUp.alreadyUser.question') }}
        <router-link to="/auth/login">
          <span class="font-extrabold hover:text-primary cursor-pointer">
            {{ $t('signUp.alreadyUser.action') }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { toRef, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { useMutation } from '@vue/apollo-composable'

import signUpMutation from '@/graphql/mutations/remote/signUp.mutation.gql'
import router from '@/router'

export default {
  name: 'SignUpForm',

  setup () {
    const signUpForm = reactive({
      emailAddress: '',
      username: '',
      password: ''
    })
    const rules = {
      emailAddress: { required, email },
      username: { required },
      password: { required }
    }

    const vv = useVuelidate(rules, {
      emailAddress: toRef(signUpForm, 'emailAddress'),
      username: toRef(signUpForm, 'username'),
      password: toRef(signUpForm, 'password')
    })

    const {
      mutate: signUp,
      loading: signUpLoading,
      error: signUpError,
      onDone: signUpDone
    } = useMutation(signUpMutation, () => ({
      variables: {
        email: signUpForm.emailAddress,
        username: signUpForm.username,
        password: signUpForm.password
      }
    }))

    const onSubmit = () => {
      vv.value.$touch()
      if (vv.value.$invalid) return
      signUp()
    }

    signUpDone(result => {
      router.push('/auth/login')
    })

    return { vv, onSubmit, signUpLoading, signUpError }
  }
}
</script>
