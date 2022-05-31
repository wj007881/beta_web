<template>
  <!-- <div class="page-404">
    <n-result status="404" description="抱歉，您访问的页面不存在。">
      <template #icon>
        <img src="@/assets/images/404.png" width="500" />
      </template>
      <template #footer>
        <n-button strong secondary type="primary" @click="replace('/')">返回首页</n-button>
      </template>
    </n-result>
  </div> -->
  <div>
    <div class="countTopBar" id="countTopBar">
      <div class="countItem">
        <div class="itemImg">展示图片</div>
        <div class="descButton">
          <p>展示文字</p>
          <button>操作按钮</button>
          <button>操作按钮</button>
        </div>
      </div>
      <div class="countForm"></div>
    </div>
    <div class = "FormDesc">
      <div class = "DescArea">
        <p class = "DescTitle">Bug评级说明</p>
        <div class = "DeasText">
          <p><span class = "N1 VSquare">致命</span>程序无法正常运行或程序无法跑通-无法正常启动、异常退出、crash、资源不足、死循环、崩溃或严重资源不足</p>
          <p><span class = "N2 VSquare">严重</span>核心功能无法完成、功能报错、数据错误等，但不会影响程序运行</p>
          <p><span class = "N3 VSquare">缺陷</span>一般功能性Bug，产品中的不符合产品需求或用户使用的缺陷</p>
          <p><span class = "N4 VSquare">瑕疵</span>操作不方便，布局不合理等一类的易用性相关的缺陷</p>
          <p><span class = "N5 VSquare">建议</span>对产品的改进优化型建议</p>
        </div>
      </div>
    </div>
    <div class = "reportStatement">
      <div class = "statement">
        <div>
          <p><span>报告统计</span></p>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const { replace } = useRouter()
</script>

<style lang="scss" scoped>

.countTopBar{
  height: 200px;
  width: 96%;
  background-color: white;
  margin: 2%;
};
.countItem{
  display:inline-block;
  float:left;
  height:120px;
  width: 40%;
  border: 1px solid red;
  margin: 3%;
  max-width: 480px;
};
.itemImg{
  display:inline-block;
  height:80px;
  width:80px;
  border:1px solid black;
  border-radius:5%;
   margin: 3%;
}
.descButton{
  display: inline-block;
}
.countForm{
  display:inline-block;
  height:120px;
  width: 48%;
  border: 1px solid red;
  margin: 3%;
}
// .page-404 {
//   height: 100%;
//   min-height: calc(100vh - 60px);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
.FormDesc{
  height: 220px;
  width: 96%;
  margin: 3%;
  // padding-left:100px;
  
}
.FormDesc{
  background-color: white;
}
.DescArea{
  background-color:#FAFAFA;
  width:80%;
  height:100%;
  margin:auto;
  border:1px solid #ebebeb;
}
.DescTitle{
    text-align: center;
    font-size: 16px;
    line-height: 44px;
    margin-top: 7px;
}
.N1:before{
  background-color:#eb5a3c;
}
.N2:before{
  background-color:#FFC402;
}
.N3:before{
  background-color:#7264BC;
}
.N4:before{
  background-color:#22A4E5;
}
.N5:before{
  background-color:#00C185;
}
.VSquare:before{
  content: '';
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 10px;
  border-radius: 2px;
  position: relative;
  top: 1px;
}
.N1,.N2,.N3,.N4,.N5{
  padding-left: 120px;
  line-height:26px;
  margin-right: 48px;
}

</style>
