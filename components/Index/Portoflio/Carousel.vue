<template>
  <div class="w-full relative">
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

    <div class="w-full flex flex-row justify-center">
      <ul ref="scrollContainerEl" class="list-none whitespace-nowrap overflow-y-visible overflow-x-scroll snap-x snap-mandatory scroll-smooth"
      :style="{ width: `${scrollContainerMaxWidth}rem`, height: `${containerHeight}rem` }">
        <div class="w-full" :style="{ height: `${yPadding}rem` }"></div>
        <div class="inline-block" :style="{width: `${edgeWidth}rem`}"></div>

        <li v-for="i in Array(8).keys()" key="i" ref="listItemsEl" class="overflow-y-visible relative inline-block snap-center">
          <img ref="listItemImagesEl" class="rounded-md w-full" src="/images/Environment tryout 1.png" alt="Case study 1" 
          :style="{ width: `${listItemWidth}rem` }" />
          <div ref="listItemOverlaysEl" class="absolute top-0 left-0 w-full h-full z-40 bg-background opacity-0"></div>
          <!-- <div class="absolute top-0 left-0 w-full h-full z-50 border-red-500 border-2"></div> -->
        </li>

        <div class="inline-block" :style="{width: `${edgeWidth}rem`}"></div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';
  import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';
  
  declare var ViewTimeline: any;  

  const scrollContainerEl = ref<NullableHTMLElement>(null);
  const listItemsEl = ref<Array<NullableHTMLElement>>([]);
  const listItemImagesEl = ref<Array<NullableHTMLElement>>([]);
  const listItemOverlaysEl = ref<Array<NullableHTMLElement>>([]);

  const listItemWidth = ref<number>(0);
  const scrollContainerMaxWidth = computed(() => { return 4 * listItemWidth.value; });
  const edgeWidth = computed(() => { return 1.8 * listItemWidth.value; });

  // height for padding element and height for container needed for styling 
  const yPadding = ref<number>(0);
  const containerHeight = ref<number>(0);

  const carouselSize = ref<number>(0);

  const setCarouselSize = () => {
    let screenWidth = window.innerWidth;
    
    if (screenWidth > 1024 && carouselSize.value != 3) {
      carouselSize.value = 3;
    } else if (screenWidth < 1024 && screenWidth > 768 && carouselSize.value != 2) {
      carouselSize.value = 2;
    } else if (screenWidth < 768 && carouselSize.value != 1) {
      carouselSize.value = 1;
    }
  };
  
  watchEffect(() => {
    let opacities: Array<number> = [];
    let scales: Array<number> = [];
    let translates: Array<number> = [];

    if (carouselSize.value === 0) {
      return;
    } else if (carouselSize.value === 1) {
      return;
    } else if (carouselSize.value === 2) {
      opacities = [1, 0.4, 0.2, 0.1, 0];
      scales = [1, 1.6, 2.1, 2.4];
      translates = [12, 5, 2, 0];

      listItemWidth.value = 12;
      yPadding.value = 5;
      containerHeight.value = 16.5;

    } else if (carouselSize.value === 3) {
      opacities = [1, 0.4, 0.2, 0.1, 0];
      scales = [1, 1.4, 1.7, 2];
      translates = [20, 10, 3, 0];

      listItemWidth.value = 15;
      yPadding.value = 4.5;
      containerHeight.value = 17.5;
    }

    const transforms = createTransforms(scales, translates);
    createListItemAnimations(
      listItemsEl.value,
      listItemImagesEl.value, 
      listItemOverlaysEl.value, 
      [...opacities, ...opacities.reverse()], 
      transforms
    );
  });

  const createTransforms = (scales: Array<number>, translates: Array<number>) => {
    return [
      `scale(${scales[0]}) translateX(-${translates[0]}rem)`, 
      `scale(${scales[1]}) translateX(-${translates[1]}rem)`,
      `scale(${scales[2]}) translateX(-${translates[2]}rem)`, 
      `scale(${scales[3]}) translateX(${translates[3]})`, 
      `scale(${scales[2]}) translateX(${translates[2]}rem)`,
      `scale(${scales[1]}) translateX(${translates[1]}rem)`,
      `scale(${scales[0]}) translateX(${translates[0]}rem)`
    ]
  }

  const createListItemAnimations = (
    listItems: Array<NullableHTMLElement>, 
    listItemImages: Array<NullableHTMLElement>, 
    listItemOverlays: Array<NullableHTMLElement>,
    opacities: Array<number>,
    transforms: Array<string>,
  ) => {
    listItems.forEach((listItem, index) => {
      const timeline = new ViewTimeline({
        subject: listItem,
        axis: "inline",
      });

      listItem!.animate(
        {
          zIndex: [5, 100, 5],
        },
        {
          fill: "both",
          timeline: timeline,
        }
      );

      listItemOverlays[index]!.animate(
        {
          opacity: opacities,
          transform: transforms,
        },
        {
          fill: "both",
          timeline: timeline,
        }
      );

      listItemImages[index]!.animate(
        {
          transform: transforms,
        },
        {
          fill: "both",
          timeline: timeline,
        }
      );
    });
  }

  const currentCenterItemIndex = defineModel('centerItem', { type: Number, default: 0 });

  const onHorizontalScroll = (event: Event) => {
    const scrollLeft = scrollContainerEl.value!.scrollLeft / 16;

    currentCenterItemIndex.value = Math.round((scrollLeft - edgeWidth.value + listItemWidth.value * 1.5) / (listItemWidth.value) + 0.015);
  }

  onMounted(() => {
    setCarouselSize();
    addEventListener('resize', setCarouselSize);
    scrollContainerEl.value?.addEventListener('scroll', onHorizontalScroll);
  });

</script>

<style scoped>
  ul {
    scrollbar-width: none;
  }

  li {
    perspective: 40em;
  }
</style>