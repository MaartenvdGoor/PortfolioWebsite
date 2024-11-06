<script>

import AboutMe from "@/components/AboutMe.vue";
import SkillList from "@/components/SkillList.vue";
import ExperienceList from "@/components/ExperienceList.vue";
import ProjectList from "@/components/ProjectList.vue";


export default {
  name: "mainView",
  components: {ProjectList, ExperienceList, SkillList, AboutMe},

  data(){
    return{
      loggedIn: false
    }
  },

  methods:{
    async checkForLogin(){
      let localKey = localStorage.getItem("loginKey")
      if (localKey){
              let response = await fetch(import.meta.env.VITE_API_URL+`/checkLoginKey?key=${localKey}`)
      if(response.ok){
        this.loggedIn = true
        console.log("LoggedIn")
      }
      }
    },
    addNewProject(){
      this.$router.push("/project/add")
    }
  },

  beforeMount() {
    this.checkForLogin()
  }
}


</script>

<template>
  <div id="container">
    <about-me/>
    <h1 class="componentTitle">My skills</h1>
    <skill-list/>
    <h1 class="componentTitle">My Experiences</h1>
    <experience-list/>
    <h1 class="componentTitle">My projects</h1>
    <project-list/>
    <button style="margin-bottom: 20px" v-if="loggedIn" @click="addNewProject">Add new project</button>
  </div>

</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

}
</style>
