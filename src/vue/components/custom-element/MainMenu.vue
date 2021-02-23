<template>
  <div>MainMenu</div>
</template>

<script>
export default {
  props: ["linklists"],
  data() {
    return {
      menus: []
    };
  },
  created() {
    console.log("MainMenu");
    console.log(this.linklists);
  }
};
</script>
