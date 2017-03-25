<template>
    <div class="cell" :class="{ active : this.active}" :style="this.cellStyles" @click="emitClicked"></div>
</template>

<script>
    export default {
        props : ['x' , 'y' , 'status', 'length' , 'index'],

        data : function(){
            return {
                cellStyles : {
                  width : this.length + 'px',
                  height : this.length + 'px'
                }
            };
        },
        methods  : {
            emitClicked : function(){
                this.$emit('cellclick', this.index );
            }
        },
        computed : {
            active : function(){
                return this.status == 1;
            }
        }

    }

</script>

<style>
  .cell{

      float : left;
      background-color: #34495e;
  }

  .cell:hover , .cell.active:hover{
      background-color : white;
  }

  .cell.active{
      background-color : #4fc08d;
  }
</style>
