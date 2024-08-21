<template>
  <section class="relative z-50 justify-center bg-orange-300" id="title">
    <!-- <div class="sticky top-0 -z-10">
      <NavBar />
    </div> -->

    <div class="ellipse bg-slate-400" :style="{ height: ellipseHeight }">
      <div ref="outerDivEl" class="" :style="{ transform: 'translateY(-3rem)', height: outerDivHeight }">

        <div ref="navBarEl" class="sticky top-0 z-50 text-white">
          <NavBar />
        </div>
      
        <WrappersFullScreen class="flex-col z-20 relative">
          <!-- <div class="w-full h-80 sm:h-72 lg:h-64"></div> -->
          <div ref="titleContentEl" class="flex justify-center h-dvh xsm:justify-between pt-8">
            <div class="flex flex-col">
              <h1 class="text-orange-700 text-6xl xsm:text-7xl sm:text-8xl lg:text-9xl" style="font-family: 'Archivo black', sans-serif;">
                NICHOLAS <br> CLAY
              </h1>
              <div class="xsm:pb-1 sm:pb-2 lg:pb-2"></div>
              <h3 class="text-xl xsm:text-xl sm:text-2xl lg:text-3xl pl-1 xsm:pl-2 lg:pl-3">
                3D modelling <br class="hidden xsm:block"> and <br class="hidden xsm:block"> animation
              </h3>
            </div>
          </div>
          <!-- <div class="w-full h-80 sm:h-72 lg:h-64"></div> -->
        </WrappersFullScreen>

      </div>
    </div>

    <!-- <div class="absolute left-0 top-0 w-full h-full flex justify-center items-end">
      <div class="ellipse bg-background overflow-hidden"> -->
        <!-- <video class="main-video" autoplay muted loop playsinline preload="metadata">
          <source src="/public/videos/pathways-transparent.mp4" type="video/mp4" />
        </video> -->
      <!-- </div>
    </div> -->
  </section>
</template>

<style scoped>
  .ellipse {
    clip-path: ellipse(160% 100% at center top);
    width: 100%;
    height: 100%;
    min-width: 1100px;
    transform: translateY(3rem);
  }

  .main-video {
    width: 100%;
    height: 100%;
    transform: translate(20rem, 20rem) scale(1.2);
  }
</style>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

  const outerDivEl = ref<NullableHTMLElement>(null);
  const titleContentEl = ref<NullableHTMLElement>(null);
  const navBarEl = ref<NullableHTMLElement>(null);

  const contentHeight = computed(() => {
    if (!outerDivEl.value || !titleContentEl.value || !navBarEl.value) {
      return 0;
    }

    // height in rem
    let height = ((navBarEl.value!.clientHeight + titleContentEl.value!.clientHeight) / 16);

    return height;
  });

  const ellipseHeight = computed(() => {
    if (contentHeight.value === 0) {
      return '100%';
    } else {
      return `${contentHeight.value}rem`;
    }
  });

  const outerDivHeight = computed(() => {
    if (contentHeight.value === 0) {
      return '100%';
    } else {
      return `${contentHeight.value + 6}rem`;
    }
  });
</script>