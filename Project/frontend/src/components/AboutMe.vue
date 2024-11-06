<script>
export default {
  name: "AboutMe",

  methods: {
    calculate_age() {
      const today = new Date();
      const birth = new Date('1998-09-16');
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    }
  }
}
</script>

<template>
  <div id="aboutMeContainer">
    <div id="leftColumn">
      <img id="profilePhoto" src="../assets/profile_photo.png">
      <div id="details">
        <h3>Details</h3>
        <ul>
          <li>Age: {{calculate_age()}}</li>
          <li>Residence: <a href="https://maps.app.goo.gl/yW8trmmxttRTnc7eA" target="_blank">Geldrop, Noord-brabant</a></li>
          <li><a href="https://www.linkedin.com/in/maarten-van-de-goor/">LinkedIn</a></li>
          <li><a href="https://github.com/MaartenvdGoor">Github</a></li>
        </ul>
      </div>
    </div>
    <div id="rightColumn">
      <h1>About me</h1>
      <p id="description">
        Hello, I’m Maarten van de Goor, born in September 1998 in Geldrop, The Netherlands.
        After initially pursuing a career as a schoolteacher,
        I discovered my passion for technology and decided to become a software developer.
        <br> <br>
        I studied at FONTYS in Eindhoven before transferring to SINTLUCAS, where I sharpened my skills in various programming languages. I am proficient in C#, HTML, CSS, Unity, and SQL, with basic knowledge of JavaScript and PHP.
      </p>
    </div>
  </div>

</template>

<style scoped>
#aboutMeContainer {
  border: 1px solid white;
  display: flex;
  background: black;
  border-radius: 20px;
  align-items: center;
  width: 50%;
  margin-bottom: 20px;
}

#profilePhoto {
  width: 300px;
  margin: 20px;
  margin-right: 30px;
  border: 1px solid white;
  border-radius: 360px;
}
#details{
  border: 1px solid white;
  border-radius: 20px;
  padding: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
#details ul li{
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
  width: 340px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-right: solid white 1px;
}
#rightColumn{
  display: flex;
  flex-direction: column;
}
#description{
  font-size: 22px;
  margin-right: 20px;
}
</style>