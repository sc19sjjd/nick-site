<template>
  <div ref="outerDivEl" class="relative max-w-screen-2xl flex overflow-x-hidden">
    <div ref="scrollContainerEl" class="flex list-none whitespace-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth shrink-0 w-full pb-2
    gap-6">
    <!-- :style="{ columnGap: `${scrollGap}px` }"> -->
      <div class="pl-6 xs:hidden"></div>

      <div v-for="(source, index) in props.data" :key="index" ref="listItemsEl" :id="`list-item${index}`" 
      class="list-item shrink-0 snap-center xs:snap-start" :style="{ width: `${itemWidth}px` }">
        <img ref="listItemImagesEl" class="rounded-md" :src="source.src" alt="Case study 1" />
      </div>

      <div class="pl-6 xs:hidden"></div>
    </div>
  </div>
</template>

<style scoped>
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #353535;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #838383;
  }

  /* .list-item {
    width: 16rem;
  }

  @media (min-width: 480px) {
    .list-item {
      width: 13rem;
    }
  }

  @media (min-width: 768px) {
    .list-item {
      width: 12rem;
    }
  }

  @media (min-width: 1024px) {
    .list-item {
      width: 14rem;
    }
  }

  @media (min-width: 1280px) {
    .list-item {
      width: 16rem;
    }
  } */
</style>

<script setup lang="ts">
  import type { NullableHTMLElement, PortfolioSource } from '~/types';
  
  const props = defineProps<{
    data: Array<PortfolioSource>
  }>();

  const scrollContainerEl = ref<NullableHTMLElement>(null);
  const listItemsEl = ref<Array<NullableHTMLElement>>([]);
  const outerDivEl = ref<NullableHTMLElement>(null);

  const scrollGap = ref(0);
  const itemWidth = ref(0);
  const numItems = ref(0);
  
  const updateScrollGap = () => {
    if (!scrollContainerEl.value || !outerDivEl.value || !listItemsEl.value) {
      return;
    }

    let outerDivWidth = outerDivEl.value!.clientWidth;
    let listItemWidth = listItemsEl.value![0]!.clientWidth;

    let numItems = Math.floor(outerDivWidth / listItemWidth);

    console.log(outerDivWidth, listItemWidth, numItems);
    
    if (numItems > 1) {
      scrollGap.value = (outerDivWidth - (numItems * listItemWidth)) / (numItems - 1);      
    } else {
      scrollGap.value = outerDivWidth - (numItems * listItemWidth);
    }

    console.log(scrollGap.value);
  }

  const updateItemWidth = () => {
    if (!scrollContainerEl.value || !outerDivEl.value) {
      return;
    }

    let outerDivWidth = outerDivEl.value!.clientWidth;

    // minus 2 for visual adjustment
    if (numItems.value > 1) {
      itemWidth.value = (outerDivWidth - ((numItems.value - 1) * 24)) / numItems.value - 2;
    } else {
      itemWidth.value = outerDivWidth - 2;
    }
  }

  const updateNumItems = () => {
    if (!scrollContainerEl.value || !outerDivEl.value) {
      return;
    }

    if (window.innerWidth < 480) {
      numItems.value = 1;
    } else if (window.innerWidth < 768 && window.innerWidth > 480) {
      numItems.value = 2;
    } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
      numItems.value = 3;
    } else {
      numItems.value = 4;
    }
  }

  const onOuterDivResize = () => {
    updateNumItems();
    updateItemWidth();
  };
  
  let resizeObserver: ResizeObserver;

  onMounted(() => {
    updateScrollGap();
    resizeObserver = new ResizeObserver(onOuterDivResize);
    resizeObserver.observe(outerDivEl.value!);
  });
</script>