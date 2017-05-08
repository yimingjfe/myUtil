<template>
	<div class="pagination">
		<span class="page-btn" v-if="total">共{{total}}条消息记录</span>
		<span class="icon page-btn" :class="{'z-disabled': isFirst}"@click="toFirst"><i class="iconfont icon-diyiye"></i></span>
		<span class="icon page-btn" :class="{'z-disabled': isFirst}"@click="pre"><i class="iconfont icon-shangyiye"></i></span>
		<span class="icon page-btn" :class="{'z-disabled': isLast}" @click="next"><i class="iconfont icon-xiayiye"></i></span>
		<span class="icon page-btn" :class="{'z-disabled': isLast}" @click="toLast"><i class="iconfont icon-zuihouyiye"></i></span>
	</div>
</template>
<script>
import Paginationer from './Paginationer.vue'

export default{
    mixins: [Paginationer],
    props: ['isFirst', 'isLast'],
    methods:{
        pre(){
            if(!this.isFirst) this.$emit('pre');
        },
        next(){
            if(!this.isLast) this.$emit('next');
        },
    	toFirst(){
            if(!this.isFirst){
                this.toPage(1);
                this.$emit('toFirst');
            }
    	},
    	toLast(){
            if(!this.isLast){
                this.toPage(this.pageNums);
                this.$emit('toLast');
            }
    	}
    }
}  	
</script>

<style lang="scss">
    .icon.z-disabled{
        .iconfont{
            color: #eee;
        }
    }
</style>