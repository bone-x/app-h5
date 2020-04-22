<template>
    <div class="box">
        <div class="layui-timeline-item" v-for='(item,index) in goodItemDetail' :key='index'
            @click='$emit("jump",item.id)'>
            <div class="relative"></div>
            <i class="layui-icon layui-timeline-axis circle">{{index>10?index:'0'+(index+1)}}</i>
            <div class="layui-timeline-content layui-text">
                <div class="goodItem">
                    <div class="goodImg">
                        <img :src="item.thumbPath" alt="">
                    </div>
                    <div class="goodName">
                        <div class="tt">{{item.name}}</div>
                        <div class="labelList">
                            <span>{{item.pattern}}</span>
                        </div>
                        <div class="money">
                            <span class="free">
                                <span v-if='clientType == "ios"'>{{item.presentPrice | changeFormate}}<span
                                        class="xuebi" v-if='item.presentPrice != 0'>学币</span></span>
                                <span v-else><span
                                        v-if='item.presentPrice != 0'>¥</span>{{item.presentPrice | changeFormate}}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            goodItemDetail: {
                type: Array,
                default: {}
            }
        },
        filters: {
            changeFormate(val) {
                if (!val) {
                    return '免费'
                } else {
                    return val.toFixed(1)
                }
            }
        },
        created() {
            this.clientType = this.$type
        },
        data() {
            return {
                clientType: ''
            }
        },
        name: 'Item',
        methods: {
        }
    }
</script>
<style lang="less" scoped>
    .box {
        padding: 0 29px 0 36px;

        .goodItem {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            padding: 10px 0 44px 36px;
            border-bottom: 1px solid #EDEDED;

            .goodImg {
                width: 306px;
                height: 172px;
                margin-right: 24px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 6px;
                }
            }

            .goodName {
                flex: 1;

                .tt {
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 40px;
                    color: #3A3C42;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                }

                .labelList {
                    margin-top: 18px;

                    span {
                        padding: 3px 10px;
                        background-color: #F0FAF8;
                        color: #00AB84;
                        font-size: 22px;
                        font-weight: 400;
                        line-height: 36px;
                    }
                }

                .money {
                    margin-top: 20px;

                    .free {
                        font-size: 30px;
                        font-weight: bold;
                        line-height: 28px;
                        color: #F6612F;
                        margin-right: 12px;

                        .xuebi {
                            font-size: 24px;
                            font-weight: 400;
                            margin-left: 6px;
                        }
                    }

                    .discount {
                        font-size: 24px;
                        color: #A3ABB8;
                    }
                }
            }
        }

        .goodItem:nth-last-child(1) {
            border-bottom: none;
        }

        .layui-timeline {
            padding-left: 5%;
            // padding-top:20px
        }

        .layui-timeline-item {
            position: relative;
            padding-bottom: 20px;
            margin-top: -12px;
        }

        li {
            list-style: none;
        }

        .layui-timeline-item:first-child::before {
            display: block;
        }

        .layui-timeline-item:last-child::before {
            content: '';
            position: absolute;
            left: px;
            top: 0;
            z-index: 0;
            width: 0;

        }

        .layui-timeline-item::before {
            content: '';
            position: absolute;
            /* left: 5px; */
            left: 18px;
            top: 0;
            z-index: 0;
            width: 2px;
            height: 100%;
        }

        .layui-timeline-item::before,
        hr {
            background-color: #EDEDED;
        }

        .layui-timeline-axis {
            position: absolute;
            left: 0px;
            top: 0;
            z-index: 10;
            width: 20px;
            height: 20px;
            line-height: 20px;
            background-color: #fff;
            color: #5FB878;
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
        }

        .layui-icon {
            font-family: layui-icon !important;
            font-size: 16px;
            font-style: normal;
        }

        .layui-timeline-content {
            padding-left: 25px;
        }

        .layui-text {
            line-height: 22px;
            font-size: 14px;
            color: #666;
            top: -10px;
        }

        .layui-timeline-title {
            position: relative;
            margin-bottom: 10px;
        }

        .circle {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #0ECB92;
            color: #fff;
            line-height: 36px;
            font-size: 20px;
        }

        .etime-first {
            top: 45%;
            left: -100px;
            position: absolute;
        }

        .time-first {
            position: absolute;
            left: -60px;
        }
    }
</style>