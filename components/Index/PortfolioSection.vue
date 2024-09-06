<template>
  <section class="bg-background">
  
    <div class="navbar sticky top-0">
      <NavBar :underline="'portfolio'" />
    </div>

    <div class="w-full pt-4"></div>
    <WrappersContent id="portfolio">
      <div class="flex flex-col w-full pb-2 pt-10 xs:pt-12 sm:pt-14 md:pt-16">
        <h1 class="text-orange-600 text-5xl 2xs:text-5xl sm:text-6xl text-center" style="font-family: 'Archivo Black', sans-serif;">
          Portfolio
        </h1>

        <!-- <div class="flex flex-col lg:flex-row justify-between items-center">
          <IndexPortoflioCaseStudyCard />
          <div class="pb-10 lg:hidden"></div>
          <IndexPortoflioCaseStudyCard />
        </div> -->
      </div>
    </WrappersContent>
    
    
    <div class="pb-10 xs:pb-12 sm:pb-14 md:pb-16 pt-10 xs:pt-12 sm:pt-14 md:pt-16 flex flex-col justify-between">
        <div class="relative overflow-visible">

          <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <!-- <div class="rounded-full z-10 bg-orange-800 opacity-10 blur-2xl"
            style="width: 100px; height: 100px; transform: translateY(-00px) scale(7)"></div> -->
          </div>

          <IndexPortoflioCarousel v-model:center-item="centerItemIndex" />
        </div>

        <WrappersFullScreen>
          <div class="w-full z-20 flex-col items-center text-center pt-4 sm:pt-6 md:pt-4 pb-6 sm:pb-8 md:pb-10">
            <h3 class="text-lg sm:text-xl">{{ titles[centerItemIndex] }} {{ centerItemIndex }}</h3>
            <p class="text-sm font-light">{{ descriptions[centerItemIndex] }} {{ centerItemIndex }}</p>
          </div>
        </WrappersFullScreen>

        <div class="relative w-full text-black shadow-background">
          <IndexPortoflioSeeMore  />
        </div>

    </div>
  </section>
</template>

<style scoped>
  .navbar {
    z-index: 110;
  }
</style>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

  const centerItemIndex = ref<number>(0);

  const titles = Array(8).fill('3D Environments');
  const descriptions = Array(8).fill("Done in blender with after effects and 3ds max");

</script>