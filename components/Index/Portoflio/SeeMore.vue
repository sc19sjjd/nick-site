<template>
  <WrappersContent>
    <div class="w-full flex flex-row justify-center">
      <div class="bg-gray-100/5 z-20 p-3 flex flex-row justify-center items-center rounded-xl border border-lightGrey">
        <div class="bar-none w-full max-w-52 h-96 overflow-y-auto flex flex-col items-center">
          <div v-for="(src, index) in sources" :key="index" class="w-full pb-2 last:pb-0 z-20">
            <div class="relative hover:cursor-pointer" @click="onClickPreview(src)">
              <div class="absolute left-0 top-0 w-full h-full z-10 hover:border-4 opacity-0 bg-grey 
              hover:border-orange-500 hover:opacity-50">
              </div>
              <img class="w-full h-full object-contain" :src="src" alt="test image" />
            </div>
          </div>
        </div>

        <div class="pl-3"></div>

        <div class="w-full max-w-2xl object-contain z-20">
          <img class="w-full" :src="mainItemSource" alt="test image" />
        </div>
      </div>
    </div>
  </WrappersContent>
</template>

<script setup lang="ts">
  const sources = [
    '/images/Environment tryout 1.png',
    '/images/Environment tryout 5.png',
    '/images/Environment tryout 6.png',
    '/images/Environment tryout container 1.png',
    '/images/Environment tryout container Yellow.png',
  ]

  const mainItemSource = ref<string>(sources[0]);

  const onClickPreview = (newSource: string) => {
    mainItemSource.value = newSource;
  };
</script>

<style scoped>
  .bar-none {
    scrollbar-width: none;
  }
</style>