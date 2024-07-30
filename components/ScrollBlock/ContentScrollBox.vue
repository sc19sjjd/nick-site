<template>
  <div ref="scrollContainer" class="w-full h-full bg-black flex flex-row justify-evenly">
    <div v-for="index in props.numRows" class="h-full overflow-y-visible overflow-x-visible">

      <div class="overflow-x-visible" ref="firstScrollBoxes" :class="{ 'reverse-translate': props.reverse }" :style="{ animation: 'none 30s linear infinite' }">
        <div v-for="(content) in firstContentData[index]">
          <div class="overflow-x-visible" style="height: 280px; width: 460px;">  
            <ScrollBlockContentPreviewContainer v-bind="content" @mouseover="isPaused=true" @mouseleave="isPaused=false" />
          </div>
          <div class="pt-4"></div>
        </div>
      </div>

      <div ref="secondScrollBoxes" class="overflow-x-visible" :class="{ 'reverse-translate': props.reverse }" :style="{ animation: 'none 30s linear infinite' }">
        <div v-for="(content) in secondContentData[index]" class="overflow-x-visible">
          <div style="height: 290px; width: 460px;" class="overflow-x-visible">  
            <ScrollBlockContentPreviewContainer v-bind="content" @mouseover="isPaused=true" @mouseleave="isPaused=false" />
          </div>
          <div class="pt-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

// so far requires content data to be at least 2
<script setup lang="ts">
  import { ref, onMounted, watchEffect, computed } from 'vue';

  export interface Content {
    videoUrl: string,
    videoType: string,
    contentTitle: string,
    contentLink: string
  }

  interface Props {
    contentData: Array<Content>,
    reverse?: boolean,
    numRows?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    reverse: false,
    numRows: 1
  });

  const getSliceIndex = (value: number, index: number) => {
    return (value + 2 * index) % props.contentData.length;
  }

  const contentLength = props.contentData.length;

  const firstContentData = [ 
    props.contentData.slice(0, 2),
    props.contentData.slice(2, 4),
    props.contentData.slice(4, 6)
  ];

  const secondContentData = [
    props.contentData.slice(2, contentLength),
    [ ...props.contentData.slice(4, contentLength), ...props.contentData.slice(0, 2) ],
    props.contentData.slice(0, 4)
  ];

  // const firstContentData = computed<Array<Array<Content>>>(() => {
  //   let data = [];
  //   console.log(props.numRows);
  //   for (let i=0; i<props.numRows; i++) {
  //     console.log("first: " + getSliceIndex(0, i) + ", " + getSliceIndex(2, i));
  //     data.push(props.contentData.slice(getSliceIndex(0, i), getSliceIndex(2, i)));
  //   }
  //   return data
  // });

  // const secondContentData = computed<Array<Array<Content>>>(() => {
  //   let data = [];

  //   for (let i=0; i<props.numRows; i++) {
  //     console.log("second: " + getSliceIndex(2, i) + ", " + getSliceIndex(props.contentData.length, i));
  //     data.push(props.contentData.slice(getSliceIndex(2, i), getSliceIndex(props.contentData.length, i)));
  //   }

  //   return data;
  //   // if (props.contentData.length < 4) {
  //   //   return [...props.contentData.slice(2, 3), ...props.contentData];
  //   // }
  //   // else {
  //   //   return props.contentData.slice(2, props.contentData.length);
  //   // }
  // });

  // class FrameService {
  //   frame: any | null = null

  //   debounce = (callback: Function, ...args: any) => {
  //     if (this.frame) this.cancel();

  //     this.frame = requestAnimationFrame(() => {
  //       this.frame = null;
  //       callback(...args)
  //     });
  //   }

  //   cancel = () => {
  //     cancelAnimationFrame(this.frame);
  //   }
  // }

  // const frameService = new FrameService();

  const scrollContainer = ref<HTMLElement | null>(null);
  const firstScrollBoxes = ref<Array<HTMLElement> | null>(null);
  const secondScrollBoxes = ref<Array<HTMLElement> | null>(null);
  // const scrollRate = 2;
  // let scrollY = 0;
  const isPaused = ref(false);
  // let lastTimestamp = 0;

  // const halfScrollBoxHeight = computed(() => {
  //   if (scrollBox) {
  //     return scrollBox.value!.clientHeight / 2;
  //   }
  //   else {
  //     return null;
  //   }
  // });

  // // let scrollMethod: Function | null = null;

  // const scrollMethod = props.reverse ? 
  //   () => {
  //     scrollBox.value!.style.transform = `translateY(-${scrollY}px)`;
  //   }
  //   :
  //   () => {
  //     scrollBox.value!.style.transform = `translateY(${scrollY - halfScrollBoxHeight.value!}px)`;
  //   }

  // const scroll = (timestamp: number) => {
  //   // const elapsed = timestamp - lastTimestamp;

  //   // if (elapsed < 13) {
  //   //   window.requestAnimationFrame(scroll);
  //   //   return;
  //   // }

  //   // lastTimestamp = timestamp;
    
  //   // const halfClientHeight = scrollBox.value!.clientHeight / 2;

  //   scrollY += scrollRate;

  //   scrollMethod();

  //   if (scrollY > halfScrollBoxHeight.value!) {
  //     scrollY = 0;
  //   }

  //   frameService.debounce(scroll);
  // }

  // function startScrolling(): void {
  //   if (!scrollBox) {
  //     return;
  //   }

  //   frameService.debounce(scroll);
  // };

  // const animate = false;

  // function pauseAnimation(ref: any | null): void {
  //   if (ref && animate) {
  //     ref.classList.add('paused');    
  //   }

  // }

  // function resumeAnimation(ref: any | null): void {
  //   if (ref && animate) {
  //     ref.classList.remove('paused');
  //   }
  // }

  // const keyFrames = [
  //   {
  //     transform: "translateY(0)"
  //   },
  //   {
  //     transform: "translateY(-100%)"
  //   }
  // ];

  const firstAnimations = ref<Array<Animation> | null>(null);
  const secondAnimations = ref<Array<Animation> | null>(null);

  const autoScrollRate = 0.038;
  const animationTime = computed<number>((): number => {
    if (!firstScrollBoxes.value || !secondScrollBoxes.value) {
      return 0;
    }
    else {
      return (firstScrollBoxes.value![0].clientHeight + secondScrollBoxes.value![0].clientHeight) / autoScrollRate;
    }
  });
  const firstAnimationStartTime = computed<number>((): number => {
    if (!firstScrollBoxes.value) {
      return 0;
    }
    else {
      return firstScrollBoxes.value![0].clientHeight / autoScrollRate;
    }
  })

  const onWheel = (event: WheelEvent) => {
    const deltaYFactor = 3;
    // console.log(event.deltaY);
    
    firstAnimations.value?.forEach((animation) => {
      animation.currentTime = getNewAnimationTime(
        Number(animation.currentTime), 
        event.deltaY * deltaYFactor,
        animationTime.value
      );
    });
    secondAnimations.value?.forEach((animation) => {
      animation.currentTime = getNewAnimationTime(
        Number(animation.currentTime), 
        event.deltaY * deltaYFactor,
        animationTime.value
      );
    });

    isPaused.value = false;
  };

  const getNewAnimationTime = (currentTime: number, deltaTime: number, totalTime: number): number => {
    const timeSum = currentTime + deltaTime;
    
    if (timeSum >= totalTime) {
      return timeSum - totalTime;
    }
    else if (timeSum < 0) {
      return totalTime + timeSum; 
    }
    else {
      return timeSum;
    }
  };

  const firstScrollBoxHeight = computed<number>(() => {
    if (!firstScrollBoxes.value) {
      return 0;
    }
    else {
      return firstScrollBoxes.value![0].clientHeight;
    }
  });

  const secondScrollBoxHeight = computed<number>(() => {
    if (!secondScrollBoxes.value) {
      return 0;
    }
    else {
      return secondScrollBoxes.value![0].clientHeight;
    }
  });

  const firstAnimationKeyframes = computed(() => {
    if (!firstScrollBoxes.value || !secondScrollBoxes.value) return [];
    
    return [
      { transform: `translateY(${firstScrollBoxes.value![0].clientHeight}px)` },
      { transform: `translateY(-${secondScrollBoxes.value![0].clientHeight}px)` }
    ]
  });

  const secondAnimationKeyframes = computed(() => {
    if (!firstScrollBoxes.value || !secondScrollBoxes.value) return [];
    
    return [
      { transform: `translateY(0)` },
      { transform: `translateY(-${firstScrollBoxes.value![0].clientHeight + secondScrollBoxes.value![0].clientHeight}px)` }
    ]
  });

  const startAnimations = (scrollBoxes: Array<HTMLElement>, startTime: number, keyframes: Keyframe[]) => {
    // if (initialScrollBoxAnimation.value) initialScrollBoxAnimation.value!.cancel();
    let animations: Array<Animation> = [];

    scrollBoxes.forEach((scrollBox: HTMLElement, index) => {
      animations.push(
        scrollBox.animate(
          keyframes,
          {
            duration: animationTime.value,
            iterations: Infinity,
            direction: index % 2 == 0 ? "normal" : "reverse"
          }
        )
      );

      animations[index].currentTime = startTime;

      animations[index].addEventListener("finish", () => {
        console.log("initial animation finished");
      });
    });

    return animations;
  }

  // const startSecondaryAnimation = () => {
  //   // if (secondaryScrollBoxAnimation.value) secondaryScrollBoxAnimation.value!.cancel();
  //   secondaryScrollBoxAnimation.value = secondaryScrollBox.value!.animate(
  //     [
  //       { transform: `translateY(0)` },
  //       { transform: `translateY(-${secondaryScrollBox.value!.clientHeight + scrollBox.value!.clientHeight}px)` }
  //     ],
  //     {
  //       duration: animationTime.value,
  //       iterations: Infinity,
  //       direction: props.reverse ? "reverse" : "normal"
  //     }
  //   );

  //   // if (props.reverse) {
  //   //   secondaryScrollBoxAnimation.value!.updatePlaybackRate(-1);
  //   // }

  //   secondaryScrollBoxAnimation.value!.addEventListener("finish", () => {
  //     console.log("secondary animation finished");
  //     // startInitialContinuousAnimation();
  //   });
  // }

  const pauseAnimations = () => {
    firstAnimations.value?.forEach((animation) => {
      animation.pause();
      // animation.updatePlaybackRate(0.3);
    });
    secondAnimations.value?.forEach((animation) => {
      animation.pause();
      // animation.updatePlaybackRate(0.3);
    });
  }

  const playAnimations = () => {
    firstAnimations.value?.forEach((animation) => {
      animation.play();
      // animation.updatePlaybackRate(1);
    });
    secondAnimations.value?.forEach((animation) => {
      animation.play();
      // animation.updatePlaybackRate(1);
    });
  }

  onMounted(() => {
    firstAnimations.value = startAnimations(firstScrollBoxes.value!, firstAnimationStartTime.value, firstAnimationKeyframes.value);
    secondAnimations.value = startAnimations(secondScrollBoxes.value!, 0, secondAnimationKeyframes.value);

    watchEffect(() => {
      if (isPaused.value) {
        pauseAnimations();
      }
      else {
        playAnimations();
      }
    });

    scrollContainer.value?.addEventListener('wheel', onWheel);
  });
</script>

<style>
  @keyframes autoscroll {
    from { transform: translateY(0); }
    to { transform: translateY(-100%); }
  }

  .paused {
    animation-play-state: paused !important;
  }

  .reverse-translate {
    transform: translateY(-100%);
  }

</style>
