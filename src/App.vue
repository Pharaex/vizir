<template>
  <div class="flex-auto">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/timer">Timer</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
