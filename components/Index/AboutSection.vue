<template>
  <section id="about-section" class="bg-orange-100 relative z-40">
    <div ref="outerDivEl" class="clip-path bg-orange-100" :style="{ transform: 'translateY(3rem)', height: outerDivHeight }">
      <div ref="innerDivEl" class="" :style="{ height: innerDivHeight }">
        <div ref="aboutNavBarEl" class="sticky top-0 z-40 text-black" style="transform: translateY(-3.03rem)">
          <NavBar :underline="'about'" />
        </div>

        <div ref="contentEl">
          <WrappersContent class="relative">
            <div ref="viewReferenceEl" class="w-full"></div>

            <div class="text-black pb-28 pt-20 relative" id="about">
              <h2 class="text-orange-600 text-center text-6xl pb-16 z-10 relative" style="font-family: 'Archivo Black', sans-serif;">
                About me
              </h2>

              <div class="flex flex-col md:flex-row w-full justify-center md:justify-between items-center md:items-end">
                <div class="flex flex-col h-full w-fit justify-between items-center bg-orange-200/40 md:bg-orange-100/0 p-4 md:p-0 rounded-lg">
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
                  <p class="max-w-md md:pb-0">
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

                <div class="relative w-full md:w-fit flex justify-center md:items-end pt-14 md:pt-0">
                  <!-- <div class="flex items-end relative"> -->
                    <img ref="roomRenderEl" class="w-full max-w-md object-cover" src="/public/images/room-render.png" alt="room render" />
                    <img ref="bedEl" class="bed absolute" src="/public/images/bed.png" alt="bed" />
                    <img ref="deskEl" class="desk absolute bottom-0 left-0" src="/public/images/desk.png" alt="desk" />
                    <img ref="chairEl" class="chair absolute bottom-0 left-0" src="/public/images/chair.png" alt="chair" />
                    <img ref="plantLampEl" class="plant-lamp absolute bottom-0 left-0" src="/public/images/plant-lamp.png" alt="plant lamp" />
                    <img ref="shelvesEl" class="shelves absolute bottom-0 left-0" src="/public/images/shelves.png" alt="shelves" />
                  <!-- </div> -->
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
    clip-path: xywh(0 -15px 100% 100%);
  }

  .bed {
    width: 214px;
    bottom: 111px;
    left: 96px;
  }

  .desk {
    width: 163px;
    bottom: 86px;
    left: 266px;
  }

  .chair {
    width: 56px;
    bottom: 104px;
    left: 275px;
  }

  .plant-lamp {
    width: 129px;
    bottom: 90px;
    left: 26px;
  }

  .shelves {
    width: 87px;
    bottom: 262px;
    left: 42px;
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
      return `${totalContentHeight.value + 3.5}rem`;
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
        transform: ["translateY(-100px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    bed!.animate(
      {
        transform: ["translateY(-200px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    desk!.animate(
      {
        transform: ["translateY(-550px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    chair!.animate(
      {
        transform: ["translateY(-300px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    plantLamp!.animate(
      {
        transform: ["translateY(-300px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    shelves!.animate(
      {
        transform: ["translateY(-500px)", "translateY(0)"],
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

    // fix for nav bar not showing on first load, fixed by a repaint
    if (aboutNavBarEl.value) {
      setTimeout(() => {
        aboutNavBarEl.value!.style.display = 'none';
        aboutNavBarEl.value!.offsetHeight; // Trigger reflow
        aboutNavBarEl.value!.style.display = 'block';
      }, 1000);
    }
  });
</script>