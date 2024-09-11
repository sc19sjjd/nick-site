<template>
  <div class="relative w-full flex flex-col justify-center">
    <div ref="outerDivEl" class="relative max-w-screen-2xl flex overflow-x-hidden">
      <div ref="scrollContainerEl" class="flex list-none whitespace-nowrap overflow-x-auto snap-x snap-mandatory 
      scroll-smooth shrink-0 w-full pb-2 gap-6">
        <div class="pl-4 xs:hidden"></div>

        <div v-for="(source, index) in props.data" :key="index" 
        class="list-item shrink-0 snap-center xs:snap-start border-2 rounded-lg overflow-hidden hover:cursor-pointer" 
        :style="{ width: `${itemWidth}px` }"
        :class="{ 
          'border-orange-500/70': currentSelectedItemIndex == index, 
          'border-black/0 hover:border-lightGrey/60': currentSelectedItemIndex != index
        }" 
        @click="() => onClickItem(index)">
          
          <img ref="listItemImagesEl" :src="source.src" alt="Case study 1" />
        
        </div>

        <div class="pl-4 xs:hidden"></div>
      </div>
    </div>

    <div class="w-full flex justify-center gap-8 pt-4">

      <div class="flex items-center justify-center w-12 h-12 rounded-full border-2 border-lightGrey/60 
      hover:border-orange-500/70 hover:cursor-pointer transition duration-300 group" @click="() => onClickPreviousArrow()"
      :class="{ 'disabled': currentLeftItemIndex == 0 }">
        <img src="/public/icons/arrow-white.png" alt="arrow" class="w-8 h-8 opacity-50 group-hover:opacity-80 transition duration-300" 
        style="transform: rotate(180deg);" />
      </div>

      <div class="flex items-center justify-center w-12 h-12 rounded-full border-2 border-lightGrey/60 
      hover:border-orange-500/70 hover:cursor-pointer transition duration-300 group" @click="() => onClickNextArrow()"
      :class="{ 'disabled': currentLeftItemIndex == props.data.length - numItems }">
        <img src="/public/icons/arrow-white.png" alt="arrow" class="w-8 h-8 opacity-50 group-hover:opacity-80 transition duration-300" />
      </div>

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

  .disabled {
    opacity: 0.7;
    cursor: initial;
    pointer-events: none;
  }
</style>

<script setup lang="ts">
  import type { NullableHTMLElement, PortfolioSource } from '~/types';
  
  const props = defineProps<{
    data: Array<PortfolioSource>
  }>();

  const outerDivEl = ref<NullableHTMLElement>(null);
  const scrollContainerEl = ref<NullableHTMLElement>(null);

  const itemWidth = ref(0);
  const numItems = ref(0);
  const itemGap = 24;

  const updateItemWidth = () => {
    if (!outerDivEl.value) {
      return;
    }

    let outerDivWidth = outerDivEl.value!.clientWidth;

    // minus 2 for visual adjustment
    if (numItems.value > 1) {
      itemWidth.value = (outerDivWidth - ((numItems.value - 1) * itemGap)) / numItems.value - 2;
    } else {
      itemWidth.value = outerDivWidth / 1.1;
    }
  }

  const updateNumItems = () => {
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

  const currentSelectedItemIndex = defineModel('selectedItem', { type: Number, default: 0 });

  const onClickItem = (index: number) => {
    currentSelectedItemIndex.value = index;
  }

  const currentLeftItemIndex = ref(0);

  const onScrollContainerScroll = (event: Event) => {
    const scrollLeft = scrollContainerEl.value!.scrollLeft;
    currentLeftItemIndex.value = Math.round(scrollLeft / itemWidth.value);
  }

  const onClickPreviousArrow = () => {
    if (currentLeftItemIndex.value > 0) {
      let left = currentLeftItemIndex.value * (itemWidth.value + itemGap) - (itemWidth.value + itemGap);
      scrollContainerEl.value!.scrollTo({ left: left, behavior: 'smooth' });
    }
  }

  const onClickNextArrow = () => {
    if (currentLeftItemIndex.value < props.data.length - numItems.value) {
      let left = currentLeftItemIndex.value * (itemWidth.value + itemGap) + (itemWidth.value + itemGap);
      scrollContainerEl.value!.scrollTo({ left: left, behavior: 'smooth' });
    }
  }
  
  let resizeObserver: ResizeObserver;

  onMounted(() => {
    onOuterDivResize();
    resizeObserver = new ResizeObserver(onOuterDivResize);
    resizeObserver.observe(outerDivEl.value!);

    if (scrollContainerEl.value) {
      scrollContainerEl.value!.addEventListener('scroll', onScrollContainerScroll);
    }
  });
</script>