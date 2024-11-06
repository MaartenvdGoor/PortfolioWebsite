<script>
export default {
  name: "ProjectItemTemplate",

  data(){
    return{
      errorMessage:"",
      displayErrorMessage:false
    }
  },
  props: {
    name: {required: false},
    smallDescription: {required: false},
    mainImg: {required: false},
  },
  methods:{
    addMainImg(){
      this.$refs.addMainImg.click();
    },
    imageUpdate(event){
      if (!event.target.files[0]){
        return
      }
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.$emit('newMainImg',file)
        this.displayErrorMessage = false
      }
      else {
        this.errorMessage = "Upload failed, Wrong file type. Please try again";
        this.displayErrorMessage = true;
      }
    },
    nameUpdate(event){
      this.$emit('nameUpdate', event.target.value)
    },
    descUpdate(event){
      this.$emit('smallDescUpdate', event.target.value)
    }
  }

}
</script>

<template>

  <div id="cardContainer">
    <input accept="image/*" style="display: none" @change="imageUpdate" ref="addMainImg" type="file" placeholder="main img" alt=""/>
    <div @click="addMainImg" v-if="!mainImg" id="imagePlaceholder">
      <font-awesome-icon id="placeholderIcon" :icon="['fas', 'upload']" />
    </div>
    <img @click="addMainImg" v-if="mainImg" id="projectImage" :src=mainImg alt="main project image">
    <p style="color: red" v-if="displayErrorMessage" >{{errorMessage}}</p>
    <input @change="nameUpdate" type="text" id="skillName" placeholder="Project Title" :value="name"/>
    <textarea @change="descUpdate" maxlength="50" id="smallDesc" placeholder="Small description" :value="smallDescription"/>
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
  width: 18%;
}

#placeholderIcon{
  font-size: 30px;
}

#projectImage {
  width: 300px;
  height: 300px;
  border-radius: 360px;
  padding: 10px;
  object-fit: cover;
  cursor: pointer;
}
#imagePlaceholder{
  cursor: pointer;
  width: 300px;
  border-radius: 360px;
  padding: 10px;
  display: flex;
  justify-content: center;
  height: 300px;
  align-items: center;
  border: white 1px dashed;
  margin: 10px;
}
#skillName {
  margin-bottom: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: bold;
}
#smallDesc{
  height: 80px;
  width: 80%;
  margin-bottom: 10px;
  font-size: 20px;
  resize: none;

}
</style>