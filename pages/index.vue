<template>
    <div class="w-full flex flex-col justify-center">
      <!-- <div class="w-1/2 h-32 p-4">
        <ScrollBlockContentPreviewContainer
          :videoUrl="'videos/Vids/pathways.mp4'"
          :videoType="'video/mp4'"
          :contentTitle="'Pathways Project'"
          :contentLink="'blank'"
        />
      </div> -->
  
      <div class="w-full bg-black">
        <div class="flex justify-center">
          <div class="flex w-full" style="height: 700px;">
            <ScrollBlockContentScrollBox :contentData="data" :numRows="3" />
            <!-- <div class="w-48">
              <ScrollBlockContentPreviewContainer v-bind="content" />
            </div> -->
            <!-- <ScrollBlockContentScrollBox :contentData="data" :reverse="true" /> -->
            <!-- <ScrollBlockContentScrollBox :contentData="data" /> -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
    const content = [
      {
        videoUrl: "videos/Vids/optimised/bitrate_optimised_pathways_26_loop.mp4",
        videoType: "video/mp4",
        contentTitle: "Pathways Project",
        contentLink: "blank"
      },
      {
        videoUrl: "videos/Vids/optimised/optimised_cake_pointcloud.mp4",
        videoType: "video/mp4",
        contentTitle: "Pathways Project",
        contentLink: "blank"
      },
      {
        videoUrl: "videos/Vids/optimised/optimised_snake.mp4",
        videoType: "video/mp4",
        contentTitle: "Pathways Project",
        contentLink: "blank"
      },
      {
        videoUrl: "videos/Vids/optimised/optimised_deconstructing_statues.mp4",
        videoType: "video/mp4",
        contentTitle: "Pathways Project",
        contentLink: "blank"
      },
      {
        videoUrl: "videos/Vids/optimised/optimised_lens_distort.mp4",
        videoType: "video/mp4",
        contentTitle: "Pathways Project",
        contentLink: "blank"
      },
      {
        videoUrl: "videos/Vids/optimised/optimised_particle_box.mp4",
        videoType: "video/mp4",
        contentTitle: "Pathways Project",
        contentLink: "blank"
      }
    ];
  
    const data = content;
  </script>