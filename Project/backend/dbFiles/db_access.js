const mysql = require("mysql2/promise");

const hostname = process.env.DB_HOST;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD

async function getConnection() {
    const connection = await mysql.createConnection({
        host: hostname,
        user: username,
        password: password,
        database: database,
        port: port,
    });
    return connection
}

exports.getProjects = async function () {
    const connection = await getConnection()
    const sql = "SELECT * FROM Project";
    let [results] = await connection.query(sql)
    connection.close()
    for (let result of results) {
        result.images = await getProjectImages(result);
        result.technologies = await getProjectTechnologies(result);
    }
    return results

}

exports.checkLogin = async function (username, password) {
    const connection = await getConnection();
    const sql = "SELECT * FROM User WHERE username = ? AND password = ?";
    const values = [username, password]
    let results = await connection.query(sql, values)
    connection.close()
    return results[0].length > 0
}


exports.updateLoginKey = async function (key,username, password) {
    const connection = await getConnection();
    const sql = "UPDATE User SET loginKey = ? WHERE username = ? AND password = ?";
    const values = [key,username, password]
    await connection.query(sql, values)
    connection.close()
}

exports.checkLoginKey = async function (key) {
    const connection = await getConnection();
    const sql = "SELECT * FROM User WHERE loginKey = ?";
    const values = [key]
    let results = await connection.query(sql, values)
    connection.close()
    return results[0].length > 0

}

exports.addNewProject = async function (projectName,description,shortDescription,repoLink,technologies,mainImg,images,date) {
    const connection = await getConnection();
    const sql = "INSERT INTO Project (name,date,repolink,mainImg,smallDesc,description) VALUES(?,?,?,?,?,?)"
    const values = [projectName,date,repoLink,mainImg,shortDescription,description]
    let results = await connection.query(sql, values)
    let projectID = results[0].insertId
    for(let image of images){
        await insertProjectImages(image,projectID,connection)
    }
    for(let technology of technologies){
        await insertProjectTechnologies(technology,projectID,connection)
    }
    connection.close()
}


insertProjectImages = async function (image,id,connection) {
    const sql = "INSERT INTO ProjectImage (imageLink, projectId) VALUES (?,?)"
    const values = [image,id]
    await connection.query(sql, values)
}

insertProjectTechnologies = async function(technology,id,connection) {
    const sql = "INSERT INTO Technology (name, projectID) VALUES (?,?)"
    const values = [technology,id]
    await connection.query(sql, values)
}


getProjectImages = async function (project) {
    const connection = await getConnection()
    const sql = "SELECT * FROM ProjectImage WHERE ProjectID=?";
    const values = [project.id]
    let [results] = await connection.query(sql, values)
    let images = [project.mainImg]
    for (let result of results) {
        images.push(result.imageLink)
    }
    connection.close()
    return images

}

getProjectTechnologies = async function (project) {
    const connection = await getConnection()
    const sql = "SELECT * FROM Technology WHERE ProjectID=?";
    const values = [project.id]
    let [results] = await connection.query(sql, values)
    let technologies = []
    for (let result of results) {
        technologies.push(result.name)
    }
    connection.close()
    return technologies
}





