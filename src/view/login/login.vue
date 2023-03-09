<template>
  <div class="login">
    <div class="team-name hidden-sm-and-down">
      <!-- <img src="@/assets/image/login/team-name.png" alt="logo" /> -->
    </div>
    <div class="form-box" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
      <div class="title"><h1 title="Lin">社区宠物平台</h1></div>
      <form class="login-form" autocomplete="off" @submit.prevent="throttleLogin()">
        <div class="form-item nickname">
          <span class="icon account-icon"></span>
          <input type="text" v-model="account.username" autocomplete="off" placeholder="请填写用户名" />
        </div>
        <div class="form-item password">
          <span class="icon secret-icon"></span>
          <input type="password" v-model="account.password" autocomplete="off" placeholder="请填写用户登录密码" />
        </div>
        <!-- <div class="form-item password" v-if="captchaImage">
          <img class="captcha" :src="captchaImage" @click.stop="getCaptcha()" />
          <input type="text" v-model="account.captcha" autocomplete="off" placeholder="请填写验证码" />
        </div> -->
        <button class="submit-btn" type="submit">登录</button>
        <button class="register-btn" type="button" @click="register">
          用户注册
        </button>
      </form>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="用户注册" center>
        <el-form :model="form" :label-position="right" ref="registers" @submit.prevent :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth"  prop="username" >
            <el-input v-model="form.username" autocomplete="off" placeholder="请填写用户名2-10个字符" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password" >
            <el-input v-model="form.password" type="password" autocomplete="off" placeholder="请填写密码"/>
          </el-form-item>
          <el-form-item label="密码确认" :label-width="formLabelWidth" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              autocomplete="off"
              placeholder="请确认密码"
            />
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email" >
            <el-input v-model="form.email"  autocomplete="off" placeholder="请填写邮箱:xx@163.com"/>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address" >
            <el-input v-model="form.address"  autocomplete="off" placeholder="请填写地址"/>
          </el-form-item>
          <!-- <template #footer> -->
          <span class="spann">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="registerBtn">
              确认
            </el-button>
          </span>
        <!-- </template> -->
        </el-form>
    </el-dialog>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'lin/plugin/axios'
import UserModel from '@/lin/model/user'
import Utils from '@/lin/util/util'
import Config from '@/config'

export default {
  setup() {
    let tag = ''
    const wait = 1000 // 2000ms之内不能重复发起请求
    const loading = ref(false)
    const captchaImage = ref('')
    const store = useStore()
    const router = useRouter()
    const throttleLogin = ref(null)
    const dialogFormVisible = ref(false)
    const formLabelWidth = '100px'
    const registers = ref(null)
    const form = reactive({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      address:'',
      // date1: '',
      // date2: '',
      // delivery: false,
      // type: [],
      // resource: '',
      // desc: '',
    })

  const { rules } = getRules()
    

    const account = reactive({
      username: '',
      password: '',
      captcha: '',
    })

    const registerBtn = async formName =>{
      registers.value.validate(async valid => {
        if (valid) {
          loading.value = true
          await UserModel.register(form)
          loading.value = false
          ElMessage({
              message: '注册成功',
              type: 'success',
            })
            dialogFormVisible.value = false
        }else{
          console.error('error submit!!')
          ElMessage.error('请将信息填写完整')
        }
      })

    }

    /**
     * 根据账号密码登录，拿到 token 并储存
     */
    const login = async () => {
      const { username, password, captcha } = account
      try {
        loading.value = true
        await UserModel.getToken(username, password, captcha, tag)
        await getInformation()
        loading.value = false
        router.push(Config.defaultRoute)
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
      } catch (e) {
        // getCaptcha()
        loading.value = false
      }
    }
    const register = async () => {
      dialogFormVisible.value = true
    }

    const getCaptcha = async () => {
      axios({
        method: 'POST',
        url: 'cms/user/captcha',
      }).then(result => {
        ;({ tag } = result)
        captchaImage.value = result.image
      })
    }

    /**
     * 获取并更新当前管理员信息
     */
    const getInformation = async () => {
      try {
        // 尝试获取当前用户信息
        const user = await UserModel.getPermissions()
        store.dispatch('setUserAndState', user)
        store.commit('SET_USER_PERMISSIONS', user.permissions)
      } catch (e) {
        console.error(e)
      }
    }

    /**
     * 节流登录
     */
    onMounted(() => {
      // getCaptcha()
      throttleLogin.value = Utils.throttle(login, wait)
    })

    return {
      formLabelWidth,
      account,
      loading,
      form,
      rules,
      registers,
      getCaptcha,
      register,
      registerBtn,
      captchaImage,
      dialogFormVisible,
      throttleLogin,
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
    if(value.length<2){
      callback(new Error('请输入2-10个字符'))
    }
    callback()
  }
  const rules = {
    username: [{ validator: checkInfo, trigger: 'blur', required: true }],
    password: [{ validator: checkInfo, trigger: 'blur', required: true }],
    confirmPassword: [{ validator: checkInfo, trigger: 'blur', required: true }],
  }
  return { rules }
}
</script>

<style lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}
.spann{
  margin-left: 40%;
}
.login {
  width: 100%;
  height: 100%;
  background: #1b2c5f url('../../assets/image/login/login-ba.png') no-repeat center center;
  background-size: cover;

  .team-name {
    position: fixed;
    left: 40px;
    top: 50%;
    width: 50px;
    transform: translateY(-50%);
  }

  .form-box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 545px;

    .title {
      height: 37px;
      font-size: 30px;
      line-height: 37px;
      margin-bottom: 15%;

      h1 {
        padding-left: 74px;
        box-sizing: border-box;
        text-align: left;
        color: #8c98ae;
      }
    }

    .login-form {
      width: 100%;

      .form-item {
        position: relative;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding-bottom: 13px;
        margin-bottom: 34px;

        input {
          width: 100%;
          height: 100%;
          background: transparent;
          color: #c4c9d2;
          font-size: 14px;
          padding-left: 74px;
          box-sizing: border-box;
        }

        .captcha {
          position: absolute;
          width: 80px;
          right: 30px;
          top: -22px;
          cursor: pointer;
        }
      }

      .form-item.nickname {
        background: url('../../assets/image/login/nickname.png') no-repeat;
        background-size: 100% auto;
        background-position: left bottom;
      }

      .form-item.password {
        background: url('../../assets/image/login/password.png') no-repeat;
        background-size: 100% auto;
        background-position: left bottom;
      }

      .register-btn, .submit-btn{
        width: 100%;
        height: 70px;
        color: #c4c9d2;
        font-size: 16px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 10px;
        padding-left: 74px;
        background: url('../../assets/image/login/login-btn.png') no-repeat;
        background-size: 90% auto;
        background-position: center bottom;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
