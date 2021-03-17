<template>
  <div>
      <el-card shadow="never">
            <el-menu :default-active="active" @select="onSelect">
                <el-menu-item v-for="item in constantRouterMap"
                    :key="item.id">
                    <i :class="item.icon"></i>
                    <g-link slot="title" :to="item.path">{{item.title}}</g-link>
                </el-menu-item>
            </el-menu>
        </el-card>

        <el-card shadow="never" style="margin-top: 20px;text-align: center">
            <div v-if="!token" style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
                <el-button type="text" @click="openTokenDialog">绑定</el-button>
            </div>
            <div v-if="token" style="font-size: 0.9rem;line-height: 1.5;color: #303133;">
                <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token已绑定&nbsp;&nbsp;
                <el-button type="text" @click="cancellation">注销</el-button>
            </div>
            <div style="margin-top: 10px;text-align: left">
                <el-alert title="Token获取" type="info" description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
                    :closable="false">
                </el-alert>
            </div>
        </el-card>
      <!-- <token-dialog ref="tokenDialog"></token-dialog> -->
  </div>
</template>

<script>
//import TokenDialog from './TokenDialog'
//import Layout from '../layouts/Default'

export default {
    name:'siderPage',
    data() {
        return {
            constantRouterMap:[
              {
                id:0,
                title: '最新动态',
                icon: 'el-icon-star-off',
                path:'new'
              },
              {
                id:1,
                title: '社交圈',
                icon: 'el-icon-mobile-phone',
                path:'social'
              },
              {
                id:2,
                title: '博客列表',
                icon: 'el-icon-edit-outline',
                path:'/'
              },
              {
                id:3,
                title: '开源项目',
                icon: 'el-icon-service',
                path:'project'
              },
              {
                id:4,
                title: '使用帮助',
                icon: 'el-icon-printer',
                path:'helper'
              },
              {
                id:5,
                title: 'README.md',
                icon: 'el-icon-document',
                path:'readme'
              }
            ],
            active: "2",
            parentUrl: "",
            menuList: [],
            token: '',
            githubUsername: 'GitHub-Laziji',
            mini:false
        }
    },
    components: {
        //TokenDialog
    },
    mounted() {
          let arr = this.$route.path.split("/")
          this.active = "/" + arr[1] + "/" + arr[2]
      },
      methods: {
          onSelect(index) {
              this.$router.push(index)
          },
          openTokenDialog() {
              this.$refs.tokenDialog.open(() => {
          
              })
          },
          cancellation() {
              this.$store.dispatch("Cancellation")
          }
    }
}
</script>

<style>

</style>