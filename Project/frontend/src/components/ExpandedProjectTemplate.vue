<script>

import {Carousel, Pagination, Slide} from 'vue3-carousel'
import ProjectItem from "@/components/ProjectItem.vue";

export default {
  name: "ExpandedProject",
  props: {
    name: {required: true},
    description: {required: true},
    date: {required: true},
    repoLink: {required: true},
    images: {required: true},
    technologies: {required: true},
  },
  components: {
    ProjectItem,
    Carousel,
    Slide,
    Pagination
  },
  methods: {
    next() {
      this.$refs.projectImageCarousel.next()

    },
    prev() {
      console.log(this.images.length)
      this.$refs.projectImageCarousel.prev()
    },
    resetCarousel(){
      this.$refs.projectImageCarousel.restartCarousel()
    },
    addImg(){
      this.$refs.addImg.click();
    },
    imageUpdate(event){
      if (!event.target.files[0]){
        return
      }
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.$emit('newImg',file)
        this.displayErrorMessage = false
        this.$refs.projectImageCarousel.restartCarousel()
      }
      else {
        this.errorMessage = "Upload failed, Wrong file type. Please try again";
        this.displayErrorMessage = true;
      }
    },
    addTechnology(){
      if(this.$refs.techAdd.value === "") return
      this.$emit("newTechology",this.$refs.techAdd.value)
      this.$refs.techAdd.value = ""
    },

    updateRepolink(event){
      this.$emit("newRepolink",event.target.value)
    },
    updateDate(event){
      this.$emit("newDate", event.target.value)
    },
    updateName(event){
      this.$emit("newName", event.target.value)
    },
    updateDesc(event){
      this.$emit("newDesc", event.target.value)
    }

  },
  data(){
    return{
      serverURL: "http://localhost:3000/",
      displayErrorMessage: false,
      errorMessage:""

    }
  },


}
</script>

<template>
  <div id="fullProjectContainer">
    <div id="leftColumn">
      <div id="imageCarousel">
        <font-awesome-icon v-if="images.length > 0" class="expNavButton" :icon="['fas', 'less-than']" @click="prev"/>
        <carousel ref="projectImageCarousel" id="carousel" :items-to-show="1" :model-value="0" >
          <Slide v-for="image in images" :key="image">
            <img id="projectImages" :src="image">
          </Slide>
          <slide :key="1">
            <div @click="addImg" id="imagePlaceholder">
              <input accept="image/*" style="display: none" @change="imageUpdate" ref="addImg" type="file" placeholder="main img" alt=""/>
              <font-awesome-icon id="placeholderIcon" :icon="['fas', 'upload']" />
            </div>
          </slide>
          <template #addons>
            <Pagination v-if="images.length > 0"/>
          </template>
          <p style="color: red" v-if="displayErrorMessage" >{{errorMessage}}</p>
        </carousel>
        <font-awesome-icon v-if="images.length > 0" class="expNavButton" :icon="['fas', 'greater-than']" @click="next"/>
      </div>
      <div id="links">
        <input id="repoLink" @change="updateRepolink" type="url" placeholder="Repository link" :value="repoLink" >
        <input id="date" @change="updateDate" type="date" placeholder="Project Date" :value="date" >
      </div>


    </div>
    <div id="rightColumn">
      <input id="projectName" @change="updateName" type="text" placeholder="Project title" :value="name"/>
      <textarea id="projectDesc" @change="updateDesc" placeholder="Description"/>
      <h3>Technology used</h3>
      <ul id="techList">
        <li v-for="technology in technologies"> {{technology}}</li>
      </ul>
      <input ref="techAdd" name="newTech" type="text" placeholder="technology">
      <button @click="addTechnology">Add tech</button>
    </div>

  </div>

</template>

<style scoped>

#techList{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 60px;
}

.carousel__slide {
  padding: 10px;
}
#projectDesc{
  height: 150px;
  font-size: 20px;
  resize: none;

}

#repoLink{
  margin-bottom: 10px;
}

#links{
  display: flex;
  flex-direction: column;
  width: 310px;
  margin-left: 25px;
}

#projectName{
  line-height: 20%;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  max-height: 20%;
}

#fullProjectContainer{
  border: 1px solid white;
  height: 470px;
  min-width: 310px;
  display: flex;
  background: black;
  border-radius: 20px;
  align-items: center;
  width: 50%;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
#imageCarousel{
  width: 310px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  padding-right: 20px;
  justify-content: center;
  border-right: white solid 1px;
}

#leftColumn{
  display: flex;
  flex-direction: column;

}
#rightColumn{
  display: flex;
  max-height: 100%;
  flex-direction: column;
  width: 60%;
}

#carousel {
  width: 100%;
}

.expNavButton {
  color: white;
  cursor: pointer;

}

.expNavButton:hover {
  color: rgba(255, 255, 255, 0.5);
}
#projectImages{
  width: 300px;
  height: 300px;
  object-fit: contain;
}

#imagePlaceholder{
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 30px;
  border: white 1px dashed;
  width: 300px;
  height: 300px;
  cursor: pointer;
}

</style>