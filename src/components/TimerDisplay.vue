<template>
  <div>
    {{ timeDisplay }}
    <FwbButton @click="toggleTimer">{{ timerActivation }}</FwbButton>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { FwbButton } from "flowbite-vue";

const hours = ref(0);
const minutes = ref(5);
const seconds = ref(0);
const timerActive = ref(false);
const timerActivation = ref("Start");

const timeDisplay = computed(() => {
  const hh = String(hours.value).padStart(2, "0");
  const mm = String(minutes.value).padStart(2, "0");
  const ss = String(seconds.value).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
});

const toggleTimer = () => {
  timerActive.value = !timerActive.value;
  timerActivation.value = timerActive.value ? "Stop" : "Start";
  tick();
};

const totalSeconds = computed(
  () => hours.value * 3600 + minutes.value * 60 + seconds.value
);

const updateTimerDisplay = () => {
  let remainingSeconds = totalSeconds.value;

  const updateHours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;

  const updateMinutes = Math.floor(remainingSeconds / 60);
  remainingSeconds %= 60;

  hours.value = updateHours;
  minutes.value = updateMinutes;
  seconds.value = remainingSeconds;
};

const tick = () => {
  if (totalSeconds.value > 0 && timerActive.value) {
    setTimeout(() => {
      seconds.value--;
      updateTimerDisplay();
      if (totalSeconds.value > 0 && timerActive.value) {
        tick();
      } else {
        timerActive.value = false;
        timerActivation.value = "Start";
      }
    }, 1000);
  }
};
</script>
<style></style>
