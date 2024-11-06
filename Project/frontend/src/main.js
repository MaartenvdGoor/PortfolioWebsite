import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faUpload, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import { faArrowDownLong} from "@fortawesome/free-solid-svg-icons";
import loginScreen from "@/views/loginScreen.vue";
import mainView from "@/views/mainView.vue";
import addProjectScreen from "@/views/addProjectScreen.vue";

/* import vue final modal */

/* add icons to the library */
library.add(faUserSecret)
library.add(faLessThan)
library.add(faGreaterThan)
library.add(faArrowDownLong)
library.add(faUpload)

const routes = [
    {path: '/', name:'mainView', component: mainView},
    {path: '/login', name:'loginHandler',component: loginScreen},
    {path: '/project/add', name:'addProject',component: addProjectScreen}
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
