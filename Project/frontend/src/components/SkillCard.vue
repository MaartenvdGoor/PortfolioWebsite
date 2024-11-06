<script>
export default {
  name: "SkillCard",

  props:{
    skillName:{required: true},
    skillLevel:{required: true},
    image:{required: true},
  }
}
</script>

<template>
<div id="cardContainer">
  <img id="skillImage" :src=image>
  <h1 id="skillName">{{skillName}}</h1>
  <h2>{{skillLevel}}</h2>
</div>
</template>

<style scoped>
#cardContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px white solid;
  background: black;
  border-radius: 20px;
  max-width: 320px;
  margin: 10px;
}
#skillImage{
  width: 100%;
  padding: 10px;
}
#skillName{
  border-bottom: white 1px solid;
  margin-bottom: 0;
}
</style>