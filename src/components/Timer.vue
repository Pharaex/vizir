<template>
  <div>
    <p class="font-clock">{{ formattedTime }}</p>
    <fwb-button @click="startStopTimer">
      {{ timerButtonText }}
    </fwb-button>
    <fwb-button @click="showModal"> Set Time </fwb-button>
  </div>

  <div>
    <h3>{{ timerType }}</h3>
  </div>
  <fwb-modal v-if="isShowModal" persistent>
    <template #body>
      <fwb-input v-model="hours" placeholder="00" label="HH" />
      <fwb-input v-model="minutes" placeholder="00" label="MM" />
      <fwb-input v-model="seconds" placeholder="00" label="SS" />
    </template>
    <template #footer>
      <div>
        <fwb-radio
          v-model="timerTypePicked"
          name="radio"
          label="Work"
          value="one"
        />
        <fwb-radio
          v-model="timerTypePicked"
          name="radio"
          label="Meditation"
          value="two"
        />
      </div>
      <div>
        <fwb-button @click="closeModal" color="alternative"> Set </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { FwbButton, FwbModal, FwbInput, FwbRadio } from "flowbite-vue";
const hours = ref<number>(0);
const minutes = ref<number>(30);
const seconds = ref<number>(0);
const timerActive = ref(false);
const isShowModal = ref(false);
const timerType = ref("Time To Work");
const timerTypePicked = ref("one");

watch(timerTypePicked, (newVal) => {
  if (newVal === "two") {
    timerType.value = "Time To Meditate";
    hours.value = 0;
    minutes.value = 5;
    seconds.value = 0;
  } else if (newVal === "one") {
    timerType.value = "Time To Work";
    hours.value = 0;
    minutes.value = 30;
    seconds.value = 0;
  }
});

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
    updateTimerType();
  }
};

const updateTimerParts = () => {
  const remainingHours = Math.floor(totalSeconds.value / 3600);
  const remainingMinutes = Math.floor((totalSeconds.value % 3600) / 60);
  seconds.value = totalSeconds.value % 60;
  hours.value = remainingHours;
  minutes.value = remainingMinutes;
};

const updateTimerType = () => {
  if (
    timerType.value === "Time To Work" ||
    timerType.value === "Time To Meditate"
  ) {
    timerType.value = "Break Time";
    hours.value = 0;
    minutes.value = 5;
    seconds.value = 0;
  } else if (
    timerType.value === "Break Time" &&
    timerTypePicked.value === "one"
  ) {
    timerType.value = "Time To Work";
    hours.value = 0;
    minutes.value = 30;
    seconds.value = 0;
  } else if (
    timerType.value === "Break Time" &&
    timerTypePicked.value === "two"
  ) {
    timerType.value = "Time To Meditate";
    hours.value = 0;
    minutes.value = 5;
    seconds.value = 0;
  }
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
