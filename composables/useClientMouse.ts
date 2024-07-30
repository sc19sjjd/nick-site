import type { NullableHTMLElement } from "~/types";
import { useEventListener } from "./useEventListener";

export const useClientMouse = (target: NullableHTMLElement | Ref<NullableHTMLElement>) => {
  const clientX = ref(0);
  const clientY = ref(0);

  const onMousemove = (event: MouseEvent) => {
    // console.log(`x: ${clientX.value}, y: ${clientY.value}`);
    // const valueTarget = toValue(target);
    // if (valueTarget) {
      // const boundingRect = valueTarget.getBoundingClientRect();
      const boundingRect = toValue(target)!.getBoundingClientRect();
      clientX.value = event.clientX - boundingRect.left;
      clientY.value = event.clientY - boundingRect.top;
    // }
  }

  onMounted(() => {
    watchEffect(() => {
      // console.log(target);
      const valueTarget = toValue(target);
  
      if (valueTarget) {
        valueTarget.addEventListener('mousemove', onMousemove);
      }
    });
  });

  onUnmounted(() => {
    const valueTarget = toValue(target);

    if (valueTarget) {
      valueTarget.removeEventListener('mousemove', onMousemove);
    }
  });

  // // if (target) {
  //   useEventListener(target as HTMLElement, 'mousemove', (event: MouseEvent) => {
  //     console.log("tracking mouse");
  //     offsetX.value = event.offsetX;
  //     offsetY.value = event.offsetY;
  //   });
  // // }

  return { clientX, clientY };
}
