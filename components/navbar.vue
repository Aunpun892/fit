<script setup lang="ts">
 
const route = useRoute()

const links = [{
  label: 'Korawit Longjun',
    icon: "i-heroicons-user-circle",
  badge: "17942 THB"
}, {
  label: 'Expenses/Income',
   icon: 'i-heroicons-currency-dollar'
,
  to: '/getting-started/installation'
}, {
  label: 'Settings',
 icon: "i-heroicons-cog-6-tooth",
  to: '/components/command-palette'
}, {
  label: 'Analytics',
 icon: "i-heroicons-chart-pie",
  to: '/components/command-palette',
  
}]
 
</script>

<template>
    <div  >
        <UHorizontalNavigation class="  outline-white" :links="links" />
       

    </div>
</template>