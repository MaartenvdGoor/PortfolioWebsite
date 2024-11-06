const express = require('express');
const path = require("path");
const dbAccess = require("../dbFiles/db_access");
const router = express.Router();

router.get('/', async (req, res) =>  {
    try{
        const result = await dbAccess.getProjects()
        console.log("projects requested")
        res.status(200).json(result)
    }
    catch (e){
        console.error(e)
        res.status(500).send()
    }
})

router.post('/add', async (req, res) => {
    try{
        let project = req.body
        await dbAccess.addNewProject(project.projectName,project.description,project.shortDescription,project.repoLink,project.technologies,project.mainImg,project.imageNames,project.date)
        res.status(200).send()
    }
    catch (e){
        console.error(e)
        res.status(500).send()
    }
})

module.exports = router