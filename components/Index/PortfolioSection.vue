<template>
  <section class="bg-slate-600 z-30">
  
    <div class="sticky top-0 z-30">
      <NavBar :underline="'portfolio'" />
    </div>

    <div class="w-full pt-4"></div>
  <WrappersContent id="portfolio">
    <div class="flex flex-col w-full pb-2 pt-20">
      <h1 class="text-orange-700 text-5xl xsm:text-5xl sm:text-6xl pb-20 text-center" style="font-family: 'Archivo Black', sans-serif;">
        Portfolio
      </h1>
      <div class="flex flex-col lg:flex-row justify-between items-center">
        <IndexPortoflioCaseStudyCard />
        <div class="pb-10 lg:hidden"></div>
        <IndexPortoflioCaseStudyCard />
      </div>
    </div>
  </WrappersContent>
  
  
  <div class="min-h-svh py-20 flex flex-col justify-between">
    <!-- <div class="flex flex-col space-between"> -->

      <div class="relative overflow-visible">
        <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div class="rounded-full z-10 bg-orange-500 opacity-20 blur-2xl"
          style="width: 100px; height: 100px; transform: translateY(-100px) scale(7)"></div>
        </div>

        <IndexPortoflioCarousel v-model:center-item="centerItemIndex" />
      </div>

      <WrappersFullScreen>
        <div class="w-full z-20 flex-col items-center text-center pt-8 pb-10">
          <h3 class="text-xl">{{ titles[centerItemIndex] }} {{ centerItemIndex }}</h3>
          <p class="text-sm font-light">{{ descriptions[centerItemIndex] }} {{ centerItemIndex }}</p>
        </div>
      </WrappersFullScreen>

      <div class="relative w-full text-black shadow-background">
        <!-- <div class="absolute top-0 left-0 w-full h-6 bg-background -z-10"></div> -->

        <!-- <div class="w-full flex justify-center">
          <Button>See more</Button>
        </div> -->
          
        <!-- <div class="pb-6"></div> -->

        <IndexPortoflioSeeMore  />
      </div>

    <!-- </div> -->
  </div>
  </section>
</template>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

  const centerItemIndex = ref<number>(0);

  const titles = Array(8).fill('3D Environments');
  const descriptions = Array(8).fill("Done in blender with after effects and 3ds max");

</script>