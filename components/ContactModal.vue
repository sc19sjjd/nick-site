<template>
  <div id="contact-modal" ref="contactModalEl" class="w-full hidden h-dvh fixed top-0 left-0 bg-black/50" style="z-index: 1000">
    <div ref="contactModalOverlayEl" class="w-full h-full flex justify-end">
    <div ref="contactModalContentEl" class="h-fit bg-background/90 font-black text-3xl min-w-4/12 rounded-bl-lg">
      <div class="linked-in px-6 pt-4 pb-4 flex items-center relative z-10 hover:cursor-pointer">
        LinkedIn
        <img src="/public/icons/linkedin.png" alt="linkedin" class="w-8 pl-3 box-content" />
      </div>
      <div class="email px-6 pt-4 pb-4 flex items-center relative z-10 hover:cursor-pointer">
        nicholasclay@gmail.com
        <img src="/public/icons/email.png" alt="email" class="w-10 pl-2 box-content" />
      </div>

      <div class="absolute top-0 right-0 pr-6 pt-6 z-10">
        <div @click="closeModal" class="cursor-pointer z-30">
          <img src="/public/icons/cross-white.png" alt="close" class="w-4 box-content" />
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
  .linked-in::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: bottom center;
    transform: scaleY(0);
    background: #0284c7;
    z-index: -1;
    opacity: 0.9;
    transition: transform 0.4s;
  }

  .linked-in:hover::after, .email:hover::after {
    transform: scaleY(1);
  }

  .email::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: bottom center;
    transform: scaleY(0);
    background: #b91c1c;
    z-index: -1;
    opacity: 0.9;
    transition: transform 0.4s;
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
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }

  @keyframes slide-out {
    from { transform: translateY(0); }
    to { transform: translateY(-100%); }
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