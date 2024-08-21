<template>
  <WrappersFullScreen class="flex justify-between pt-2 z-50" style="font-family: 'Outfit', sans-serif;">
    <div class="hover:cursor-pointer hover:text-orange-600" :class="{ 'underline': underline == 'home' }" @click="scrollTo('title')">
      Home
    </div>
    <div class="hover:cursor-pointer hover:text-orange-600" :class="{ 'underline': underline == 'about' }" @click="scrollTo('about')">
      About
    </div>
    <div class="hover:cursor-pointer hover:text-orange-600" :class="{ 'underline': underline == 'portfolio' }" @click="scrollTo('portfolio')">
      Portfolio
    </div>
    <div class="hover:cursor-pointer hover:text-orange-600">
      Contact
    </div>
  </WrappersFullScreen>
</template>

<script setup lang="ts">
  const props = defineProps({
    underline: String
  })

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

</script>