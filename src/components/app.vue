<template>
    <div id="app">
        <board :state="this.boardState" :id="'first'" width="600"/>
        <div style="clear : both"></div>
        <controls @golpause="pause" @golcontinue="golcontinue" @golclear="golclear"/>
    </div>
</template>

<script>

import {flatGliderGun} from '../util/gol-templates';
import {hub} from '../util/events-hub';
import gol from '../lib/game-of-life';
import controls from './controls';
import board from './board';


export default {

    data : function(){
        return {
                boardState : gol.fromFlat( flatGliderGun() ),
                pausegol : false
          }
    },

    created : function(){
        console.log('app created');

    },
    mounted : function(){
        console.log('app mounted');
        this.flowToNewState();
    },

    methods : {
        pause : function(){
            this.pausegol = true;
            hub.$emit('pauseevent');
        },

        golcontinue : function(){
            this.pausegol = false;
            this.flowToNewState();
        },
        golclear : function(){
            hub.$emit('clearevent');

        },
        flowToNewState : function(){
            let self = this;
            if( ! this.pausegol){
                setTimeout( function(){

                    hub.$emit('transiteevent');
                    self.flowToNewState();
                } , 100);
            }
        }
    },
    components : {
        board : require('./board.vue'),
        controls : require('./controls.vue')
    }
}

</script>

<style>

</style>
