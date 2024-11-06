<script>
export default {
  name: "ProjectItem",
  props: {
    name: {required: true},
    smallDescription: {required: true},
    description: {required: true},
    repoLink: {required: true},
    mainImg: {required: true},
    images: {required: true},
  },

}
</script>

<template>
  <div id="cardContainer">
    <img id="projectImage" :src=mainImg>
    <h1 id="skillName">{{ name }}</h1>
    <h3 id="smallDesc">{{ smallDescription }}</h3>
  </div>
</template>

<style scoped>
#cardContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px white solid;
  background: black;
  border-radius: 20px;
  margin: 10px;
  max-width: 320px;
}
#smallDesc{
  height: 50px;
}
#projectImage {
  width: 100%;
  object-fit: contain;
  padding: 10px;
}

#skillName {
  border-bottom: white 1px solid;
  margin-bottom: 0;
}
</style>