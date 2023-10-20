<template>
  <div class="p-3 d-flex justify-content-center">
    <div class="card e404">
      <h4 class="card-header eroText">Error 404</h4>
      <div class="card-body">
        <p class="card-title">{{ $i18n.global.t('Permission.NODE_ERROR404') }}</p>
        <div class="d-flex justify-content-between">
          <router-link to>
            <el-button @click="$router.back(-1)">
              <i class="fas fa-undo"></i>
              {{ $i18n.global.t('Permission.back') }}
            </el-button>
          </router-link>

          <router-link to="/" class="el-button">
            <icon icon="fas fa-home" />
            {{ $i18n.global.t('Permission.backToHome') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>

export default {}
</script>

<style lang="scss" scoped>
$color: #333;
.e404 {
  width: 400px;
}

.eroText {
  color: $color;
}
</style>
