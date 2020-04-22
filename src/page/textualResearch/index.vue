<template>
    <div class="texttualResearch">
        <section class="fixedTop" ref='fixedTop'>
            <div class="header">
                <div class="input" @click='goSearch()'>
                    <img :src="searchImg" alt="搜索" class="search">
                    <input type="text" v-model="keyWord" placeholder="搜索课程"  onfocus="this.blur();" readonly />
                </div>
                <img :src="zixunImg" alt="咨询" class="zixun" @click='goAsk()'>
            </div>
            <!-- 一类 -->
            <div class="classifica">
                <div class="acount" :class="isActive ==(curTab==index) ? 'account' : 'book'"
                    v-for='(item,index) in FaterList' :key='index' @click="changeTab(index,item.categoryId)">
                    <span class="underline" v-show="curTab==index"></span>
                    {{item.categoryName}}
                </div>
            </div>

            <!-- //二级子类 -->
            <div ref="categories">
                <div class='tab'>
                    <div class="categories" v-if='(ChildList.length>0&&!selectBtn)'>
                        <button v-for="(item,index) in ChildList" :class='{selected:curTabChild==item.categoryId}'
                            @click='changeTabChild(item.categoryId)' :key="index">{{item.categoryName}}
                        </button>
                        <!-- <span v-if='active'>
                                    <button v-for="(item,index) in ChildList.slice(3)" 
                                    :class='{selected:curTabChild==item.categoryId}'
                                    @click='changeTabChild(item.categoryId)'
                                    :key="index">{{item.categoryName}}</button>
                                </span> -->
                    </div>
                    <ul class="box" v-if='ChildList.length>0&&selectBtn'>
                        <li v-for="(item,index) in ChildList" :key="index"><button
                                :class='{selected:curTabChild==item.categoryId}'
                                @click='changeTabChild(item.categoryId)'>{{item.categoryName}}</button></li>
                    </ul>
                    <div class="btn_img" v-show='curTab==0'><img :src="Img" class="img" @click="menuDown" ref="Img" />
                    </div>
                </div>
            </div>

        </section>
        <div class='shadow' v-show='active' @click='menuDown()'></div>
        <section id="componentBox" :class='ChildList.length>0&&selectBtn ? "showTop" : "unShowTop"' ref='componentBox'>
            <div v-if='curTab'>
                <Practice :curTabChild='faterId' :ChildList='ChildList' />
            </div>
            <div v-else>
                <Account :curTabChild='curTabChild' />
            </div>
        </section>
    </div>
</template>

<script>
    import { JsBridge, isNativeApp } from '@/utils/bridge';
    import Account from './account'
    import Practice from '../subjectTab/practice'
    export default {
        components: { Account, Practice },
        data() {
            return {
                keyWord: '',
                isActive: false,
                active: false,
                curTab: 0,
                curTabChild: 0,
                show: false,
                FaterList: [],//1级类目,
                ChildList: [],//2级类目
                Img: require('@/assets/images/icon/分类-上@2x.png'),
                searchImg: require('@/assets/images/icon/搜索@2x.png'),
                zixunImg: require('@/assets/images/icon/zixun.png'),
                faterId: 7,
                selectBtn: true,//显示横向滑动还是下拉展开
            };
        },
        mounted() {
            this.getData()
        },
        methods: {
            goSearch() {//跳转到app搜索
                JsBridge(null, { path: "jump/search/course" })
            },
            goAsk() {//跳转到app咨询
                JsBridge(null, { path: 'jump/consult' })
            },
            getData() {
                let obj = {}
                this.$api.getTestColumn().then(res => {//获取类目接口
                    obj = res
                    if (res.code == 200) {
                        this.ChildList = res.data[0].childrenList;
                        this.curTabChild = this.ChildList[0].categoryId;
                        //  console.log(this.curTabChild)
                        this.FaterList = res.data;
                        //   setTimeout(() => {
                        // }, 300);
                    }
                    if (obj.code == 200) {
                        this.countHeight();
                    }
                })
            },
            countHeight() {//计算tab离顶部的高度
                this.$nextTick(() => {
                    // this.$refs.componentBox.style.paddingTop = this.$refs.fixedTop.offsetHeight + 'px';
                    // let a = document.getElementById("fixedTop")[0].offsetHeight
                    // document.getElementById('componentBox')[0].style.paddingTop = a + 'px'
                    // this.$forceUpdate()
                })
            },

            menuDown() {

                this.active = !this.active;
                this.selectBtn = !this.selectBtn;
                if (this.active == true) {
                    this.$refs.Img.style.transform = 'rotate(0deg)';
                } else {
                    this.$refs.Img.style.transform = 'rotate(180deg)'
                }
                this.countHeight()
            },
            changeTabChild(index) {
                this.curTabChild = index;
                // this.getGoodsList();
            },
            changeTab(index, v) {
                this.faterId = v;
                this.curTab = index;
                this.active = false;
                this.ChildList = this.FaterList.filter((item, index) => item.categoryId == v)[0].childrenList;
                this.countHeight();
            }
        }
    };
</script>

<style lang="less" scoped>
    .texttualResearch {

        .shadow {
            background: rgba(0, 0, 0, 1);
            opacity: 0.5;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
        }

        .showTop {
            padding-top: 326px;
        }

        .unShowTop {
            padding-top: 188px;
        }

        .fixedTop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background: #fff;
        }

        .box {
            //-----------------
            padding: 0 41px 0px 33px;
            // padding: 33px 41px 0px 33px; //加阴影时修改   
            margin-top: 33px;
            //-----------
            background: #fff;

            white-space: nowrap;
            overflow-x: auto;
            width: calc(100% - 112px);

            li {
                display: inline-block;
            }

            button {
                background: #F5F6F7;
                border-radius: 28px;
                padding: 0 21px;
                height: 54px;
                display: inline-block;
                color: #6C7179;
                font-family: Microsoft YaHei;
                font-weight: 400;
                margin-right: 19px;
                margin-bottom: 30px;
                font-size: 24px;

                &.selected {
                    color: #00AB84;
                    background: rgba(240, 250, 248, 1);
                }
            }
        }

        .tab {
            position: relative;
            background: rgba(255, 255, 255, 1);

            .btn_img {
                position: absolute;
                right: 0;
                top: 0;
                z-index: 99;
                width: 112px;
                background: #fff;
                text-align: center;

                .img {
                    // margin-left: 28px;

                    width: 56px;
                    height: 56px;
                    transform: rotate(180deg);
                }
            }

        }

        .categories {
            width: calc(100% - 112px);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            word-wrap: break-word;
            //----
            padding: 0 41px 0px 33px;
            // padding: 33px 41px 0px 33px; //加阴影时修改
            margin-top: 33px;
            //------
            background: #fff;

            button {

                font-size: 24px;
                background: #F5F6F7;
                border-radius: 27px;
                padding: 0 21px;
                height: 54px;
                display: inline-block;
                color: #6C7179;
                font-family: Microsoft YaHei;
                font-weight: 400;
                margin-right: 19px;
                margin-bottom: 30px;

                &.selected {
                    color: #00AB84;
                    background: rgba(240, 250, 248, 1);
                }
            }
        }

        .iszindex {
            z-index: 2;
        }

        .header {
            display: flex;
            flex-direction: row;
            padding: 8px 42px 24px 36px;
            background: #ffffff;

            .input {
                margin-right: 34px;
                width: 598px;
                height: 75px;
                padding: 21px 0 0 30px;
                background: rgba(245, 246, 247, 1);
                opacity: 0.9;
                border-radius: 38px;

                .search {
                    width: 33px;
                    height: 33px;
                }

                input {
                    width: 400px;
                    height: 30px;
                    background: #F5F6F7;

                    input::-webkit-input-placeholder {
                        /* WebKit browsers 适配谷歌 */
                        color: #A3ABB8;
                    }
                }
            }

            .zixun {
                margin-top: 18px;
                width: 40px;
                height: 40px;
            }
        }

        .classifica {
            box-shadow: 0px 20px 30px rgba(58, 60, 66, 0.03);
            display: flex;
            flex-direction: row;
            width: 100%;
            padding: 0 33px;

            div {
                flex: 1;
                height: 100px;
                line-height: 100px;
                text-align: center;
            }

            .book {
                position: relative;
                font-size: 35px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: rgba(58, 60, 66, 1);

                .underline {
                    position: absolute;
                    bottom: 15px;
                    left: 143px;
                    display: inline-block;
                    width: 38px;
                    height: 6px;
                    background: rgba(0, 171, 132, 1);
                    border-radius: 3px;
                }
            }

            .account {
                font-size: 31px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: rgba(108, 113, 121, 1);
            }
        }
    }
</style>