<template>
  <div class="relative">

    <div class="flex flex-row justify-center">
      <ul ref="scrollContainerEl" class="list-none whitespace-nowrap overflow-y-visible overflow-x-scroll snap-x snap-mandatory scroll-smooth"
      :style="{ width: `${scrollContainerMaxWidth}rem`, height: `${containerHeight}rem` }">

        <div class="w-full" :style="{ height: `${yPadding}rem` }"></div>
        <div class="inline-block" :style="{width: `${edgeWidth}rem`}"></div>

        <li v-for="(source, index) in props.data" :key="index" ref="listItemsEl" :id="`list-item${index}`" 
        class="overflow-y-visible relative inline-block snap-center" :style="{ width: `${listItemWidth}rem` }">
          <img ref="listItemImagesEl" class="rounded-md w-full" :src="source.src" alt="Case study 1" />
          <div ref="listItemOverlaysEl" class="absolute top-0 left-0 w-full h-full z-40 bg-background opacity-0"></div>
          <!-- Debug li outline -->
          <!-- <div class="absolute top-0 left-0 w-full h-full z-50 border-red-500 border-2"></div> -->
        </li>

        <div class="inline-block" :style="{width: `${edgeWidth}rem`}"></div>
      </ul>
    </div>

    <div class="w-full flex justify-center gap-8 pt-4">

      <div class="flex items-center justify-center w-12 h-12 rounded-full border-2 border-lightGrey/60 
      hover:border-orange-500/70 hover:cursor-pointer transition duration-200 group" @click="() => onClickPreviousArrow()"
      :class="{ 'disabled': currentCenterItemIndex == 0 }">
        <img src="/public/icons/arrow-white.png" alt="arrow" class="w-8 h-8 opacity-50 group-hover:opacity-80 transition duration-200" 
        style="transform: rotate(180deg);" />
      </div>

      <div class="flex items-center justify-center w-12 h-12 rounded-full border-2 border-lightGrey/60 
      hover:border-orange-500/70 hover:cursor-pointer transition duration-200 group" @click="() => onClickNextArrow()"
      :class="{ 'disabled': currentCenterItemIndex == 7 }">
        <img src="/public/icons/arrow-white.png" alt="arrow" class="w-8 h-8 opacity-50 group-hover:opacity-80 transition duration-200" />
      </div>

    </div>

  </div>
</template>

<style scoped>
  .disabled {
    opacity: 0.7;
    cursor: initial;
    pointer-events: none;
  }

  ul {
    scrollbar-width: none;
  }

  li {
    perspective: 40em;
  }
</style>

<script setup lang="ts">
  import type { NullableHTMLElement, PortfolioSource } from '~/types';
  
  declare var ViewTimeline: any;

  const props = defineProps<{
    data: Array<PortfolioSource>
  }>();

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

  const carouselSize = ref<number>(-1);

  const setCarouselSize = () => {
    let screenWidth = window.innerWidth;
    
    if (screenWidth > 1024 && carouselSize.value != 4) {
      carouselSize.value = 4;
    } else if (screenWidth < 1024 && screenWidth > 768 && carouselSize.value != 3) {
      carouselSize.value = 3;
    } else if (screenWidth < 768 && screenWidth > 640 && carouselSize.value != 2) {
      carouselSize.value = 2;
    }
    else if (screenWidth < 640 && screenWidth > 480 && carouselSize.value != 1) {
      carouselSize.value = 1;
    }
    else if (screenWidth < 480 && carouselSize.value != 0) {
      carouselSize.value = 0;
    }
  };
  
  watchEffect(() => {
    let opacities: Array<number> = [];
    let scales: Array<number> = [];
    let translates: Array<number> = [];

    if (carouselSize.value === -1) {
      return;
    }
    else if (carouselSize.value === 0) {
      opacities = [1, 1, 0.65, 0.3, 0];
      scales = [1, 1.9, 2.6, 3.1];
      translates = [8, 1, 0.7, 0];

      listItemWidth.value = 5;
      yPadding.value = 3;
      containerHeight.value = 9;
    }
    else if (carouselSize.value === 1) {
      opacities = [1, 0.4, 0.2, 0.1, 0];
      scales = [1, 1.9, 2.5, 3];
      translates = [5, 3, 1, 0];

      listItemWidth.value = 7;
      yPadding.value = 4.5;
      containerHeight.value = 12.5;
    } else if (carouselSize.value === 2) {
      opacities = [1, 0.4, 0.2, 0.1, 0];
      scales = [1, 1.8, 2.3, 2.7];
      translates = [7, 3, 1, 0];

      listItemWidth.value = 9.2;
      yPadding.value = 4.7;
      containerHeight.value = 14.5;

    } else if (carouselSize.value === 3) {
      opacities = [1, 0.4, 0.2, 0.1, 0];
      scales = [1, 1.6, 2.2, 2.5];
      translates = [12, 5, 2, 0];

      listItemWidth.value = 11.5;
      yPadding.value = 5;
      containerHeight.value = 16.5;

    } else if (carouselSize.value === 4) {
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
      `scale(${scales[0]}) translateX(-${translates[0]*16}px)`, 
      `scale(${scales[1]}) translateX(-${translates[1]*16}px)`,
      `scale(${scales[2]}) translateX(-${translates[2]*16}px)`, 
      `scale(${scales[3]}) translateX(${translates[3]*16}px)`, 
      `scale(${scales[2]}) translateX(${translates[2]*16}px)`,
      `scale(${scales[1]}) translateX(${translates[1]*16}px)`,
      `scale(${scales[0]}) translateX(${translates[0]*16}px)`
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

  const scrollElementToCenter = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      let left = element.offsetLeft + element.clientWidth - scrollContainerEl.value!.clientWidth / 2 - scrollContainerEl.value!.offsetLeft;
      // let left = element.offsetLeft - element.clientWidth * 1.5 - scrollContainerEl.value!.offsetLeft;
      scrollContainerEl.value!.scrollTo({ left: left, behavior: 'smooth' });
    }
  }

  const onClickPreviousArrow = () => {
    if (currentCenterItemIndex.value > 0) {
      scrollElementToCenter(`list-item${currentCenterItemIndex.value - 1}`);
    }
  }

  const onClickNextArrow = () => {
    if (currentCenterItemIndex.value < 8) {
      scrollElementToCenter(`list-item${currentCenterItemIndex.value + 1}`);
    }
  }

  onMounted(() => {
    setCarouselSize();
    addEventListener('resize', setCarouselSize);
    scrollContainerEl.value?.addEventListener('scroll', onHorizontalScroll);
  });

</script>