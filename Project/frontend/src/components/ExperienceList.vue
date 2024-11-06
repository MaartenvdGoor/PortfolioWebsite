<script>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Navigation} from 'vue3-carousel'
import ExperienceItem from "@/components/ExperienceItem.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from 'vue'
export default {
  name: "ExperienceList",
  components: {
    FontAwesomeIcon,
    ExperienceItem,
    Carousel,
    Slide,
    Navigation,
  },
  setup(){
    const myCarousel = ref(null); // Declare the ref inside setup
    return {myCarousel}
  },
  data() {
    return {
      experiences: [
        {
          name: "FONTYS HBO-ICT",
          logo: "/fontys.png",
          description: "During my time at Fontys, I learned C#, SQL, Java, and " +
              "key programming concepts  like SOLID and software architecture. " +
              "I also gained experience with Waterfall, Scrum, and Agile methodologies. \n"+
              "Working on group projects helped to improve my teamwork and communication skills, " +
              "while documenting my work helped me clearly convey technical ideas.",
          details: ["HBO", "Eindhoven", "Bachelor"],
          date:"Aug 2017 - Jun 2021"
        },
        {
          name: "SINTLUCAS",
          logo: "/sintlucas.png",
          description: "At SINTLUCAS, I’ve developed skills in web and game development, " +
              "specializing in technologies like Vue.js and Node.js. \n " +
              "My experience in project-based learning within Scrum teams has enhanced my collaboration and agile development skills. \n" +
              "I am on track to graduate summa cum laude, showcasing my commitment to excellence.",
          details: ["MBO 4", "Eindhoven", "Vocational"],
          date:"Aug 2021 - Jun 2025"
        },
        {
          name: "AT-Automation",
          logo: "/at-automation.png",
          description: "During my internship at AT-Automation, I gained valuable insights into working in a corporate environment. " +
              "I developed technical skills in Ignition and enhanced my proficiency in Python and SQL. Additionally, " +
              "I deepened my understanding of SCADA and MES systems and their integration. " +
              "Collaborating closely with my colleagues allowed me to improve my teamwork and communication skills on various projects.",
          details: ["Internship", "Weert", "Work experience"],
          date:"Aug 2023 - Feb 2024"
        },
      ],
      currentSlide: 0,
      myCarousel: null
    }
  },
  methods: {
    handleSlide(data){
      this.currentSlide = data.slidingToIndex
    },
    next(){
      if (this.currentSlide < this.experiences.length - 1){
        this.currentSlide++
      }
      else{
        this.currentSlide= 0
      }

    },
    prev(){
      if (this.currentSlide > 0){

        this.currentSlide--
      }
      else{
        this.currentSlide= this.experiences.length -1
      }
    }
  }

}
</script>

<template>
  <div id="experienceListContainer">
    <div id="dateControl">
      <font-awesome-icon class="expNavButton" :icon="['fas', 'less-than']" @click="prev"/>
      <Carousel @slide-start="handleSlide" ref="myCarousel" id="dateCarousel" :items-to-show="1"  :model-value="currentSlide">
        <slide   v-for="experience in experiences" :key="experience">
          <p>{{experience.date}}</p>
        </slide>
      </Carousel>
      <font-awesome-icon class="expNavButton" :icon="['fas', 'greater-than']" @click="next"/>
    </div>
    <Carousel @slide-start="handleSlide" id="experienceCarousel" :items-to-show="1" :model-value="currentSlide">
      <Slide ref="carousel" v-for="experience in experiences" :key="experience">
        <experience-item :details="experience.details" :logo="experience.logo" :description="experience.description"
                         :name="experience.name"/>
      </Slide>
    </Carousel>

  </div>
</template>

<style scoped>
#experienceListContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  margin-bottom: 20px;
  flex-direction: column;

}
.expNavButton{
  color: white;
}
.expNavButton:hover{
  color: rgba(255, 255, 255, 0.5);
}
#dateControl{
  display: flex;
  align-items: center;
}
#experienceCarousel {
  width: 53%;
  overflow: hidden;

}

</style>