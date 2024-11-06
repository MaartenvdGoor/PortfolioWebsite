<script>
import ProjectItem from "@/components/ProjectItem.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Carousel, Navigation, Slide} from 'vue3-carousel'
import SkillCard from "@/components/SkillCard.vue";
import ExpandedProject from "@/components/ExpandedProject.vue";
import 'vue3-carousel/dist/carousel.css'

export default {
  name: "ProjectList",
  components: {ExpandedProject, SkillCard, Navigation, ProjectItem, Carousel, Slide},

  data() {
    return {
      projects: [],
      loading: true,
      serverURL: import.meta.env.VITE_API_URL,
      currentSlide: 0
    }
  },
  beforeMount() {
    this.getProjects()
  },

  methods: {
    async getProjects() {
      let response = await fetch(this.serverURL + "/project")
      this.projects = await response.json()
      console.log(this.projects)
      this.loading = false
    },
    next() {
      this.$refs.projectCarousel.next()

    },
    prev() {
      this.$refs.projectCarousel.prev()
    },
    handleSlide(data){
      this.currentSlide = data.currentSlideIndex
      this.$refs.projectDisplay.resetCarousel()
    },
  }
}
</script>

<template>
  <div v-if="loading">
    <h1>Loading projects</h1>
  </div>

  <div v-if="!loading" id="projectContainer">
    <font-awesome-icon class="expNavButton" :icon="['fas', 'less-than']" @click="prev"/>
    <Carousel @slide-end="handleSlide" ref="projectCarousel" id="carousel" :items-to-show="3.5"
              :model-value="0" :wrap-around="true" :transition="500">
      <Slide v-for="project in projects" :key="project">
        <project-item :images="project.images" :main-img="serverURL + '/image/' + project.name + '/' + project.mainImg"
                      :repo-link="project.repoLink" :description="project.description"
                      :small-description="project.smallDesc" :name="project.name"/>
      </Slide>
    </Carousel>
    <font-awesome-icon class="expNavButton" :icon="['fas', 'greater-than']" @click="next"/>
  </div>
  <font-awesome-icon v-if="!loading" :icon="['fas', 'arrow-down-long']"/>
  <div id="individualProject" v-if="!loading">

    <expanded-project ref="projectDisplay" :images="projects[currentSlide].images" :repo-link="projects[currentSlide].repoLink"
                      :date="projects[currentSlide].date" :description="projects[currentSlide].description"
                      :name="projects[currentSlide].name" :technologies="projects[currentSlide].technologies"/>
  </div>
</template>

<style scoped>
#projectContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  margin-bottom: 20px;

}
#individualProject{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
#carousel {
  width: 50%;
  overflow: hidden;
  margin-right: 10px;
  margin-left: 10px;
}

.expNavButton {
  color: white;
}

.expNavButton:hover {
  color: rgba(255, 255, 255, 0.5);
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.8);
}

.carousel__slide--active {
  transform: rotateY(20deg) scale(0.8);

}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.9);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}
</style>