<template>
  <WrappersContent>
    <div class="w-full flex flex-row justify-center items-center">
      <div class="bar-none w-full max-w-52 h-96 overflow-y-auto flex flex-col items-center">
        <div v-for="(src, index) in sources" :key="index" class="w-full pb-2 last:pb-0">
          <div class="hover:cursor-pointer hover:border-4 hover:border-orange-700 hover:opacity-70" @click="onClickPreview(src)">
            <img class="w-full h-full object-contain" :src="src" alt="test image" />
          </div>
        </div>
      </div>

      <div class="pl-8"></div>

      <div class="w-full max-w-xl object-contain">
        <img class="w-full" :src="mainItemSource" alt="test image" />
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