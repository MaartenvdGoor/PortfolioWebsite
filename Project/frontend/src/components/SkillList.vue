<script>
import SkillCard from "@/components/SkillCard.vue";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import {ref} from "vue";


export default {
  name: "SkillList",
  components: {
    SkillCard,
    Carousel,
    Slide,
    Navigation,
  },
  setup(){
    const skillCarousel = ref(null); // Declare the ref inside setup
    return {skillCarousel}
  },
  data() {
    return {
      startingIndex:0,
      skills: [
        {name: "HTML", level: "5 Years", image: "/html.png"},
        {name: "CSS", level: "5 Years", image: "/css.png"},
        {name: "JavaScript", level: "4 Years", image: "/javaScript.png"},
        {name: "C#", level: "6 Years", image: "/csharp.png"},
        {name: "Python", level: "1 Year", image: "/python.png"},
        {name: "Ignition", level: "1 Year", image: "/ignition.png"},
      ]
    }
  },
  methods:{
    next(){
      this.skillCarousel.next()
    },
    prev(){
      this.skillCarousel.prev()
    }
  }
}
</script>

<template>
  <div id="skillContainer">
    <font-awesome-icon class="expNavButton" :icon="['fas', 'less-than']" @click="prev"/>
    <Carousel ref="skillCarousel" id="carousel" :items-to-show="3" :model-value="1" :wrap-around="true">
      <Slide class="skillCard" v-for="skill in skills" :key="skill">
        <skill-card  :image="skill.image" :skill-level="skill.level" :skill-name="skill.name"/>
      </Slide>
    </Carousel>
    <font-awesome-icon class="expNavButton" :icon="['fas', 'greater-than']" @click="next"/>
  </div>


</template>

<style scoped>
#skillContainer{
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  margin-bottom: 20px;

}
#carousel{
  width: 50%;
  overflow: hidden;

}
.expNavButton{
  color: white;
}
.expNavButton:hover{
  color: rgba(255, 255, 255, 0.5);
}

</style>