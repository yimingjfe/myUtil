<script>
import PagePanel from './panel/PagePanel.vue'
import SwitchPanel from './panel/SwitchPanel.vue'

export default{
  functional: true,
  props: ['type'],
  render(h, context){
    function getComponent(){
      const type = context.props.type;
      switch(type){
        case 'page':
          return PagePanel;
        case 'switch':
          return SwitchPanel;
      }
    }

    return h(
      getComponent(),
      context.data,
      context.children
    )
  } 
}
</script>