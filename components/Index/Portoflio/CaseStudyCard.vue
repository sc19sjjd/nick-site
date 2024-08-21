<template>
  <div class="w-full h-full max-w-md flex flex-col bg-gray-100/5 z-20 rounded-xl 
  border-orange-700 border-0 shadow-none shadow-black hover:shadow-lg hover:shadow-black 
  hover:border hover:cursor-pointer group transition duration-300">
    <div class="flex flex-col p-0">
      <img class="rounded-xl rounded-bl-none rounded-br-none border-lightGrey group-hover:border-orange-600 border-b-0 w-full z-30" 
      src="/images/Environment tryout 1.png" alt="Case study 1" />
      <div class="flex flex-col justify-center text-center">
        <h3 class="text-lg pt-3">
          Case study 1
        </h3>
        <p class="text-base font-light pt-1">
          This is a case study description that is quite long and should wrap around to the next line.
        </p>
      </div>
    </div>
    <div class="flex justify-end  pt-1">
      <div class="border-lightGrey border-t border-l group-hover:border-orange-600 rounded-tl-xl px-3 py-1">
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