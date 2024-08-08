<template>
  <div ref="carouselContainer" class="pt-8 pb-8 px-4 w-full relative">
    <div class="absolute -z-10 top-0 left-0 w-full h-full flex justify-between items-center px-2">
      <div class="w-14 h-14 z-20 rounded-full flex justify-center items-center opacity-30 transform rotate-180 hover:opacity-100 hover:cursor-pointer 
        hover:bg-background hover:shadow-2xl shadow-black transition duration-500">
        <img src="/public/icons/arrow-white.png" alt="arrow" class="w-8 h-8" />
      </div>
      <div class="w-14 h-14 z-20 rounded-full flex justify-center items-center opacity-30 hover:opacity-100 hover:cursor-pointer 
        hover:bg-background hover:shadow-2xl shadow-2xl shadow-black transition duration-500">
        <img src="/public/icons/arrow-white.png" alt="arrow" class="w-8 h-8" />
      </div>
    </div>

    <div ref="carouselContent" class="w-full flex flex-row justify-center">
      <ul class="list-none whitespace-nowrap overflow-x-scroll snap-x snap-mandatory scroll-smooth" style="max-width: 80rem">
        <li v-for="i in Array(8).keys()" key="i" class="inline-block snap-center">
          <img class="rounded-xl w-full" src="/images/Environment tryout 1.png" alt="Case study 1" style="width: 25rem" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

</script>

<style scoped>
  ul {
    scrollbar-width: none;
  }
</style>