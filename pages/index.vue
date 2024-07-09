<script setup lang="ts">
    import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '~/firebase/auth';
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
 
 
 

const provider = new GoogleAuthProvider();
const schema = object({
    email: string().email("Invalid email").required("Required"),
    password: string().min(8,"Password must be atleast 8 charecters.").required("Required")
})

type Schema = InferType<typeof schema>
const errormsg = ref("")
const errormdl = ref(false)
const state = reactive({
  email: "",
  password: ""
})
const ier = ref(false)
async function onSubmit ( ) {
  // Do something with event.data
  signInWithEmailAndPassword(auth, state.email, state.password)
      .then(async(credent) => {
        await navigateTo('https://google.com', {
  external: true
})
      }).catch((error) => {
      if (error.message === "Firebase: Error (auth/invalid-credential)."){
        errormsg.value = "Incorrect Password or Email"
        errormdl.value = true
      }
    })
}
 function googleLogin(){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
 }
 
 const isOpen = ref(false)
 const isOpenForPwd = ref(false)
const password_reset_email = ref("")
function resetpwd(){
  sendPasswordResetEmail(auth,password_reset_email.value)
    .then(() => {
       isOpen.value = false
       isOpenForPwd.value = true
    }) .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorMessage === "Firebase: Error (auth/invalid-email)."){
      ier.value = true
    }
    // ..
  })
 }
  </script>


<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-gray-900 h-96 w-[56rem] rounded-lg grid grid-cols-2">
      <div class="flex flex-col space-y-3 mt-8 ml-8">
        <h1 class="font-bold text-5xl">Grubin Login</h1>
        <p class="text-sm">Using K account</p>
        <UButton   color="primary" class="h-10 flex justify-center w-64" to="/signup">Email/Password Sign up</UButton>
        <UButton color="blue" class="h-10 flex justify-center w-64" @click="googleLogin()" >Create/Login with Google</UButton>
        <UButton color="indigo" class="h-10 flex justify-center w-64" @click="isOpen = true">Forgot password</UButton>
      </div>
      <div class="flex flex-col space-y-2 mt-12 mr-5    ">  
        <UForm class="mt-8 ml-7  " :schema="schema" :state="state" @submit="onSubmit()">
            <UFormGroup label="Email:" name="email">
              <UInput class="h-10 flex justify-center" v-model="state.email" />
            </UFormGroup>
            <UFormGroup label="Password:" class="mt-3 mb-3" name="password">
              <UInput type="password" v-model="state.password" class="h-10 flex justify-center" />

            </UFormGroup>
            <p v-if="errormdl" class="text-red-500">{{ errormsg }} !</p>
            <UButton type="submit" class="h-10 flex justify-center w-full ">Login</UButton>
        </UForm>
       </div>
    </div>
    <UModal v-model="isOpen"    > 
      
      <div   class="flex justify-center  flex-col m-5 space-y-3"  >
        <h1 class="text-center">Enter your account email</h1>
        <UInput   v-model="password_reset_email" class="h-10 flex justify-center" />
        <p v-if="ier" class="text-red-500">Invalid email!</p>
       <UButton class="flex justify-center" @click="resetpwd()">Send password reset email</UButton>

      </div>   
       </UModal>
       <UModal v-model="isOpenForPwd"    > 
      
      <div   class="flex justify-center  flex-col m-5 space-y-3"  >
        <h1>Check your email</h1>
        <p>We sent an email that you can reset your password from.</p>
      </div>   
      
       </UModal>
     
  </div>
  </template>