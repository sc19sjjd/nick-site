<template>
  <div class="pt-8 pb-8 w-full relative">
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
      <ul ref="scrollContainerEl" class="list-none whitespace-nowrap overflow-x-scroll snap-x snap-mandatory scroll-smooth" style="max-width: 60rem; height: 20rem">
        <div class="w-full" style="height:7rem"></div>
        <div class="inline-block" style="width: 25rem"></div>
        <li v-for="i in Array(8).keys()" key="i" ref="listItemsEl" class="relative inline-block snap-center">
          <img ref="listItemImagesEl" class="rounded-md w-full" src="/images/Environment tryout 1.png" alt="Case study 1" style="width: 15rem" />
          <div ref="listItemOverlaysEl" class="absolute top-0 left-0 w-full h-full z-40 bg-background opacity-0"></div>
          <div class="absolute top-0 left-0 w-full h-full z-50 border-red-500 border-2"></div>
        </li>
        <div class="inline-block" style="width: 25rem"></div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';
  // import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

  const scrollContainerEl = ref<NullableHTMLElement>(null);
  const listItemsEl = ref<Array<NullableHTMLElement>>([]);
  const listItemImagesEl = ref<Array<NullableHTMLElement>>([]);
  const listItemOverlaysEl = ref<Array<NullableHTMLElement>>([]);

  declare var ViewTimeline: any;

  const itemWidth = 12;
  const numItems = 8
  const scrollContainerMaxWidth = 7 * itemWidth;
  const offset = [0,]


  const createListItemAnimations = (
    listItems: Array<NullableHTMLElement>, 
    listItemImages: Array<NullableHTMLElement>, 
    listItemOverlays: Array<NullableHTMLElement>,
    scrollContainer: NullableHTMLElement
  ) => {
    listItems.forEach((listItem, index) => {
      const timeline = new ViewTimeline({
        subject: listItem,
        axis: "inline",
      });

      listItem!.animate(
        {
          zIndex: [0, 100, 0],
        },
        {
          fill: "both",
          timeline: timeline,
        }
      );

      const offset = [0, 0.3, 0.4, 0.5, 0.6, 0.7, 1];
      const opacity = [1, 0.5, 0.2, 0];
      const translates = [20, 10, 3, 0];
      const transform = [
        `scale(1) translateX(-${translates[0]}rem)`, 
        `scale(1.4) translateX(-${translates[1]}rem)`,
        `scale(1.7) translateX(-${translates[2]}rem)`, 
        `scale(2) translateX(${translates[3]})`, 
        `scale(1.7) translateX(${translates[2]}rem)`,
        `scale(1.4) translateX(${translates[1]}rem)`,
        `scale(1) translateX(${translates[0]}rem)`
      ];

      listItemOverlays[index]!.animate(
        {
          opacity: [1, 0.4, 0.2, 0.1, 0, 0.1, 0.2, 0.4, 1],
          transform: transform,
          // offset: offset
        },
        {
          fill: "both",
          timeline: timeline,
        }
      );

      listItemImages[index]!.animate(
        {
          transform: transform,
          // offset: offset
        },
        {
          fill: "both",
          timeline: timeline,
        }
      );
    });
  }

  onMounted(() => {
    // console.log(carouselContainer.value);
    // console.log(carouselContent.value);
    // console.log(listItemsEl.value);
    // console.log(listItemsImagesEl.value);

    createListItemAnimations(listItemsEl.value, listItemImagesEl.value, listItemOverlaysEl.value, scrollContainerEl.value);
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