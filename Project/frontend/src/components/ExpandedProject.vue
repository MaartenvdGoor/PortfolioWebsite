<script>

import {Carousel, Pagination, Slide} from 'vue3-carousel'
import {ref} from "vue";
import ProjectItem from "@/components/ProjectItem.vue";
import 'vue3-carousel/dist/carousel.css'

export default {
  name: "ExpandedProject",
  setup() {
    const projectImageCarousel = ref(null); // Declare the ref inside setup
    return {projectImageCarousel}
  },
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
      console.log(this.technologies)
      this.projectImageCarousel.next()

    },
    prev() {
      this.projectImageCarousel.prev()
    },
    resetCarousel() {
      this.projectImageCarousel.restartCarousel()
    }

  },
  data() {
    return {
      serverURL: import.meta.env.VITE_API_URL + "/",
    }
  },

  computed: {
    formattedDate() {
      const date = new Date(this.date);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },

}
</script>

<template>
  <div id="fullProjectContainer">
    <div id="leftColumn">
      <div id="imageCarousel">
        <font-awesome-icon class="expNavButton" :icon="['fas', 'less-than']" @click="prev"/>
        <carousel ref="projectImageCarousel" id="carousel" :items-to-show="1" :model-value="0">
          <Slide v-for="image in images" :key="image">
            <img id="projectImages" :src="serverURL + 'image/' + name + '/' + image">
          </Slide>
          <template #addons>
            <Pagination/>
          </template>
        </carousel>
        <font-awesome-icon class="expNavButton" :icon="['fas', 'greater-than']" @click="next"/>
      </div>
      <div id="links">
        <h3  ><a id="repoLink":href="repoLink">Repository Link</a></h3>
        <h3 id="date">{{formattedDate}}</h3>
      </div>
    </div>
    <div id="rightColumn">
      <h1 id="projectName">{{ name }}</h1>
      <p id="projectDesc">{{ description }}</p>
      <h3>Technology used</h3>
      <ul>
        <li v-for="technology in technologies"> {{ technology }}</li>
      </ul>
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
  text-decoration: none;
  color: white;
}
#repoLink:hover{
  text-decoration: underline;
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
  min-width: 100%;
  display: flex;
  background: black;
  border-radius: 20px;
  align-items: center;
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
  justify-content: center;

}

#leftColumn{
  display: flex;
  flex-direction: column;
  border-right: white solid 1px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;

}
#rightColumn{
  display: flex;
  max-height: 100%;
  flex-direction: column;
  width:600px;

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


</style>