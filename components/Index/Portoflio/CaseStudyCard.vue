<template>
  <div class="w-full h-full max-w-md flex flex-col bg-orange-100/5 z-20 rounded-xl box-border overflow-hidden
  border-orange-500/60 border-2 shadow-none shadow-black hover:shadow-lg hover:shadow-black hover:border-orange-700
  hover:border-2 hover:border-t-orange-700 hover:border-l-orange-700 hover:cursor-pointer group transition duration-200">
    <div class="flex flex-col p-0">
      <img class="border-orange-700/60 group-hover:border-orange-600 border-b-0 w-full z-30" 
      src="/images/Environment tryout 1.png" alt="Case study 1" />
      <div class="flex flex-col justify-center text-center px-2">
        <h3 class="text-lg pt-3">
          Case study 1
        </h3>
        <p class="text-base font-light pt-1">
          This is a case study description that is quite long and should wrap around to the next line.
        </p>
      </div>
    </div>
    <div class="flex justify-end  pt-1">
      <div class="border-orange-700 border-t-0 border-l-0 group-hover:border-orange-700 rounded-tl-xl px-3 py-1">
        <div class="text-center flex flex-row">
          Read more
          <img src="/public/icons/arrow-white.png" alt="arrow" class="pl-1 w-5 h-4" 
          style="transform: translateY(0.4rem) rotate(-45deg);" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>