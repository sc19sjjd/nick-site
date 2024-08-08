<template>
  <WrappersContent>
    <div class="flex flex-col w-full pt-20">
      <h1 class="text-orange-700 text-5xl xsm:text-5xl sm:text-6xl" style="font-family: 'Archivo', sans-serif;">
        <!-- Portfolio -->
      </h1>
      <div class="flex justify-between pb-10">
        <IndexPortoflioCaseStudyCard />
        <IndexPortoflioCaseStudyCard />
      </div>
    </div>
  </WrappersContent>
  
  <!-- <div class="w-full h-1 bg-gradient-to-r from-20% from-orange-700 to-80% to-orange-700 via-accent"></div> -->

  <IndexPortoflioCarousel />

  <div class="w-full pt-16"></div>

  <!-- <div class="w-full h-1 bg-gradient-to-r from-20% from-orange-700 to-80% to-orange-700 via-accent"></div> -->

  <!-- <a href="https://www.flaticon.com/free-icons/next" title="next icons">Next icons created by Roundicons - Flaticon</a> -->
</template>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

  const carouselContainer = ref<NullableHTMLElement>(null);



</script>