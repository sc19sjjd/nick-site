<template>
  <WrappersContent class="bg-orange-100 relative">
    <div ref="viewReferenceEl" class="w-full pt-32"></div>

    <div class="min-h-dvh text-black py-20">
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
</template>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

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

    roomRender!.animate(
      {
        transform: ["translate(0, -300px)", "translate(0, 0)"],
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    bed!.animate(
      {
        transform: ["translate(96px, -200px)", "translate(96px, 271px)"],
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    desk!.animate(
      {
        transform: ["translate(266px, -400px)", "translate(266px, 312px)"],
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    chair!.animate(
      {
        transform: ["translate(275px, -200px)", "translate(275px, 329px)"],
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    plantLamp!.animate(
      {
        transform: ["translate(26px, -300px)", "translate(26px, 318px)"],
      },
      {
        fill: "both",
        timeline: timeline,
      }
    );

    shelves!.animate(
      {
        transform: ["translate(42px, -500px)", "translate(42px, 196px)"],
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

<style scoped>
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