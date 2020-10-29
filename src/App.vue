<template>
  <router-view />
</template>

<style>
*,
::after,
::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  max-height: 100vh;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}
::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background: #ddd;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
}
::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.4);
}
/* ::-webkit-scrollbar-thumb:window-inactive {
} */
</style>
