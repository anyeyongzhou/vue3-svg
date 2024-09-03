<template>
  <div class="content">
    <!-- <SvgIcon name="client" size="10rem" /> -->
    <el-card style="width: 50%">
      <el-form ref="dataForm" :model="sysMenu" label-width="100px" size="large">
        <el-form-item label="菜单类型:" prop="type">
          <el-radio-group v-model="sysMenu.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称:" prop="name">
          <el-input v-model="sysMenu.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="上级菜单:" prop="parentId">
          <el-tree-select
            clearable
            filterable
            style="width: 100%"
            v-model="sysMenu.parentId"
            node-key="id"
            :props="{ value: 'id', label: 'name' }"
            :data="menuList"
            check-strictly
            :render-after-expand="false"
            show-checkbox
            check-on-click-node
          >
          </el-tree-select>
        </el-form-item>
        <el-form-item v-if="sysMenu.type !== 2" label="路由路径:" prop="path">
          <el-input v-model="sysMenu.path" placeholder="例：/user/list" />
        </el-form-item>
        <el-form-item v-if="sysMenu.type === 1" label="组件路径:" prop="component">
          <el-input v-model="sysMenu.component" placeholder="/system/user/index">
            <template #prepend>src/view/</template>
            <template #append>.vue</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="sysMenu.type === 2" label="权限标识:" prop="perms">
          <el-input v-model="sysMenu.perms" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item v-if="sysMenu.type !== 2" label="菜单状态:" prop="status">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="停用"
            v-model="sysMenu.status"
          />
        </el-form-item>
        <el-form-item
          v-if="sysMenu.type == 0 || sysMenu.type == 1"
          label="图标:"
          prop="icon"
        >
          <icon-select ref="IconSelectRef" v-model="sysMenu.icon" />
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input-number
            v-model="sysMenu.sort"
            :min="0"
            :max="1000"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import IconSelect from "@/components/SelectIcon/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { onMounted, reactive } from "vue";
let sysMenu = reactive({
  id: "",
  parentId: "",
  type: 0,
  path: "",
  component: "",
  perms: "",
  icon: "",
  name: "",
  status: 1,
  sort: 0,
});
</script>
<style lang="scss" scoped></style>
