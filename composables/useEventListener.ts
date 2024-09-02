// type EventListenerCallback<T = Event> = (event?: T) => void;

export const useEventListener = <T extends keyof HTMLElementEventMap>(
  target: HTMLElement, 
  event: T, 
  callback: (event: HTMLElementEventMap[T]) => void
) => {
  // console.log("useEventListener");
  onMounted(() => target.addEventListener(event, callback as EventListener));
  onUnmounted(() => target.removeEventListener(event, callback as EventListener));
}
