<template>
  <div class="group overflow-visible w-full h-full relative z-0 rounded-md border-4 border-gray-700 bg-black shadow-lg shadow-gray-900 hover:shadow-xl hover:shadow-gray-900 hover:cursor-pointer
    hover:border-gray-600 transition duration-300">
    
    <PreviewPopover :title="props.contentTitle" />

    <div class="w-full h-full flex justify-center rounded-sm">

      <video class="max-w-full max-h-full object-contain transition duration-300" autoplay muted loop playsinline preload="metadata">
        <source :src="props.videoUrl" :type="props.videoType">
      </video>
    </div>

    <!-- <div class="absolute z-10 inset-0 bg-gray-500 opacity-5 group-hover:flex transition duration-300 w-full h-full justify-center items-center flex-col"></div> -->
      <!-- <h3 class="m-0 p-0 ">
        {{ props.contentTitle }}
      </h3>
      <div class="pt-8"></div> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
  import PreviewPopover from "../PreviewPopover.vue";
  
  const props = defineProps<{
    videoUrl: string,
    videoType: string,
    contentTitle: string,
    contentLink: string
  }>();

</script>
