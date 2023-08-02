<!-- 编辑角色 -->

<template>
    <el-dialog v-model="props.visible" title="分配角色" :before-close="close">
        <el-form :model="form">

            <el-form-item>
                <el-select multiple v-model="roles" placeholder="Please select a zone">
                    <el-option v-for="role in form.roleLists" :label=role.name :value=role.id />

                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="updatRoles">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { ref, toRefs, reactive, watch } from "vue"
import { updateAdminRole } from '../../../request/api'

const props = defineProps<{
    visible: boolean
    form: { roleLists: { name: string, id: number }[], userRoles: { name: string, id: number }[], adminId: number }
}>()

const emits = defineEmits<{
    (event: 'close'): void
}>()

const close = () => {
    emits('close')
}
//确认按钮
const updatRoles = () => {
    updateAdminRole({ adminId: props.form.adminId, roleIds: roles.value.join(',') }).then(res => {
        if (res.code === 200) {
            close()

        }
    })
}

const roles = ref<number[]>([])

watch(() => props.form.userRoles, () => {
    roles.value = props.form.userRoles.map(item => item.id)
})

</script>

<style lang="less" scoped></style>