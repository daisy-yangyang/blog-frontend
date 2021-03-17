<template>
  <div>
    <section class="page-header" :style="'background-image: linear-gradient(120deg, '+backgroundColorLeft+', '+backgroundColorRight+');color: '+fontColor+';'">
        <div style="position:absolute; top:20px; right:20px; z-index:2;">
            <el-tooltip effect="dark" :content="fullButton.full?'退出':'全屏'" placement="bottom-end">
                <el-button @click="full" :icon="fullButton.full?'el-icon-close':'el-icon-rank'" circle></el-button>
            </el-tooltip>
        </div>
        <div v-for="(item,index) in randomIcon" :key="'ri'+index" :style="'position:absolute; top:'+item.top+'px; left:'+item.left+'px; z-index:1;'">
            <font :style="'font-size: '+item.size+'px;color:#fff;'">
                <b>♪</b>
            </font>
        </div>
        <h1 class="project-name">{{blogTitle}}</h1>
        <h2 class="project-tagline">{{blogDescribe}}</h2>
        <a :href="'https://github.com/'+githubUsername" class="btn" target="_blank">GitHub主页</a>
        <a href="https://github.com/GitHub-Laziji/vblog" class="btn" target="_blank" v-if="!mini">博客源码</a>
    </section>

            
    <div style="position:relative;  z-index:2;margin: auto;margin-top:-30px;width:64rem;">
        <el-card shadow="never" :body-style="{ padding: '0px' }">
            <el-row>
                <el-col :span="10">
                    <el-menu @select="selectTopbar" :default-active="topbar.active" mode="horizontal" menu-trigger="click">
                        <el-submenu index="#more">
                            <template slot="title">了解博主</template>
                            <el-menu-item index="#githubHome">github主页</el-menu-item>
                            <el-menu-item index="#blog">其他博客</el-menu-item>
                        </el-submenu>
                        <el-submenu index="#webSites" v-if="webSites.length>0">
                            <template slot="title">其他网站</template>
                            <el-menu-item :index="'#webSites-'+index" v-for="(item,index) in webSites" :key="'#webSites'+index">{{item.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col :span="8" style="text-align: center;padding: 12px 0px 0px 10px">
                    <el-row>
                        <el-col :span="4">
                            <el-popover placement="top" trigger="hover">
                                <div style="text-align: center">
                                    <el-progress color="#67C23A" type="circle" :percentage="music.volume"></el-progress>
                                    <br>
                                    <el-button @click="changeVolume(-10)" icon="el-icon-minus" circle></el-button>
                                    <el-button @click="changeVolume(10)" icon="el-icon-plus" circle></el-button>
                                </div>

                                <el-button @click="play" id="play" slot="reference" :icon="music.isPlay?'el-icon-refresh':'el-icon-caret-right'" circle></el-button>
                            </el-popover>
                        </el-col>
                        <el-col :span="14" style="padding-left: 20px">
                            <el-slider @change="changeTime" :format-tooltip="formatTime" :max="music.maxTime" v-model="music.currentTime" style="width: 100%;"></el-slider>
                        </el-col>
                        <el-col :span="6" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
                            {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
                        </el-col>
                    </el-row>

                    <audio ref="music" loop autoplay v-if="audioAutoPlay">
                        <source :src="audioUrl" type="audio/mpeg">
                    </audio>
                    <audio ref="music" loop v-else>
                        <source :src="audioUrl" type="audio/mpeg">
                    </audio>
                </el-col>
                <el-col :span="4" style="text-align: right;">
                    <div style="font-size: 20px;color:#606266;margin-top: 5px">
                        <b>{{githubUsername}}</b>
                    </div>
                    <div style="color:#606266;">
                        <i class="el-icon-location"></i>&nbsp;{{location?location:'未填写地址'}}
                        <br>
                    </div>
                </el-col>
                <el-col :span="2" style="text-align: center;">
                    <img v-popover:bigAvatar :src="avatarUrl" style="margin-top: 4px;margin-right: 10px;width:52px; height:52px; border-radius:5px; border: 1px solid #EBEEF5"
                    />
                    <el-popover ref="bigAvatar" placement="top-start" :title="githubUsername" width="200" trigger="hover">
                        <i class="el-icon-star-on"></i>&emsp;{{name}}
                        <br>
                        <i class="el-icon-location"></i>&emsp;{{location}}
                        <br>
                        <img :src="avatarUrl" style="width: 200px;height: 200px;">
                    </el-popover>
                </el-col>
            </el-row>

        </el-card>
    </div>
  </div>
</template>

<script>
export default {
    name:'headerPage',
    data() {
        return {
            githubUsername: "GitHub-Laziji",
            blogTitle: "Laziji",
            blogDescribe: "欢迎来到辣子鸡的个人博客。",
            htmlTitle: "辣子鸡的博客",
            fontColor: "#ffffff",
            useBackgroundImage: false,
            backgroundColorLeft: "#2690F9",
            backgroundColorRight: "#FC2D2D",
            audioUrl: "http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3",
            mini: false,
            webSites:[
                {"name":"v2ex" , "url":"https://www.v2ex.com/member/laziji"}
            ],
            audioAutoPlay:false,
            avatarUrl: 'https://avatars.githubusercontent.com/u/30425217?v=4',
            name: '辣子鸡',
            location: 'fuzhou',
            blog: null,
            music: {
                isPlay: false,
                currentTime: 0,
                maxTime: 0,
                volume: 100
            },
            fullButton: {
                full: false
            },
            topbar: {
                active: "",
            },
            randomIcon: []
        }
    },
    mounted() {
            this.$nextTick(() => {
                setInterval(this.listenMusic, 1000)
            })

            function randomInt (s, e) {
                 let d = e - s
                if (d < 0) {
                    return s
                }
                let r = Math.random() * d + s
                r = parseInt(r, 10)
                return r
            }

            let width = window.innerWidth
            for (let i = 0; i < 12; i++) {
                let temp = {}
                let left = randomInt(10, width - 310)
                if(left>width/2-150){
                    left+=300
                }
                temp["left"] = left
                temp["top"] = randomInt(20, 300)
                temp["size"] = randomInt(20, 40)
                this.randomIcon.push(temp)
            }
        },
        created() {
            
        },
        methods: {
            selectTopbar(index) {
                //取消菜单选中状态
                this.topbar.active = this.topbar.active == "" ? " " : ""
                switch (index) {
                    case "#githubHome":
                        window.open('https://github.com/' + this.githubUsername)
                        break
                    case "#blog":
                        if (this.blog) {
                            window.open((this.blog.match(/https?:\/\//i)?'':'https://') + this.blog)
                        } else {
                            this.$message({
                                message: '博主没有其他博客',
                                type: 'info'
                            })
                        }
                        break
                    default:
                        if(/#webSites-\d+/.test(index)){
                            let i = parseInt(index.split('-')[1])
                            let url = this.webSites[i].url
                            window.open((url.match(/https?:\/\//i)?'':'https://') + url)
                        }
                        break
                }
            },
            moveIcon(index) {
                let width = window.innerWidth
                this.randomIcon[index]["top"] = randomInt(20, 300)
                let left = randomInt(10, width - 310)
                if(left>width/2-150){
                    left+=300
                }
                this.randomIcon[index]["left"] = left
            },
            full() {
                if (!this.fullButton.full) {
                    this.fullScreen()
                    this.fullButton.full = true
                } else {
                    fullExit()
                    this.fullButton.full = false
                }
            },
            listenMusic() {
                if (!this.$refs.music) {
                    return
                }
                if (this.$refs.music.readyState) {
                    this.music.maxTime = this.$refs.music.duration
                }
                this.music.isPlay = !this.$refs.music.paused
                this.music.currentTime = this.$refs.music.currentTime
            },
            play() {
                if (this.$refs.music.paused) {
                    this.$refs.music.play()
                } else {
                    this.$refs.music.pause()
                }
                this.music.isPlay = !this.$refs.music.paused
                this.$nextTick(() => {
                    document.getElementById('play').blur()
                })

            },
            changeTime(time) {
                this.$refs.music.currentTime = time
            },
            changeVolume(v) {
                this.music.volume += v
                if (this.music.volume > 100) {
                    this.music.volume = 100
                }
                if (this.music.volume < 0) {
                    this.music.volume = 0
                }
                this.$refs.music.volume = this.music.volume / 100
            },
             randomInt(s, e) {
                let d = e - s
                if (d < 0) {
                    return s
                }
                let r = Math.random() * d + s
                r = parseInt(r, 10)
                return r
            },
            fullScreen() {
                var element = document.documentElement
                if (window.ActiveXObject) {
                    var WsShell = new ActiveXObject('WScript.Shell')
                    WsShell.SendKeys('{F11}')
                } else if (element.requestFullScreen) {
                    element.requestFullScreen()
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                }
            },
            fullExit() {
                var element = document.documentElement
                if (window.ActiveXObject) {
                    var WsShell = new ActiveXObject('WScript.Shell')
                    WsShell.SendKeys('{F11}')
                } else if (element.requestFullScreen) {
                    document.exitFullscreen()
                } else if (element.msRequestFullscreen) {
                    document.msExitFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (element.mozRequestFullScreen) {
                    document.mozCancelFullScreen()
                }
            },
            formatTime(time) {
                let it = parseInt(time)
                let m = parseInt(it / 60)
                let s = parseInt(it % 60)

                return (m < 10 ? "0" : "") + parseInt(it / 60) + ":" + (s < 10 ? "0" : "") + parseInt(it % 60)
            },
        }
}
</script>

<style>

</style>