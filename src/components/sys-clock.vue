<template>
  <div class="wrapper">
    <div class="scale">
        <div class="unit" v-for="(item, index) in units" :key="index" :style="item"></div>
    </div>
    <div class="clock">
        <!-- <div class="secondHand"></div>
        <div class="minuteHand"></div>
        <div class="hourHand"></div> -->
        <div class="center"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "sysClock",
  data() {
    return {
        units:[]
    };
  },
  methods: {
  },
  mounted() {
      for(let i=0; i<=59; i++){
        let deg = i * 6 + 90
        this.units.push({
            transform: 'rotate(' + deg + 'deg)'
        })
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
    border-radius: 50%;
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E5EEF5;
    position: relative;
}

.scale{
    position: absolute;
    width: 250px;
    height: 250px;
    top: 0px;
}

.unit{
    width: 125px;
    height: 3px;
    border-top: 0px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    border-left: 8px solid #fff;
    background-color: transparent;
    position: absolute;
    top: 50%;
    margin-top: -1.5px;
    margin-left: 4px;
    transform-origin: 121px 50%;
    transition: all .5s;
}

.clock{
    position: relative;
    width: 170px;
    height: 170px;
    margin: 40px;
    border-radius: 50%;
    background-color: #EBF4F9;
    box-shadow: 2px 6px 20px 10px rgba(202,214,232,0.8);
}

.clock > div {
    position: absolute;
    left: 50%;
    background-color: red;
    top: 50%;
    height: 3px;
    width: 100px;
    transform-origin: 20px 50%;
    transition: all .5s;
}

.clock > .secondHand{
    width: 100px;
    margin-top: -1.5px;
    margin-left: -20px;
    z-index: 3;
}

.clock > .minuteHand{
    height: 3px;
    margin-top: -1.5px;
    background-color: #CBD6E7;
    margin-left: -20px;
    z-index: 2;
}

.clock > .hourHand{
    width: 10px;
    height: 3px;
    border-top: 1px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 1px solid transparent;
    border-left: 100px solid #170A32;
    margin-top: -2.5px;
    margin-left: -20px;
    background-color: transparent;
}

div.clock > .center {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-left: -5px;
    margin-top: -5px;
    z-index: 3;
}

</style>
