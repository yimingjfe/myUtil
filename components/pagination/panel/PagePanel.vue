<template>
  <div class="pagination">
    <span class="count-wrap">共<span class="count">{{pageNums}}</span>页</span>
    <span class="icon page-btn" @click="pre" :class="{'z-disabled': curPageNum === 1}"><i class="iconfont icon-shangyiye"></i></span>
    <span class="page-itm page-btn" @click="toPage(1)" :class="{'z-active': 1 === curPageNum}" :key="1">{{1}}</span>
    <span v-if="isShowPreMore">...</span>
    <span v-for="item in pagers" class="page-itm page-btn" @click="toPage(item)" :class="{'z-active': item === curPageNum}" :key="item">{{item}}</span>
    <span v-if="isShowNextMore">...</span>
    <span 
        class="page-itm page-btn" 
        v-if="pageNums > 1" 
        @click="toPage(pageNums)" 
        :class="{'z-active': pageNums === curPageNum}" 
        :key="pageNums">{{pageNums}}
    </span>
    <span class="icon page-btn" @click="next" :class="{'z-disabled': curPageNum > pageNums - 1}"><i class="iconfont icon-xiayiye"></i></span>
    <span class="page-btn">共{{pageNums}}页，</span>
    <span class="to-wrap">到<input class="to" v-model.lazy.trim.number="toPageNum">页<span class="page-btn confirm" @click="toPage(toPageNum)">确定</span></span>
  </div>	
</template>

<script>
import Paginationer from './Paginationer.vue'

export default{
    mixins: [Paginationer],
    data(){
        return{
            toPageNum: ''
        }
    }
}    
</script>

<style lang="scss">

</style>
