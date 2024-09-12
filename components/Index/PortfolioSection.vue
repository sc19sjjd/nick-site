<template>
  <section class="bg-background">
  
    <div class="navbar sticky top-0">
      <NavBar :underline="'portfolio'" />
    </div>

    <div class="w-full pt-4"></div>
    <WrappersContent id="portfolio">
      <div class="flex flex-col w-full pb-2 pt-10 xs:pt-12 sm:pt-14 md:pt-16">
        <h1 class="text-orange-600 text-5xl 2xs:text-5xl sm:text-6xl text-center" style="font-family: 'Archivo Black', sans-serif;">
          Projects
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

        <!-- <WrappersFullScreen>
          <IndexPortoflioCarousel v-model:center-item="centerItemIndex" />
        </WrappersFullScreen> -->
      </div>

      <WrappersFullScreen>
        <div class="flex flex-col w-full justify-center">

          <ClientOnly>
            <div v-if="hasViewTimeline">
              <IndexPortoflioCarousel v-model:center-item="centerItemIndex" :data="portfolioDataPreviews" />
            </div>
            <div v-else>
              <IndexPortoflioSimpleCarousel v-model:selected-item="selectedItemIndex" :data="portfolioDataPreviews" />
            </div>
          </ClientOnly>

          <div class="w-full z-20 flex-col items-center text-center pt-4 sm:pt-6 md:pt-4 pb-6 sm:pb-8 md:pb-10">
            <h3 class="text-lg sm:text-xl">{{ titles[centerItemIndex] }} {{ centerItemIndex }}</h3>
            <p class="text-sm font-light">{{ descriptions[centerItemIndex] }} {{ centerItemIndex }}</p>
          </div>
        </div>
      </WrappersFullScreen>

      <ClientOnly>
        <div v-if="hasViewTimeline">
          <IndexPortoflioSeeMore :data="portfolioData[centerItemIndex]" />
        </div>
        <div v-else>
          <IndexPortoflioSeeMore :data="portfolioData[selectedItemIndex]" />
        </div>
      </ClientOnly>

    </div>
  </section>
</template>

<style scoped>
  .navbar {
    z-index: 110;
  }
</style>

<script setup lang="ts">
  import Bowser from 'bowser';

  const hasViewTimeline = computed<boolean>(() => {
    if (!window || !window.navigator) {
      return false;
    }

    const browser = Bowser.getParser(window.navigator.userAgent);
    const browserSatisfies = browser.satisfies({
      chrome: '>=115',
      edge: '>=115',
      opera: '>=101',
      samsung_internet: '>=115',
      android: '>=115',
    });

    console.log(hasViewTimeline);

    return browserSatisfies === true;
  });

  const centerItemIndex = ref<number>(0);
  const selectedItemIndex = ref<number>(0);

  const titles = Array(8).fill('3D Environments');
  const descriptions = Array(8).fill("Done in blender with after effects and 3ds max");

  const sources = [
    { type: "image", src: '/images/Environment tryout 1.png' },
    { type: "image", src: '/images/Environment tryout 5.png' },
    { type: "image", src: '/images/Environment tryout 6.png' },
    { type: "image", src: '/images/Environment tryout container 1.png' },
    { type: "image", src: '/images/Environment tryout container Yellow.png' },
    { type: "video", src: 'https://drive.google.com/file/d/1UZn6_WlV3CdlbrtT7JWvjVPVmNY9PYGR/preview' },
  ];

  const portfolioData = [
    sources,
    [...sources.slice(1, sources.length), sources[0]],
    [...sources.slice(2, sources.length), ...sources.slice(0, 2)], 
    [...sources.slice(3, sources.length), ...sources.slice(0, 3)],
    [...sources.slice(4, sources.length), ...sources.slice(0, 4)],
    sources,
    [...sources.slice(1, sources.length), sources[0]],
  ];

  const portfolioDataPreviews = portfolioData.map((d) => { return d[0]; });

</script>