<template>
  <WrappersContent>
    <div class="w-full flex flex-row justify-center">
      <div class="bg-gray-100/5 z-20 p-3 flex flex-row justify-center items-center rounded-xl border border-lightGrey">
        <div class="bar-none w-full max-w-52 h-96 overflow-y-auto flex flex-col items-center">
          <div v-for="(src, index) in sources" :key="index" class="w-full pb-2 last:pb-0 z-20">
            <div class="relative hover:cursor-pointer" @click="onClickPreview(src)">
              <div class="absolute left-0 top-0 w-full h-full z-20 hover:border-4 opacity-0 bg-grey 
              hover:border-orange-500 hover:opacity-50">
              </div>
              <img v-if="src[0] === 'image'" class="w-full h-full object-contain" :src="src[1]" alt="test image" />
              <div v-else-if="src[0] == 'video'" class="w-full h-full relative">
                <div class="absolute top-0 left-0 w-full h-full z-10 opacity-50 flex justify-center items-center">
                  <img class="w-1/3" src="/public/icons/play-button-white.png" alt="play button" />
                </div>
                <img class="w-full h-full object-contain" :src="sources[0][1]" alt="test video preview" />
              </div>
            </div>
          </div>
        </div>

        <div class="pl-3"></div>

        <div class="w-full max-w-2xl object-contain z-20">
          <img v-if="mainItemSource[0] === 'image'" class="w-full" :src="mainItemSource[1]" alt="test image" />
          <iframe v-else-if="mainItemSource[0] == 'video'" src="https://drive.google.com/file/d/1UZn6_WlV3CdlbrtT7JWvjVPVmNY9PYGR/preview" 
          width="640" height="360" allow="autoplay" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </WrappersContent>
</template>

<script setup lang="ts">
  const sources = [
    ["image", '/images/Environment tryout 1.png'],
    ["image", '/images/Environment tryout 5.png'],
    ["image", '/images/Environment tryout 6.png'],
    ["image", '/images/Environment tryout container 1.png'],
    ["image", '/images/Environment tryout container Yellow.png'],
    ["video", 'https://drive.google.com/file/d/1UZn6_WlV3CdlbrtT7JWvjVPVmNY9PYGR/preview']
  ]

  const mainItemSource = ref<Array<string>>(sources[0]);

  const onClickPreview = (newSource: Array<string>) => {
    mainItemSource.value = newSource;
  };
</script>

<style scoped>
  .bar-none {
    scrollbar-width: none;
  }
</style>