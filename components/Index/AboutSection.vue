<template>
  <section id="about-section" class="bg-orange-100 relative z-40">
    <div ref="outerDivEl" class="clip-path bg-orange-100" :style="{ transform: 'translateY(2.5rem)', height: outerDivHeight }">
      <div ref="innerDivEl" class="" :style="{ height: innerDivHeight }">
    <div ref="aboutNavBarEl" class="sticky top-0 z-40 text-black" style="transform: translateY(-2.5rem)">
      <NavBar :underline="'about'" />
    </div>

    <div ref="contentEl">
    <WrappersContent class="relative">
      <div ref="viewReferenceEl" class="w-full pt-6"></div>

      <div class="h-dvh text-black pb-20 pt-20" id="about">
        <h2 class="text-orange-700 text-center text-6xl pb-20 z-10 relative" style="font-family: 'Archivo Black', sans-serif;">
          About me
        </h2>

        <div class="flex flex-row w-full justify-between">
          <div class="flex flex-col h-full justify-between">
              <p class="max-w-md pb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euismod aliquet nisi nunc euismod. 
                Sed euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euismod aliquet nisi nunc euismod. 
                Sed euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euis
              </p>
              <p class="max-w-md pb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euismod aliquet nisi nunc euismod. 
                Sed euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euismod aliquet nisi nunc euismod.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euismod aliquet nisi nunc euismod.
              </p>
              <p class="max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euismod aliquet nisi nunc euismod. 
                Sed euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euismod aliquet nisi nunc euismod.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris euismod, nisl eget ultricies ultrices, 
                nisl nisi aliquam nisl, euismod aliquet nisi nunc euismod.
              </p>
          </div>

          <div class="flex items-end relative">
            <img ref="roomRenderEl" class="w-full max-w-md object-cover" src="/public/images/room-render.png" alt="room render" />
            <img ref="bedEl" class="bed absolute top-0 left-0 w-full" src="/public/images/bed.png" alt="bed" />
            <img ref="deskEl" class="desk absolute top-0 left-0 w-full" src="/public/images/desk.png" alt="desk" />
            <img ref="chairEl" class="chair absolute top-0 left-0 w-full" src="/public/images/chair.png" alt="chair" />
            <img ref="plantLampEl" class="plant-lamp absolute top-0 left-0 w-full" src="/public/images/plant-lamp.png" alt="plant lamp" />
            <img ref="shelvesEl" class="shelves absolute top-0 left-0 w-full" src="/public/images/shelves.png" alt="shelves" />
          </div>
        </div>
      </div>
    </WrappersContent>
    </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
  .clip-path {
    clip-path: ellipse(100% 100% at center);
  }

  .bed {
    width: 214px;
    transform: translate(96px, 271px);
  }

  .desk {
    width: 163px;
    transform: translate(266px, 312px);
  }

  .chair {
    width: 56px;
    transform: translate(275px, 329px);
  }

  .plant-lamp {
    width: 129px;
    transform: translate(26px, 318px);
  }

  .shelves {
    width: 87px;
    transform: translate(42px, 196px);
  }
</style>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

  const outerDivEl = ref<NullableHTMLElement>(null);
  const innerDivEl = ref<NullableHTMLElement>(null);
  const aboutNavBarEl = ref<NullableHTMLElement>(null);
  const contentEl = ref<NullableHTMLElement>(null);

  const totalContentHeight = computed<number>(() => {
    if (!contentEl.value || !aboutNavBarEl.value) {
      console.log(!aboutNavBarEl.value)
      console.log(!contentEl.value)
      return 0;
    }

    // height in rem
    let height = ((aboutNavBarEl.value!.clientHeight + contentEl.value!.clientHeight) / 16);

    return height;
  });

  const outerDivHeight = computed<string>(() => {
    if (totalContentHeight.value == 0) {
      return "100%";
    } else {
      return `${totalContentHeight.value}rem`;
    }
  });

  const innerDivHeight = computed<string>(() => {
    if (totalContentHeight.value == 0) {
      return "100%";
    } else {
      return `${totalContentHeight.value + 5}rem`;
    }
  });

  declare var ViewTimeline: any;  

  const viewReferenceEl = ref<NullableHTMLElement>(null);
  const roomRenderEl = ref<NullableHTMLElement>(null);
  const bedEl = ref<NullableHTMLElement>(null);
  const deskEl = ref<NullableHTMLElement>(null);
  const chairEl = ref<NullableHTMLElement>(null);
  const plantLampEl = ref<NullableHTMLElement>(null);
  const shelvesEl = ref<NullableHTMLElement>(null);

  const createScrollAnimations = (
    viewReference: NullableHTMLElement,
    roomRender: NullableHTMLElement,
    bed: NullableHTMLElement,
    desk: NullableHTMLElement,
    chair: NullableHTMLElement,
    plantLamp: NullableHTMLElement,
    shelves: NullableHTMLElement
  ) => {
    const timeline = new ViewTimeline({
      subject: viewReference,
      axis: "block",
    });

    const opacity = [0, 0.5, 1, 1, 1, 1];

    roomRender!.animate(
      {
        transform: ["translate(0, -300px)", "translate(0, 0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    bed!.animate(
      {
        transform: ["translate(96px, -200px)", "translate(96px, 271px)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    desk!.animate(
      {
        transform: ["translate(266px, -400px)", "translate(266px, 312px)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    chair!.animate(
      {
        transform: ["translate(275px, -200px)", "translate(275px, 329px)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    plantLamp!.animate(
      {
        transform: ["translate(26px, -300px)", "translate(26px, 318px)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    shelves!.animate(
      {
        transform: ["translate(42px, -500px)", "translate(42px, 196px)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );
  };

  onMounted(() => {
    createScrollAnimations(
      viewReferenceEl.value,
      roomRenderEl.value,
      bedEl.value,
      deskEl.value,
      chairEl.value,
      plantLampEl.value,
      shelvesEl.value
    );
  });
</script>