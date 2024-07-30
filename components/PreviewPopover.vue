<template>
  <div ref="outerElement" class="absolute hidden group-hover:block overflow-visible">
    <div ref="circleElement" class="z-100 relative bg-stone-200 rounded-full flex justify-center items-center h-16 w-16" 
    :style="{ left: leftPosition, top: topPosition }">
      <h3 class="p-0 m-0 text-black text-xs text-center font-medium leading-3">{{ props.title }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useClientMouse } from '~/composables/useClientMouse';
import type { NullableHTMLElement } from '~/types';

  interface Props {
    title: string
  }

  const props = defineProps<Props>();

  const outerElement = ref<NullableHTMLElement>(null);
  const parentElement = ref<NullableHTMLElement>(null);
  const circleElement = ref<NullableHTMLElement>(null);

  watchEffect(() => {
    if (outerElement.value) {
      parentElement.value = outerElement.value!.parentElement;
    }
  });

  const boundingRectLeftDiff = computed(() => {
    if (parentElement.value && outerElement.value) {
      const parentRect = parentElement.value!.getBoundingClientRect();
      const outerRect = outerElement.value!.getBoundingClientRect();
      return outerRect.left - parentRect.left;
    }
    else {
      return 0;
    }
  });
  const leftPosition = computed(() => {
    if (parentElement.value && outerElement.value && circleElement.value) {
      return `${clientX.value - circleElement.value!.clientWidth + 8}px`;
    }
    else {
      return 0;
    }
  });
  const topPosition = computed(() => {
    if (circleElement.value) {
      return `${clientY.value - circleElement.value!.clientHeight + 8}px`;
    }
    else {
      return 0;
    }
  });

  // let offsetX: globalThis.Ref<number>;
  // let offsetY: globalThis.Ref<number>;

  const { clientX, clientY } = useClientMouse(parentElement);

  interface MouseOffset {
    offsetX: globalThis.Ref<number>;
    offsetY: globalThis.Ref<number>;
  }
  
  let offset: MouseOffset; 
  // = useMouseOffset(parentElement.value);

  const applyParentClasses = (): void => {
    if (!parentElement.value) {
      return;
    }

    parentElement.value.classList.add("group");
  }

  onMounted(() => {
    // watchEffect(() => {
    //   // console.log(outerElement.value);
    //   offset = useMouseOffset(parentElement.value);
    // });
  });
</script>

<style>
 @keyframes grow {
  from { width: 0; height: 0 }
  to { width: 100%; height: 100% }
 }
</style>