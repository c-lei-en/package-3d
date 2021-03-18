<template>
  <div>
    <el-input
      v-model="$store.state.StickDis"
      size="small"
      :readonly="readonly"
      style="position:absolute;bottom:40px;right:275px;width: 200px;"
    ></el-input>
    <el-button
      plain
      size="small"
      @click="CountLength"
      style="position: absolute;bottom: 40px; right: 175px;width: 80px"
      >计算距离</el-button
    >
    <el-button
      plain
      size="small"
      @click="CancelMeasure"
      style="position:absolute;bottom: 40px; right: 75px;width: 80px"
      >退 出</el-button
    >
  </div>
</template>

<script>
import { clear, ClearLine, CountLineLength } from "./../utils/MenuFunction";
import { ClearIndex } from "./../utils/ClearIndex";
export default {
  name: "draft",
  data() {
    return {
      tip: "测量中...",
      readonly: true
    };
  },
  methods: {
    CountLength() {
      this.$store.state.StickDis = this.tip;
      this.tip = CountLineLength();
      this.$store.state.StickDis = this.tip;
    },
    CancelMeasure() {
      try {
        clear();
      } catch (e) {
        0;
      }
      ClearLine;
      this.$store.state.StickDis = "贴地线长度";
      this.$store.state.status.draftStatus = false;
      ClearIndex();
    }
  }
};
</script>

<style scoped></style>
