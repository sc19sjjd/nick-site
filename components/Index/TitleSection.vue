<template>
  <section class="relative z-[300] justify-center bg-background" id="title">

    <div class="ellipse bg-background" :style="{ height: ellipseHeight }">
      <div ref="outerDivEl" class="" :style="{ transform: 'translateY(-4.8rem)', height: outerDivHeight }">

        <div ref="navBarEl" class="sticky top-0 z-50 text-white">
          <NavBar :underline="'home'" />
        </div>
      
        <WrappersFullScreen class="flex-col z-10 relative">
          <div ref="titleContentEl" class="flex justify-center h-lvh xs:justify-between items-center pb-24 xs:pb-20 sm:pb-16  md:pb-10">
            <div class="flex flex-col">
              <h1 class="text-orange-600 text-6xl xs:text-7.5xl sm:text-8xl md:text-9xl lg:text-10xl">
                NICHOLAS <br> CLAY
              </h1>
              <div class="xs:pb-1 sm:pb-2 lg:pb-2"></div>
              <h3 class="text-xl sm:text-2xl lg:text-3xl pl-1 xs:pl-2 lg:pl-3">
                3D modelling and animation
              </h3>
            </div>
          </div>
        </WrappersFullScreen>

      </div>
    </div>

    <!-- <div class="absolute left-0 top-0 w-full h-full flex justify-center items-end">
      <div class="ellipse bg-background overflow-hidden" :style="{ }">
        <div class="sticky top-0 z-50 text-white" style="transform: translateY(-4.8rem); z-index: 100">
          <NavBar :underline="'home'" />
        </div>

        <video class="main-video" autoplay muted loop playsinline preload="metadata">
          <source src="/public/videos/pathways-transparent.mp4" type="video/mp4" />
        </video>
      </div>
    </div> -->
  </section>
</template>

<style scoped>
  .ellipse {
    clip-path: ellipse(240% 100% at center top);
    width: 100%;
    height: 100%;
    transform: translateY(4.8rem);
  }

  @media (min-width: 480px) {
    .ellipse {
      clip-path: ellipse(200% 100% at center top);
    }
  }

  @media (min-width: 768px) {
    .ellipse {
      clip-path: ellipse(160% 100% at center top);
    }
  }

  .x-clip {
    clip-path: xywh(0 0 100% 120%);
  }

  .main-video {
    width: 100%;
    height: 100%;
    transform: translate(20rem, 20rem) scale(1.2);
  }

  h1 {
    font-family: 'Archivo black', sans-serif;
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