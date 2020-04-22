<template>
    <div class="newGiftPack">
        <header>
            <ul>
                <li><img src="../../assets/images/newGiftPack/bgTop.png" alt=""></li>
                <li class='notice'><img src="../../assets/images/newGiftPack/beforeWord.png" alt=""></li>
                <li class='tab'>
                    <ul>
                        <li class="active">
                            <div class='title'>初级会计职称大礼包</div>
                            <div class='price'>价值1099元</div>
                        </li>
                        <li>
                            <div class='title'>中级会计职称大礼包</div>
                            <div class='price'>价值4099元</div>
                        </li>
                        <li>
                            <div class='title'>财务师大礼包</div>
                            <div class='price'>价值3099元</div>
                        </li>
                        <li>
                            <div class='title'>CPA大礼包</div>
                            <div class='price'>价值2099元</div>
                        </li>
                         <li>
                            <div class='title'>CPA大礼包</div>
                            <div class='price'>价值2099元</div>
                        </li>
                         <li>
                            <div class='title'>CPA大礼包</div>
                            <div class='price'>价值2099元</div>
                        </li>
                    </ul>
                </li>
                <li class="pack">
                    <img src="../../assets/images/newGiftPack/pack.png" alt="">
                </li>
                <li class="addPack">
                    <img src="../../assets/images/newGiftPack/addPack.png" alt="">
                </li>
                <li class="rule">
                    <img src="../../assets/images/newGiftPack/rule.png" alt="">
                </li>
                <li class="bottom">
                    <img src="../../assets/images/newGiftPack/bottom.png" alt="">
                </li>
            </ul>
        </header>
    </div>
</template>
<script>    
export default{
    name:'newGiftPack'
}
</script>
<style lang="less" scope>
.newGiftPack{
    img{
        width:100%;
    }
    width:100%;
    background:url('../../assets/images/newGiftPack/bg.png') no-repeat;
    background-size:100% 100%;
    .notice{
        width:90%;
        margin:0 auto;
        margin-top:-200px;
    }
    .pack{
        width:90%;
        margin:0 auto;
    }
    .addPack{
        background:pink;
        margin-top:30px;
    }
    .rule{
        background:#FFF;
        padding:40px 5%;
        // padding-top:40px;
        // paddingL
        margin:0 auto;
    }
    .bottom{
         width:100%;
        background:#fff;
        img{
            width:100%;
        }
    }
    .tab{
        width:90%;
        margin:0 auto;
        ul{
              margin:15px 0;
              white-space: nowrap;
              overflow-x: auto;
            li{
               width:240px;
               display: inline-block;
                text-align:center;
                padding:5px 3px;
                line-height:30px;
                color:#333;
                background:linear-gradient(81deg,rgba(247,198,68,1),rgba(248,237,108,1));
                border-radius:4px;

                &.active{
                    background:rgba(255,245,228,1)
                }
                .price{
                    padding-top:8px;
                    color:#AA361B;
                     font-size:24px;
                     font-weight:bold;
                }
                .title{
                    font-size:16px; 
                    font-weight:bold;
                }
            }
        }
    }
}
</style>