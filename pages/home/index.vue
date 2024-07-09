<script setup lang="ts">
import { object, string, type InferType, number,  } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
 

const months = [
  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
  { label: 'May', value: 'May' },
  { label: 'June', value: 'June' },
  { label: 'July', value: 'July' }, // Assuming July is already present
  { label: 'August', value: 'August' },
  { label: 'September', value: 'September' },
  { label: 'October', value: 'October' },
  { label: 'November', value: 'November' },
  { label: 'December', value: 'December' },
];


const aemdl = ref(false)
const aimdl = ref(false)
const schema = object({
    expense: string().required("This is required!"),
     Cost: string().required("This is required").min(0),
     category: object().required("This   is required!"),
     Day: number().required("This is required!").max(31).min(1) ,
     month: object().required("This is required!"),
     Year: number().required("This is required!").min(1).max(9999)
 })

type Schema = InferType<typeof schema>

const state = reactive({
    expense: undefined,
     Cost: undefined,
    category: undefined,
    Day: undefined,
    month:undefined,
    Year: undefined
  
})
async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
async function onSubmitAi (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
  console.log("ello")
}
</script>

<template>
    <div  >
        <Navbar />

       <div class="flex justify-center mt-12">
        <div class=" w-[64rem]">
            <h1 class="ml-7">Balance: 17,942 THB  </h1>
            <div class=" ml-7 flex space-x-5 ">
                
                <div class=" flex flex-col">
                    <UButton   class="h-10 justify-center   w-32 " @click="aemdl = true" >Add Expense</UButton>
                </div>
                <div class=" flex flex-col">
                    <UButton   class="h-10 justify-center   w-32 " @click =" aimdl = true">Add Income</UButton>
                </div>
                 
            </div>
        </div>
       </div>
       <UModal v-model="aemdl" >
        <div class="    m-7  ">
            <h1>Add Expense</h1>
            <UForm :schema="schema" :state="state" class="space-y-2" @submit="onSubmit">
                <UFormGroup    label="Expense:" name="expense">
                    <UInput v-model="state.expense" placeholder="Your expense" />
                </UFormGroup>
                <UFormGroup    label="Cost:" name="cost">
                    <UInput v-model="state.Cost" placeholder="Your expense's cost" type="number" step="0.1" />
                </UFormGroup>
                <UFormGroup name="category" label="Category">
      <USelectMenu v-model="state.category" placeholder="Select category" :options="months" />
    </UFormGroup>
    <UFormGroup    label="Day:" name="Day">
                    <UInput v-model="state.Day" placeholder="Day"    type="number"   />
                </UFormGroup>
                <UFormGroup name="month" label="Month">
      <USelectMenu v-model="state.month" placeholder="Month" :options="months"  />
    </UFormGroup>
    <UFormGroup    label="Year:" name="Year">
                    <UInput v-model="state.Year" placeholder="Year"    type="number"   />
                </UFormGroup>
                <UButton class="w-full flex justify-center" type="submit">Add</UButton>
            </UForm>
        </div>  
       </UModal>
       <UModal v-model="aimdl" >
        <div class="    m-7  ">
            <h1>Add Expense</h1>
            <UForm :schema="schema" :state="state" class="space-y-2" @submit="onSubmitAi">
                <UFormGroup    label="Expense:" name="expense">
                    <UInput v-model="state.expense" placeholder="Your expense" />
                </UFormGroup>
                <UFormGroup    label="Cost:" name="cost">
                    <UInput v-model="state.Cost" placeholder="Your expense's cost" type="number" step="0.1" />
                </UFormGroup>
                <UFormGroup name="category" label="Category">
      <USelectMenu v-model="state.category" placeholder="Select category" :options="months" />
    </UFormGroup>
    <UFormGroup    label="Day:" name="Day">
                    <UInput v-model="state.Day" placeholder="Day"    type="number"   />
                </UFormGroup>
                <UFormGroup name="month" label="Month">
      <USelectMenu v-model="state.month" placeholder="Month" :options="months"  />
    </UFormGroup>
    <UFormGroup    label="Year:" name="Year">
                    <UInput v-model="state.Year" placeholder="Year"    type="number"   />
                </UFormGroup>
                <UButton class="w-full flex justify-center" type="submit">Add</UButton>
            </UForm>
        </div>  
       </UModal>
    </div>
</template>