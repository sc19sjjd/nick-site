#!/bin/bash

# optimizes mp4 videos in specified directory for web playback

if [ -z "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

DIRECTORY=$1

if [ ! -d "$DIRECTORY" ]; then
    echo "Error: $DIRECTORY is not a directory."
    exit 1
fi

for file in "$DIRECTORY"/*{.mp4,.mov}; do 
    # Skip if no mp4 files are found
    [ -e "$file" ] || continue

    filename=$(basename -- "$file")
    filename="${filename%.*}"

    # remove audio
    ffmpeg -i "$file" -an -c:v copy "$DIRECTORY/no_audio_$filename.mp4"

    # compress and optimize
    # -vf (filter) -> scale to h=480 conserving aspect ratio
    # -c:v (encoder) -> libx264 H.264 encoder, -x264opts sets options for encoder -> b=1500 set bitrate to 1.5MB (1500k bits)
    # -crf  
    # ffmpeg -i "$DIRECTORY/no_audio_$filename.mp4" -vf "scale=-2:600,fps=fps=24" -c:v libx264 -x264opts "bitrate=1500:preset=veryslow" -movflags +faststart "$DIRECTORY/optimized_no_audio_$filename.mp4"

    ffmpeg -i deconstructing_statues.mov -an -c:v copy ./no_audio/deconstructing_statues.mp4

    ffmpeg -i lens_distort.mp4 -an -vf "scale=-2:600,fps=fps=24,trim=10:25,setpts=PTS-STARTPTS" -c:v libx264 -x264opts crf=26 -preset veryslow -movflags +faststart ./optimised/optimised_lens_distort.mp4


    # # cleanup
    # rm "$DIRECTORY/no_audio_$filename.mp4"

done 