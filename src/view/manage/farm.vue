<template>
  <div class="container">
    <div class="title" v-if="!editBookId">新建宠物寄养{{ editBookId }}</div>
    <div class="title" v-else>
      <span>修改宠物寄养</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="note" status-icon ref="form" label-width="120px" @submit.prevent :rules="rules">
            <el-form-item label="名称" prop="name">
              <el-input v-model="note.name" placeholder="请填写宠物名称"></el-input>
            </el-form-item>
            <el-form-item label="寄养地址" prop="address">
              <el-input v-model="note.address" placeholder="请填写寄养地址"></el-input>
            </el-form-item>
            <el-form-item label="寄养开始日期" prop="farmDate">
              <el-input v-model="note.farmDate" placeholder="请填写寄养开始日期"></el-input>
            </el-form-item>
            <el-form-item label="寄养天数" prop="days">
              <el-input v-model="note.days" placeholder="请填写寄养天数"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
              <el-input v-model="note.comment" ></el-input>
            </el-form-item>

            <el-form-item label="简介" prop="summary">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="请输入简介"
                v-model="note.summary"
              >
              </el-input>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm">保 存</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import noteModel from '@/model/farm'
import {
	useRouter
} from "vue-router";

export default {
  components: {
  },
  props: {
    editBookId: {
      type: Number,
      default: null,
    },
  },
  setup(props, context) {
    const imageUrl = ref(null)
    const uploadPath = 'http://localhost:5000/cms/file'
    const form = ref(null)
    const loading = ref(false)
    const note = reactive({ name: '', address: '', farmDate: '', days: '' , id:null, comment:'',summary:''})
    const initData = ref([])
    const listAssign = (a, b) => Object.keys(a).forEach(key => {
      a[key] = b[key] || a[key]
    })

    const router = useRouter()

    /**
     * 表单规则验证
     */
    const { rules } = getRules()

    onMounted(() => {
      if (props.editBookId) {
        getNote()
      }
    })

    const getNote = async () => {
      loading.value = true
      const res = await noteModel.getNote(props.editBookId)
      listAssign(note, res)
      loading.value = false
    }

    // 重置表单
    const resetForm = () => {
      form.value.resetFields()
    }

    const submitForm = async formName => {
      form.value.validate(async valid => {
        if (valid) {
          let res = {}
          if (props.editBookId) {
            note.id = props.editBookId
            res = await noteModel.editNote(props.editBookId, note)
            context.emit('editClose')
          } else {
            res = await noteModel.createNote(note)
            resetForm(formName)
          }
          if (res.code < window.MAX_SUCCESS_CODE) {
            ElMessage.success(`${res.message}`)
            router.push('/farm/list')
          }
        } else {
          console.error('error submit!!')
          ElMessage.error('请将信息填写完整')
        }
      })
    }

    const back = () => {
      context.emit('editClose')
    }

    return {
      back,
      note,
      form,
      imageUrl,
      rules,
      uploadPath,
      initData,
      router,
      resetForm,
      submitForm,
    }
  },
}

/**
 * 表单验证规则
 */
function getRules() {
  /**
   * 验证回调函数
   */
  const checkInfo = (rule, value, callback) => {
    if (!value) {
      callback(new Error('信息不能为空'))
    }
    callback()
  }
  const rules = {
    name: [{ validator: checkInfo, trigger: 'blur', required: true }],
    address: [{ validator: checkInfo, trigger: 'blur', required: true }],
    farmDate: [{ validator: checkInfo, trigger: 'blur', required: true }],
    days: [{ validator: checkInfo, trigger: 'blur', required: true }],
  }
  return { rules }
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 38px;
  color: #517ee7;
  width: 178px;
  height: 178px;
  border: 1px solid #3963BC;
  text-align: center;
}
</style>
