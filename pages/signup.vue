
<script setup lang="ts">
    import { object, string, type InferType } from 'yup'
 import type { FormSubmitEvent } from '#ui/types'
import auth from '~/firebase/auth';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
const schema = object({
    email: string().email("Invalid email").required("Required"),
    password: string().min(8,"Password must be atleast 8 charecters.").required("Required")
})
 const email_in_use = ref(false)
type Schema = InferType<typeof schema>

const state = reactive({
  email: "",
  password: ""
})

async function onSubmit ( ) {
  // Do something with event.data
  createUserWithEmailAndPassword(auth, state.email ,state.password)
   .then(async (usercredentials) => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then(async(credent) => {
        await navigateTo('https://google.com', {
  external: true
})
      }).catch((error) => {
      console.log(error)
    })
      
    }).catch((error) => {
     
      if ( error.message == "Firebase: Error (auth/email-already-in-use)."){
        email_in_use.value = true
      }
    })

   
  }
 
  </script>


<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-gray-900 h-96 w-[56rem] rounded-lg grid grid-cols-2">
      <div class="flex flex-col space-y-3 mt-8 ml-8">
        <h1 class="font-bold text-5xl">Grubin Sign in</h1>
        <p class="text-sm">Using email and password</p>
        <UButton   color="blue" class="h-10 flex justify-center w-64" to="/">Email/Password Signup</UButton>
   
      </div>
      <div class="flex flex-col space-y-2 mt-8 mr-8">  
        <UForm class="mt-8  " :schema="schema" :state="state" @submit="onSubmit()">
            <UFormGroup label="Email:" name="email">
              <UInput class="h-10 flex justify-center" v-model="state.email" />
            </UFormGroup>
            <UFormGroup label="Password:" class="mt-3 mb-3" name="password">
              <UInput type="password" v-model="state.password" class="h-10 flex justify-center" />

            </UFormGroup>
            <UButton type="submit" class="h-10 flex justify-center w-full ">Sign up</UButton>
        </UForm>
       </div>
    </div>
    <UModal v-model="email_in_use"> 
      <div class="flex justify-center ">
        <h1>This email is already in use</h1>
      </div>
    </UModal>
  </div>
  </template>