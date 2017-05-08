<script>
	export default{
    props:{
        pageSize: [Number],
        total:[Number],         
        pageCount: Number,
    },    
    data(){
      return {
        curPageNum: 1,
        isShowPreMore : false,
        isShowNextMore: false
      }
    },

    computed:{
    	pageNums(){
    		if(this.pageCount) return this.pageCount;
    		return Math.ceil(this.total / this.pageSize);
    	},

      pagers(){
        const pagerCount = 7,
              curPageNum = Number(this.curPageNum),
              pageCount = Number(this.pageNums);
        let array = [];
        let isShowPreMore = false;
        let isShowNextMore = false;
        if(pagerCount < pageCount && curPageNum > pagerCount - 2){
          isShowPreMore = true;
        }
        if(pagerCount < pageCount && curPageNum < pageCount - 2){
          isShowNextMore = true;
        }
        if(isShowPreMore && isShowNextMore){
          const offset = Math.floor(pagerCount / 2) - 1;
          for(let i = curPageNum - offset; i <= curPageNum + offset; i++){
            array.push(i);
          }
        } else if(!isShowPreMore && isShowNextMore){
          for(let i = 2; i < pagerCount; i++){
            array.push(i);
          }            
        } else if(isShowPreMore && !isShowNextMore){
          for(let i = pageCount - 5; i < pageCount; i++){
            array.push(i);
          }  
        } else if(!isShowPreMore && !isShowNextMore){
          for(let i = 2; i < pageCount; i++){
            array.push(i);
          }
        }                
        
        this.isShowPreMore = isShowPreMore;
        this.isShowNextMore = isShowNextMore;
        return array;
      }
    },

    watch:{
      curPageNum(){
        this.$emit('current-change', this.curPageNum);
      }
    },
    
    methods:{
      pre(){
        if(Number(this.curPageNum) > 1) this.curPageNum--;
      },
      next(){
        if(!!this.pageNums){
          if(Number(this.curPageNum) < this.pageNums) this.curPageNum++;
        } else {
          this.curPageNum++
        }
        
      },
      toPage(num){
        if(Number(num) >= 1 && Number(num) <= this.pageNums){
          this.curPageNum = num;
        }
      }
    }				
	}
</script>

<style lang="scss">
    .pagination{
        display: table;
        margin: 0 auto;
        .iconfont{
            font-size:12px;
            color: #222;
        }
        .icon.z-disabled,.icon.z-disabled{
            .iconfont{
                color: #eee;
                cursor: default;
            } 
        }
        .page-btn{
          cursor:pointer;
          margin: 0 4px;
        }  
        .page-itm{
            display: inline-block;
            width: 20px;
            text-align: center;
            line-height: 20px;
            box-sizing: border-box;
        }
        .page-itm.z-active{
          background-color: #0099ff;
          color: #fff;
          border-radius: 50%;
        }  
        .to-wrap{
            .to{
                display: inline-block;
                width: 40px;
                margin: 0 5px;
                padding-left:5px;
                box-sizing:border-box;
                border:1px solid #dfdfdf;
            }
        }
        .confirm{
            padding: 0 4px;
            border:1px solid #dfdfdf;
        }            
    }	
</style>