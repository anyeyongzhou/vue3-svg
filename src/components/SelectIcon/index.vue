<template>
  <div class="content">
    <el-input
      style="width: 100%"
      v-model="inputIconValue"
      readonly
      placeholder="点击选择图标"
      @click="visible = !visible"
    >
      <template #prepend>
        <SvgIcon :size="20" :name="inputIconValue" />
      </template>
    </el-input>
    <el-popover
      shadow="none"
      :visible="visible"
      placement="bottom-end"
      trigger="click"
      width="400"
    >
      <template #reference>
        <div @click="visible = !visible">
          <i-ep-caret-top v-show="visible" />
          <i-ep-caret-bottom v-show="!visible" />
        </div>
      </template>
      <!-- 下拉选择弹窗 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <el-input
              v-model="filterValue"
              placeholder="输入图标名称"
              clearable
              @input="filterIcon"
            />
          </el-col>
          <el-col :span="6">
            <el-button @click="closeIcon()">关闭</el-button>
          </el-col>
        </el-row>
        <el-divider border-style="dashed" />

        <el-scrollbar height="300px">
          <div class="icon-list">
            <el-tooltip
              v-for="(iconName, index) in filterIconNames"
              :key="index"
              :content="iconName"
              placement="bottom"
              effect="light"
            >
              <div class="icon-item" @click="handleSelect(iconName)">
                <SvgIcon :name="iconName" />
              </div>
            </el-tooltip>
          </div>
        </el-scrollbar>
      </div>
    </el-popover>
  </div>
</template>
<script setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
import { onMounted, toRef, ref } from "vue";
const visible = ref(false); // 弹窗显示状态
const allIconNames = ref([]); // 所有的图标名称集合
const filterIconNames = ref([]); // 筛选之后名称集合
const filterValue = ref(""); // 筛选的值
// 修改父组件关联的值
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    require: false,
    default: "",
  },
});
const inputIconValue = toRef(props, "modelValue");
// 加载 icon
onMounted(() => {
  loadAllIcons();
});
// 获取所有图标
const loadAllIcons = () => {
  const icons = import.meta.glob("@/assets/icons/*.svg");
  for (const icon in icons) {
    const iconName = icon.split("/src/assets/icons/")[1].split(".")[0];
    allIconNames.value.push(iconName);
  }
  filterIconNames.value = allIconNames.value;
};
// 筛选 icon
const filterIcon = () => {
  if (filterValue.value) {
    filterIconNames.value = allIconNames.value.filter((iconName) =>
      iconName.includes(filterValue.value)
    );
  } else {
    filterIconNames.value = allIconNames.value;
  }
};
// 选择 icon
const handleSelect = (iconName) => {
  emit("update:modelValue", iconName);
  visible.value = false;
};

// 关闭组件
const closeIcon = () => {
  visible.value = false;
  filterValue.value = "";
  filterIconNames.value = allIconNames.value;
};
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 10px auto !important;
}
.icon-list {
  display: flex;
  flex-wrap: wrap;
  .icon-item {
    display: flex;
    justify-content: center;
    padding: 5px 0px;
    margin: 5px;
    width: 10%;
    cursor: pointer;
    border: 1px solid #ccc;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      transition: all 0.2s;
      transform: scaleX(1.1);
    }
  }
}
</style>
