<template>
    <div class="container-fluid">
        <router-view
          keep-alive
          transition
          transition-mode="out-in">
        </router-view>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    }
};
</script>
<style lang="scss">
    @import './styles/app';
</style>
