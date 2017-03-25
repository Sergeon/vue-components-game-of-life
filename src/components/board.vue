<template>
    <div class="board" :id="id" :style="styles">
        <cell v-for="(element,index) in state" :key="index" :x="element.x" :y="element.y" :status="element.state" :index="index" :length="cellLength" @cellclick="mutate(index)"  />

    </div>
</template>

<script>

    import {hub} from '../util/events-hub'
    import gol from '../lib/game-of-life';

    import cell from './cell.vue';

    export default {
        props : ['state' , "id" , "width"],
        computed : {
          boardWidth : function(){
            return Number(this.width) + 1;
          },
          styles : function(){
            return {
              'max-width' : this.boardWidth + 'px',
              height : this.boardWidth + 'px',
            }
          }
        },
        data : function(){

          return{
            cellLength : this.width / Math.sqrt( this.state.length )
          };
        },
        methods : {

            mutate : function(index){
                this.state[index].state = ! this.state[index].state;
            },

            clear : function(){
                this.state.forEach( function(elem , index){
                    elem.state = 0;
                });
            },
            transite : function(){

                var newState = gol.getNewState( this.state );
                var self = this;
                newState.forEach( function(el , index ){
                    self.state[index].state = el.state;
                });

            }



        },
        created : function(){
            console.log('board created: ');
            hub.$on('clearevent' , this.clear );
            hub.$on('transiteevent' , this.transite );
        },

        components : {
            cell : cell
        }

    }
</script>

<style>

.board {

    margin : auto;
}

</style>
