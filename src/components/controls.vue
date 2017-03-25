<template>
    <div class="controls">
        <i class="fa fa-pause pause-icon" @click="emitPause" :class="{ active : isActive('pause')}"></i>
        <i class="fa fa-play start-icon" @click="emitContinue" :class="{ active : isActive('continue')}"></i>
        <i class="fa fa-certificate clear-icon" @click="emitClear"></i>

        <p>Red pauses, orange plays and yellow clears the board.</p>
        <p>Click cells to raise or kill them.</p>
        <p>Have fun :-D</p>
    </div>
</template>


<script>
    export default {

        data : function(){
            return {
                active : {
                    continue : true
                }
            }
        },
        methods : {

            emitPause : function(){
                this.clearActive();
                this.setActive('pause');
                this.$emit('golpause');
            },

            emitContinue : function(){
                this.clearActive();
                this.setActive('continue');
                this.$emit('golcontinue');
            },

            emitClear : function(){
                this.clearActive();
                this.setActive('pause');
                this.$emit('golpause');
                this.$emit('golclear');
            },

            setActive : function(key){
                this.active[key] = true;
            },
            isActive : function(key){
                return this.active[key] == true;
            },
            clearActive : function(){
                this.active = {};
            }
        }
    }
</script>

<style scoped>

.controls{
    width : 50%;
    text-align : center;
    padding-top : 20px;
    margin : auto;

}

.controls i{

    font-size: 30px;
    text-align: center;
    padding-left : 10px;
    padding-right: 10px;
    cursor : pointer;
}

.pause-icon{
    color : #f66;
}

.start-icon{
    color : #e96900;
}

.clear-icon{
    color : #FCB738;
}

.fa.active:before{
    text-shadow: 3px 3px 3px #ccc;
}

p {
    font-family: 'Roboto', sans-serif;
}



</style>
