<template>
  <div id="contact-modal" ref="contactModalEl" class="w-full hidden h-dvh fixed top-0 left-0 bg-black/50" style="z-index: 1000">
    <div ref="contactModalOverlayEl" class="w-full h-full flex justify-end">

      <div ref="contactModalContentEl" class="h-fit bg-background/90 font-black text-3xl min-w-4/12 rounded-bl-lg relative">
        <div class="linked-in px-6 pt-4 pb-4 flex items-center relative z-10 hover:cursor-pointer" @click="() => openLinkedIn()">
          LinkedIn
          <img src="/public/icons/linkedin.png" alt="linkedin" class="w-8 pl-3 box-content" />
        </div>

        <div class="email px-6 pt-4 pb-4 flex items-center relative z-10 hover:cursor-pointer rounded-bl-lg overflow-hidden" 
        @click="() => openEmail()">
          nicholasclay@gmail.com
          <img src="/public/icons/email.png" alt="email" class="w-10 pl-2 box-content" />
        </div>

        <div class="absolute top-0 right-0 pr-6 pt-6 z-10">
          <div @click="closeModal" class="cursor-pointer z-30 opacity-60 hover:opacity-100 transition duration-300">
            <img src="/public/icons/cross-white.png" alt="close" class="w-4 box-content" />
          </div>
        </div>

        <div ref="emailAlertEl" class="absolute bottom-0 left-0 w-full hidden" style="transform: translateY(3.5rem);">
          <div class="w-full flex justify-center">
            <div class="rounded-lg bg-background/90 p-3 w-fit text-center">
              <p class="text-sm text-white">
                Email copied to clipboard
              </p>
            </div>  
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

  .email-copied {
    animation: fade-in 0.3s ease-in-out, fade-out 0.3s 2s ease-in-out;
    animation-fill-mode: forwards;
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
  const emailAlertEl = ref<NullableHTMLElement>(null);

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

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/nicholas-clay-uk/', '_blank')?.focus();
  };

  const openEmail = () => {
    // window.location.href = 'mailto:nicholasclay@gmail.com';
    navigator.clipboard.writeText('nicholasclay@gmail.com');
    alertEmailCopied();
  };

  const alertEmailCopied = () => {
    if (!emailAlertEl.value) {
      return;
    }
    emailAlertEl.value!.classList.remove('hidden');
    emailAlertEl.value!.classList.add('email-copied');
    setTimeout(() => {
      emailAlertEl.value!.classList.remove('email-copied');
      emailAlertEl.value!.classList.add('hidden');
    }, 2300);
  };

  onMounted(() => {
    window.addEventListener('click', onWindowClick);
  });

</script>