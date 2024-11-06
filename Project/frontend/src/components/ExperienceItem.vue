<script>
export default {
  name: "ExperienceItem",


  props:{
    name:{required:true},
    description:{required:true},
    logo:{required:true},
    details:{required:true},
  },

  methods: {
  }
}
</script>

<template>
  <div id="experienceContainer">
    <div id="leftColumn">
      <img id="logo" :src="logo">
      <div id="experienceDetails">
        <h3>Details</h3>
        <ul>
          <li v-for="detail in details"> {{ detail }}</li>
        </ul>
      </div>
    </div>
    <div id="rightColumn">
      <h1>{{name}}</h1>
      <p class="css-fix" id="experienceDescription">{{description}}</p>
    </div>
  </div>

</template>

<style scoped>
#experienceContainer {
  border: 1px solid white;
  display: flex;
  background: black;
  border-radius: 20px;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
}

#logo {
  width: 200px;
  margin: 10px;
  border: 1px solid white;
}
#experienceDetails{
  border: 1px solid white;
  border-radius: 20px;
  padding: 10px;
  margin-left: 10px;
  margin-bottom: 10px;

}

#experienceDetails h3{
  margin-top:5px;
}
#experienceDetails ul li{
  margin-left: -20px

}
a{
  text-decoration: none;
  color: white;
}
a:hover{
  text-decoration: underline;
}

#leftColumn{
  width: 210px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}
#rightColumn{
  display: flex;
  flex-direction: column;
}
#rightColumn h1{
  font-size: 40px;
}
#experienceDescription{
  font-size: 20px;
  text-align: left;
}
.css-fix {
  white-space: pre-wrap;
}
</style>