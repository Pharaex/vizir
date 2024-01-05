<template>
  <div>
    <FwbButton @click="showModal">Open Modal</FwbButton>
  </div>
  <div>
    <FwbModal v-if="isShowModal" persistent>
      <template #body>
        <div></div>
      </template>
      <template #footer>
        <div>
          <fwb-radio name="radio" label="Work" value="one" />
          <fwb-radio name="radio" label="Meditation" value="two" />
        </div>
        <div>
          <fwb-button @click="closeModal" color="alternative"> Set </fwb-button>
        </div>
      </template>
    </FwbModal>
  </div>
</template>
<script setup lang="ts">
import { FwbButton, FwbModal, FwbRadio } from "flowbite-vue";
import { ref } from "vue";

const isShowModal = ref(false);

const showModal = () => (isShowModal.value = true);
const closeModal = () => (isShowModal.value = false);
</script>
<style></style>
