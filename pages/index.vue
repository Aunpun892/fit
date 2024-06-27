<script setup lang="ts">
    import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
    email: string().email("Invalid email").required("Required"),
    password: string().min(8,"Password must be atleast 8 charecters.").required("Required")
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(state.email)
   
}
  </script>


<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-gray-900 h-96 w-[56rem] rounded-lg grid grid-cols-2">
      <div class="flex flex-col space-y-3 mt-8 ml-8">
        <h1 class="font-bold text-5xl">Grubin Login</h1>
        <p>Using K account</p>
        <UButton color="primary" class="h-10 flex justify-center w-64">Email/Password Signup</UButton>
        <UButton color="blue" class="h-10 flex justify-center w-64">Create/Login with Google</UButton>
        <UButton color="indigo" class="h-10 flex justify-center w-64">Forgot password</UButton>
      </div>
      <div class="flex flex-col space-y-2 mt-8 mr-8">  
        <UForm class="mt-8  " :schema="schema" :state="state" @submit="onSubmit()">
            <UFormGroup label="Email:" name="email">
              <UInput class="h-10 flex justify-center" v-model="state.email" />
            </UFormGroup>
            <UFormGroup label="Password:" class="mt-3 mb-3" name="password">
              <UInput type="password" v-model="state.password" class="h-10 flex justify-center" />

            </UFormGroup>
            <UButton type="submit" class="h-10 flex justify-center w-full ">Login</UButton>
        </UForm>
       </div>
    </div>
  </div>
  </template>