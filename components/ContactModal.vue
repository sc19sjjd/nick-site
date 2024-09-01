<template>
  <div id="contact-modal" ref="contactModalEl" class="modal-content w-full hidden h-dvh fixed top-0 left-0 bg-black/50" style="z-index: 1000">
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

  .modal-closed {
    animation: fade-out 0.3s ease-in-out;
    animation-fill-mode: forwards;
  }

  .modal-open {
    animation: fade-in 0.3s ease-in-out;
    animation-fill-mode: forwards;
  }

  .modal-open > * > * {
    animation: slide-in 0.3s ease-in-out;
  }

  .modal-closed > * > * {
    animation: slide-out 0.3s ease-in-out;
  }

  @keyframes fade-in {
    from { opacity: 0; display: none; }
    to { opacity: 1; display: block; }
  }

  @keyframes fade-out {
    from { opacity: 1; display: block; }
    to { opacity: 0; display:none; }
  }

  @keyframes slide-in {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes slide-out {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
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
    contactModalEl.value!.classList.remove('hidden');
    contactModalEl.value!.classList.remove('modal-closed');
    contactModalEl.value!.classList.add('modal-open');
  }

  const closeModal = () => {
    if (!contactModalEl.value) {
      return;
    }
    // contactModalEl.value!.style.display = ('none');
    contactModalEl.value!.classList.remove('modal-open');
    contactModalEl.value!.classList.add('modal-closed');
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
    else if (contactModalEl.value!.classList.contains('modal-open')) {
      contactModalEl.value!.classList.remove('hidden');
    }
  });

  onMounted(() => {
    window.addEventListener('click', onWindowClick);
  });

</script>