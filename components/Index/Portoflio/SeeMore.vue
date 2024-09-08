<template>
  <div ref="seeMoreModalEl" class="w-full hidden h-dvh fixed top-0 left-0 bg-black/50" style="z-index: 1000">
    <div ref="seeMoreModalOverlayEl" class="w-full h-full flex justify-center items-center">

      <div ref="seeMoreModalContentEl" class="h-fit w-10/12 bg-background/90 font-black text-3xl rounded-lg overflow-hidden relative">

        <div class="absolute w-full flex justify-end">
          <div class="pr-8 pt-8 z-20">
            <div @click="closeModal" class="cursor-pointer opacity-60 hover:opacity-80 transition duration-300">
              <img src="/public/icons/cross-white.png" alt="close" class="w-6 box-content" />
            </div>
          </div>
        </div>

        <div class="absolute h-inherit w-full h-full flex items-center justify-between"> 
          <div class="relative z-20 w-12 h-12 bg-background/0 border-2 border-lightGrey/60 rounded-full flex items-center justify-center
          hover:cursor-pointer hover:bg-background hover:border-orange-500/70 transition duration-300 group" style="transform: rotate(180deg);"
          @click="() => onClickPreviousArrow()">
            <img src="/public/icons/arrow-white.png" alt="arrow" class="w-8 h-8 opacity-50 group-hover:opacity-80 transition duration-300" />
          </div>

          <div class="relative z-20 w-12 h-12 bg-background/0 border-2 border-lightGrey/60 rounded-full flex items-center justify-center
          hover:cursor-pointer hover:bg-background hover:border-orange-500/70 transition duration-300 group" @click="() => onClickNextArrow()">
            <img src="/public/icons/arrow-white.png" alt="arrow" class="w-8 h-8 opacity-50 group-hover:opacity-80 transition duration-300" />
          </div>
        </div>

        <div class="relative z-10">
          <img v-if="mainItemSource.type === 'image'" class="w-full object-scale-down" :src="mainItemSource.src" alt="test image" />
          <iframe v-else-if="mainItemSource.type == 'video'" :src="mainItemSource.src"
          :width="modalVideoWidth" :height="modalVideoHeight" allow="autoplay" allowfullscreen></iframe>
        </div>

      </div>
    </div>
  </div>

  <WrappersContent>
    <div class="w-full flex flex-row justify-center">
      <div ref="mainContentEl" class="bg-orange-100/5 w-[95%] lg:w-full object-contain z-20 p-3 flex gap-3 flex-col lg:flex-row justify-center 
      items-center rounded-xl border-2 border-orange-500/70">

        <div ref="previewScrollBoxEl" class="content-box max-h-[27rem] max-w-4xl w-full lg:w-auto overflow-x-auto lg:overflow-y-auto gap-2 shrink-0
        lg:shrink-0 flex flex-row lg:flex-col items-center pb-2 lg:pb-0 lg:pr-2">
          <div v-for="(src, index) in props.data" :key="index" class="w-36 xs:w-44 sm:w-48 md:w-52 shrink-0 lg:pr-0 z-20 relative
          hover:cursor-pointer" @click="() => onClickPreview(index)">

            <div class="absolute left-0 top-0 w-full h-full z-20 hover:border-2 opacity-0 bg-grey 
            hover:border-orange-500 hover:opacity-50">
            </div>

            <img v-if="src.type === 'image'" class="w-full h-full" :src="src.src" alt="test image" />

            <div v-else-if="src.type == 'video'" class="w-full h-full relative">
              <div class="absolute top-0 left-0 w-full h-full z-10 opacity-50 flex justify-center items-center">
                <img class="w-1/3" src="/public/icons/play-button-white.png" alt="play button" />
              </div>
              <img class="w-full h-full" :src="props.data[0].src" alt="test video preview" />
            </div>

          </div>
        </div>

        <div class="max-w-4xl z-20 hover:cursor-pointer w-full relative" @click="() => openSeeMoreModal()">
          <img v-if="mainItemSource.type === 'image'" class="w-full object-scale-down" :src="mainItemSource.src" alt="test image" />
          <div v-else-if="mainItemSource.type == 'video'" class="w-full flex justify-center items-center">
            <iframe :src="mainItemSource.src"
            :width="videoWidth" :height="videoHeight" allow="autoplay" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </WrappersContent>
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

  .modal-closed {
    animation: fade-out 0.4s ease-in-out;
    animation-fill-mode: forwards;
  }

  .modal-open {
    animation: fade-in 0.4s ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from { opacity: 0; display: none; }
    to { opacity: 1; display: block; }
  }

  @keyframes fade-out {
    from { opacity: 1; display: block; }
    to { opacity: 0; display:none; }
  }
</style>

<script setup lang="ts">
  import type { NullableHTMLElement, PortfolioSource } from '~/types';

  const props = defineProps<{
    data: Array<PortfolioSource>
  }>();

  const dataGetter = computed(() => props.data);

  watch(dataGetter, (newData, oldData) => {
    currentSourceIndex.value = 0;
  });

  const seeMoreModalEl = ref<NullableHTMLElement>(null);
  const seeMoreModalOverlayEl = ref<NullableHTMLElement>(null);
  const seeMoreModalContentEl = ref<NullableHTMLElement>(null);

  const mainContentEl = ref<NullableHTMLElement>(null);
  const previewScrollBoxEl = ref<NullableHTMLElement>(null);

  const currentSourceIndex = ref<number>(0);

  const mainItemSource = computed<PortfolioSource>(() => props.data[currentSourceIndex.value]);

  const onClickPreview = (newSourceIndex: number) => {
    currentSourceIndex.value = newSourceIndex;
  };

  const onClickNextArrow = () => {
    if (currentSourceIndex.value < props.data.length - 1) {
      currentSourceIndex.value += 1;
    } else {
      currentSourceIndex.value = 0;
    }
  }

  const onClickPreviousArrow = () => {
    if (currentSourceIndex.value > 0) {
      currentSourceIndex.value -= 1;
    } else {
      currentSourceIndex.value = props.data.length - 1;
    }
  }

  const openSeeMoreModal = () => {
    if (!seeMoreModalEl.value) {
      return;
    }
    seeMoreModalEl.value!.classList.remove('hidden');
    seeMoreModalEl.value!.classList.remove('modal-closed');
    seeMoreModalEl.value!.classList.add('modal-open');
  }

  const closeModal = () => {
    if (!seeMoreModalEl.value) {
      return;
    }
    seeMoreModalEl.value!.classList.remove('modal-open');
    seeMoreModalEl.value!.classList.add('modal-closed');
  }

  const onWindowClick = (event: MouseEvent) => {
    if (!seeMoreModalOverlayEl.value) {
      return;
    } else if (event.target == seeMoreModalOverlayEl.value!) {
      closeModal();
    }
  }

  const videoWidth = ref<number>(0);
  const videoHeight = computed<number>(() => { return videoWidth.value * 9/16; });

  const updateVideoWidth = () => {
    if (!mainContentEl.value || !previewScrollBoxEl.value) {
      return;
    }

    let paddingOffset = (mainContentEl.value!.getBoundingClientRect().width - mainContentEl.value!.clientWidth) * 16;

    if (window.innerWidth < 1024) {
      videoWidth.value = mainContentEl.value!.clientWidth - paddingOffset;
    } else {
      videoWidth.value = mainContentEl.value!.clientWidth - previewScrollBoxEl.value!.clientWidth - paddingOffset;
    }
  }

  const modalVideoWidth = ref<number>(0);
  const modalVideoHeight = computed<number>(() => { return modalVideoWidth.value * 9/16; });

  const updateModalVideoWidth = () => {
    if (!seeMoreModalContentEl.value) {
      return;
    }

    modalVideoWidth.value = seeMoreModalContentEl.value!.clientWidth;
  }

  let videoResizeObserver: ResizeObserver;
  let modalVideoResizeObserver: ResizeObserver;

  onMounted(() => {
    window.addEventListener('click', onWindowClick);

    updateVideoWidth();
    videoResizeObserver = new ResizeObserver(updateVideoWidth);
    videoResizeObserver.observe(mainContentEl.value!);

    updateModalVideoWidth();
    modalVideoResizeObserver = new ResizeObserver(updateModalVideoWidth);
    modalVideoResizeObserver.observe(seeMoreModalContentEl.value!);
  });
</script>