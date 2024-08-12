<template>
  <WrappersContent>
    <div class="flex flex-col w-full pb-2 pt-20">
      <h1 class="text-orange-700 text-5xl xsm:text-5xl sm:text-6xl pb-20 text-center" style="font-family: 'Archivo Black', sans-serif;">
        Portfolio
      </h1>
      <div class="flex flex-col lg:flex-row justify-between items-center z-30">
        <IndexPortoflioCaseStudyCard />
        <div class="pb-10 lg:hidden"></div>
        <IndexPortoflioCaseStudyCard />
      </div>
    </div>
  </WrappersContent>
  
  
  <div class="min-h-svh pt-20 flex flex-col justify-between">
    <!-- <div class="flex flex-col space-between"> -->

      <div class="relative overflow-visible">
        <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div class="rounded-full z-10 bg-orange-300 opacity-30 blur-3xl"
          style="width: 100px; height: 100px; transform: translateY(-60px) scale(3.5)"></div>
        </div>

        <IndexPortoflioCarousel v-model:center-item="centerItemIndex" />
      </div>

      <WrappersFullScreen>
        <div class="w-full z-20 flex-col items-center text-center pb-8 pt-4">
          <h3 class="text-xl">{{ titles[centerItemIndex] }} {{ centerItemIndex }}</h3>
          <p class="text-sm font-light">{{ descriptions[centerItemIndex] }} {{ centerItemIndex }}</p>
        </div>
      </WrappersFullScreen>

      <div class="bg-orange-200 relative w-full text-black z-20 pb-10 shadow-inner shadow-background">
        <!-- <div class="absolute top-0 left-0 w-full h-6 bg-background -z-10"></div> -->

        <!-- <div class="w-full flex justify-center">
          <Button>See more</Button>
        </div> -->
          
        <div class="pb-6"></div>

        <IndexPortoflioSeeMore  />
      </div>

    <!-- </div> -->
  </div>

  <!-- <div class="w-full pt-16 text-xl">{{ centerItem }}</div> -->

  <!-- <a href="https://www.flaticon.com/free-icons/next" title="next icons">Next icons created by Roundicons - Flaticon</a> -->
</template>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

  const centerItemIndex = ref<number>(0);

  const titles = Array(8).fill('3D Environments');
  const descriptions = Array(8).fill("Done in blender with after effects and 3ds max");

</script>