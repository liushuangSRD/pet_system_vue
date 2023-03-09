<template>
  <div class="container">
    <div class="title" v-if="!editBookId">新建宠物类型{{ editBookId }}</div>
    <div class="title" v-else>
      <span>修改宠物类型</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="note" status-icon ref="form" label-width="150px" @submit.prevent :rules="rules">
            <el-form-item label="宠物类型" prop="type">
              <el-input v-model="note.type" placeholder="请填写宠物类型"></el-input>
            </el-form-item>
            <el-form-item label="宠物子类型" prop="subType">
              <el-input v-model="note.subType" placeholder="请填写宠物子类型"></el-input>
            </el-form-item>

            <el-form-item label="宠物性格" prop="nature">
              <el-input v-model="note.nature" placeholder="请填写宠物性格"></el-input>
            </el-form-item>

            <el-form-item label="宠物照片" prop="image">
              <el-input v-model="note.image" disabled placeholder="请点击+上传宠物照片"></el-input>
              <el-upload
                class="avatar-uploader"
                :action="uploadPath"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                >
                <img v-if="note.image" :src="note.image" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">+</el-icon>
              </el-upload>
            </el-form-item>

            <el-form-item label="宠物类型介绍" prop="summary">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="请输入宠物类型介绍"
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
import noteModel from '@/model/petType'
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
    const note = reactive({ type: '', subType: '', nature: '', image: '' ,summary:'', id:null, imageId:null})
    const initData = ref([])
    const listAssign = (a, b) => Object.keys(a).forEach(key => {
      a[key] = b[key] || a[key]
    })

  const handleAvatarSuccess = (response) => { 
  imageUrl.value = response[0].url
  note.imageId = response[0].id
  note.image = response[0].url
}
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
            router.push('/petType/list')
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
      handleAvatarSuccess,
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
    type: [{ validator: checkInfo, trigger: 'blur', required: true }],
    subType: [{ validator: checkInfo, trigger: 'blur', required: true }],
    image: [{ validator: checkInfo, trigger: 'blur', required: true }],
    summary: [{ validator: checkInfo, trigger: 'blur', required: true }],
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
