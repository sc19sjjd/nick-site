<template>
  <div class="relative z-10" id="title">
    <WrappersFullScreen class="flex-col">
      <!-- <div class="w-full h-80 sm:h-72 lg:h-64"></div> -->
      <div class="flex justify-center h-dvh xsm:justify-between">
        <div class="flex flex-col pt-20">
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

    <div class="absolute -z-10 left-0 top-0 w-full h-full flex justify-center items-end">
      <div class="ellipse bg-black overflow-hidden">
        <video class="main-video" autoplay muted loop playsinline preload="metadata">
          <source src="/public/videos/pathways-av.mp4" type="video/mp4" />
        </video>
      </div>
    </div>

    <!-- <div class="absolute -z-10 left-0 top-0 w-full h-full flex justify-center overflow-visible">
      <div class="ellipse">
        <video class="main-video" autoplay muted loop playsinline preload="metadata">
          <source src="/public/videos/pathways-av.mp4" type="video/mp4" />
        </video>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
  .ellipse {
    clip-path: ellipse(110% 50% at center);
    width: 200%;
    height: 150%;
    min-width: 1100px;
    transform: translateY(7rem);
  }

  .main-video {
    width: 100%;
    height: 100%;
    transform: translate(20rem, 20rem) scale(1.2);
  }
</style>