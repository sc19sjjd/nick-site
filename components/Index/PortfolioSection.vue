<template>
  <WrappersContent>
    <div class="flex flex-col w-full">
      <h1 class="text-orange-700 text-5xl xsm:text-5xl sm:text-6xl pb-10" style="font-family: 'Archivo', sans-serif;">
        Portfolio
      </h1>
      <div class="flex justify-between pb-20">
        <IndexPortoflioCaseStudyCard />
        <IndexPortoflioCaseStudyCard />
      </div>
    </div>
  </WrappersContent>
  
  <div class="w-full h-2 bg-gradient-to-r from-20% from-orange-700 to-80% to-orange-700 via-accent"></div>
  <div ref="scrollContainer" class="pt-4 w-full flex flex-row">

  </div>
</template>