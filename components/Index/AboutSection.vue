<template>
  <section id="about-section" class="bg-orange-100 relative z-[200]">
    <div ref="outerDivEl" class="clip-path bg-orange-100" :style="{ transform: 'translateY(3rem)', height: outerDivHeight }">
      <div ref="innerDivEl" class="" :style="{ height: innerDivHeight }">
        <div ref="aboutNavBarEl" class="sticky top-0 z-40 text-black" style="transform: translateY(-3.03rem)">
          <NavBar :underline="'about'" />
        </div>

        <div ref="contentEl">
          <WrappersContent class="relative">
            <div ref="viewReferenceEl" class="w-full"></div>

            <div class="text-black pb-16 xs:pb-18 sm:pb-24 lg:pb-28 pt-12 xs:pt-14 sm:pt-16 md:pt-20 relative" id="about">
              <h2 class="text-orange-600 text-center text-5xl sm:text-6xl pb-12 xs:pb-14 sm:pb-16 md:pb-20 z-10 relative" style="font-family: 'Archivo Black', sans-serif;">
                About
              </h2>

              <div class="flex flex-col md:flex-row w-full justify-center md:justify-around items-center md:items-end h-full gap-4">
                <div class="flex flex-col h-full max-w-lg md:max-w-sm lg:max-w-md md:self-start justify-between items-center 
                bg-orange-200/40 md:bg-orange-100/0 p-4 md:p-0 rounded-lg">
                  <p class="pb-10 md:pb-14">
                    I’m a 3D artist with a focus on creating clean, detailed models for a range of industries, from gaming to product design. My work is all about precision and bringing ideas to life in the digital space.
                  </p>
                  <p class="pb-10 md:pb-14">
                    With a strong passion for both form and function, I create 3D models that are not only visually striking but optimized for performance. Whether it’s characters, environments, or products, I ensure every detail serves the project’s purpose.
                  </p>
                  <p class="">
                    Using tools like Blender and TouchDesigner, I turn concepts into fully realized 3D assets. From initial sketches to final renders, my goal is to deliver models that are ready to inspire, tell a story, or solve a problem.
                  </p>
                </div>

                <div class="relative w-full md:w-fit flex justify-center shrink-0 md:items-end pt-8 sm:pt-10 md:pt-0">
                  <div class="w-full max-w-sm lg:max-w-md relative">
                    <img ref="roomEl" class="relative" src="/public/images/room/room.png" alt="room" />
                    <!-- <img ref="bedEl" class="bed absolute hidden md:block" src="/public/images/bed.png" alt="bed" /> -->
                    <img ref="deskEl" class="absolute left-0 top-0" src="/public/images/room/desk.png" alt="desk" />
                    <!-- <img ref="chairEl" class="chair absolute hidden md:block" src="/public/images/chair.png" alt="chair" /> -->
                    <img ref="plantEl" class="absolute left-0 top-0" src="/public/images/room/plant.png" alt="plant" />
                    <!-- <img ref="shelvesEl" class="shelves absolute hidden md:block" src="/public/images/shelves.png" alt="shelves" /> -->
                    <img ref="lampEl" class="absolute left-0 top-0" src="/public/images/room/lamp.png" alt="lamp" />
                    <img ref="posterEl" class="absolute left-0 top-0" src="/public/images/room/poster.png" alt="poster" />
                  </div>
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

  .plant {
    width: 129px;
    bottom: 90px;
    left: 26px;
  }

  .lamp {
    width: 129px;
    bottom: 90px;
    left: 26px;
  }

  .poster {
    width: 129px;
    bottom: 90px;
    left: 26px;
  }

  .shelves {
    width: 87px;
    bottom: 262px;
    left: 42px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .bed {
      width: 183px;
      bottom: 96px;
      left: 84px;
    }

    .desk {
      width: 140px;
      bottom: 73px;
      left: 227px;
    }

    .chair {
      width: 48px;
      bottom: 88px;
      left: 235px;
    }

    .plant-lamp {
      width: 112px;
      bottom: 77px;
      left: 22px;
    }

    .shelves {
      width: 71px;
      bottom: 226px;
      left: 39px;
    }
  }
</style>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

  const outerDivEl = ref<NullableHTMLElement>(null);
  const innerDivEl = ref<NullableHTMLElement>(null);
  const aboutNavBarEl = ref<NullableHTMLElement>(null);
  const contentEl = ref<NullableHTMLElement>(null);

  const totalContentHeight = ref<number>(0);
  
  const updateTotalContentHeight = () => {
    if (!contentEl.value || !aboutNavBarEl.value) {
      totalContentHeight.value = 0;
    }

    // height in rem
    totalContentHeight.value = ((aboutNavBarEl.value!.clientHeight + contentEl.value!.clientHeight) / 16);
  };

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
  const roomEl = ref<NullableHTMLElement>(null);
  // const bedEl = ref<NullableHTMLElement>(null);
  const deskEl = ref<NullableHTMLElement>(null);
  // const chairEl = ref<NullableHTMLElement>(null);
  const plantEl = ref<NullableHTMLElement>(null);
  const lampEl = ref<NullableHTMLElement>(null);
  const posterEl = ref<NullableHTMLElement>(null);
  // const shelvesEl = ref<NullableHTMLElement>(null);

  const createScrollAnimations = (
    viewReference: NullableHTMLElement,
  ) => {
    const timeline = new ViewTimeline({
      subject: viewReference,
      axis: "block",
    });

    const opacity = [0, 0.5, 1, 1, 1, 1];

    roomEl.value!.animate(
      {
        transform: ["translateY(-150px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    // bed!.animate(
    //   {
    //     transform: ["translateY(-200px)", "translateY(0)"],
    //     opacity: opacity
    //   },
    //   {
    //     fill: "both",
    //     timeline: timeline,
    //   }
    // );

    deskEl.value!.animate(
      {
        transform: ["translateY(-400px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    // chair!.animate(
    //   {
    //     transform: ["translateY(-300px)", "translateY(0)"],
    //     opacity: opacity
    //   },
    //   {
    //     fill: "both",
    //     timeline: timeline,
    //   }
    // );

    plantEl.value!.animate(
      {
        transform: ["translateY(-250px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    lampEl.value!.animate(
      {
        transform: ["translateY(-300px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline
      }
    );

    posterEl.value!.animate(
      {
        transform: ["translateY(-200px)", "translateY(0)"],
        opacity: opacity
      },
      {
        fill: "both",
        timeline: timeline
      }
    );
      
    // shelves!.animate(
    //   {
    //     transform: ["translateY(-500px)", "translateY(0)"],
    //     opacity: opacity
    //   },
    //   {
    //     fill: "both",
    //     timeline: timeline,
    //   }
    // );
  };

  let resizeObserver: ResizeObserver;

  onMounted(() => {
    createScrollAnimations(
      viewReferenceEl.value
    );

    resizeObserver = new ResizeObserver(updateTotalContentHeight);
    resizeObserver.observe(contentEl.value!);
    resizeObserver.observe(aboutNavBarEl.value!);

    // fix for nav bar not showing on first load, fixed by a repaint
    if (aboutNavBarEl.value) {
      setTimeout(() => {
        aboutNavBarEl.value!.style.display = 'none';
        aboutNavBarEl.value!.offsetHeight; // Trigger reflow
        aboutNavBarEl.value!.style.display = 'block';
      }, 2000);
    }
  });
</script>