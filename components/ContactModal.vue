<template>
  <div id="contact-modal" ref="contactModalEl" class="modal-content w-full h-dvh hidden fixed top-0 left-0 bg-black/50" style="z-index: 1000">
    <div ref="contactModalOverlayEl" class="w-full h-full flex justify-end">
    <div ref="contactModalContentEl" class="h-full w-content modal-content bg-background/90">
      <h1 class="inline-block" >TEST</h1>
    </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-content {
    transition: all 0.5s ease-in-out;
  }
</style>

<script setup lang="ts">
  import type { NullableHTMLElement } from '~/types';

  const contactModalEl = ref<NullableHTMLElement>(null);
  const contactModalOverlayEl = ref<NullableHTMLElement>(null);

  const openModal = () => {
    if (!contactModalEl.value) {
      return;
    }
    contactModalEl.value!.style.display = ('block');
  }

  const closeModal = () => {
    if (!contactModalEl.value) {
      return;
    }
    contactModalEl.value!.style.display = ('none');
  }

  const onWindowClick = (event: MouseEvent) => {
    if (!contactModalOverlayEl.value) {
      return;
    } else if (event.target == contactModalOverlayEl.value!) {
      closeModal();
    }
  }

  watchEffect(() => {
    if (!contactModalEl.value) {
      return;
    }
    
  })

  onMounted(() => {
    window.addEventListener('click', onWindowClick);
  });

</script>