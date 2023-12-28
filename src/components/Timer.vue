<template>
  <div>
    <p>{{ formattedTime }}</p>
    <fwb-button @click="startStopTimer">
      {{ timerButtonText }}
    </fwb-button>
    <fwb-button @click="showModal"> Open modal </fwb-button>
  </div>
  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #body> test template </template>
    <template #footer>
      <div>
        <fwb-button @click="closeModal" color="alternative"> Set </fwb-button>
        <fwb-button @click="closeModal" color="green"> Cancel </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { FwbButton, FwbModal } from "flowbite-vue";
const hours = ref(0);
const minutes = ref(5);
const seconds = ref(0);
const timerActive = ref(false);
const isShowModal = ref(false);

const totalSeconds = computed(
  () => hours.value * 3600 + minutes.value * 60 + seconds.value
);

const formattedTime = computed(() => {
  const hh = String(hours.value).padStart(2, "0");
  const mm = String(minutes.value).padStart(2, "0");
  const ss = String(seconds.value).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
});

const startStopTimer = () => {
  if (timerActive.value) {
    stopTimer();
  } else {
    startTimer();
  }
};

const startTimer = () => {
  timerActive.value = true;
  tick();
};

const stopTimer = () => {
  timerActive.value = false;
};

const tick = () => {
  if (totalSeconds.value > 0 && timerActive.value) {
    setTimeout(() => {
      seconds.value--;
      updateTimerParts();
      tick();
    }, 1000);
  } else {
    stopTimer();
  }
};

const updateTimerParts = () => {
  const remainingHours = Math.floor(totalSeconds.value / 3600);
  const remainingMinutes = Math.floor((totalSeconds.value % 3600) / 60);
  seconds.value = totalSeconds.value % 60;
  hours.value = remainingHours;
  minutes.value = remainingMinutes;
};

watch(
  () => totalSeconds.value,
  () => {
    updateTimerParts();
  }
);

onBeforeUnmount(() => {
  stopTimer();
});

const timerButtonText = computed(() => (timerActive.value ? "Stop" : "Start"));

function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}
</script>
