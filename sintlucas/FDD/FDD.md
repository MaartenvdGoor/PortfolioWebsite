# Functional Design Document (FDD)

## General description

Portfolio website where it is easy to add new projects
## Functional requirements
* User is able to see information about me 
* User is able to see information about my skill level
* User is able to see my work experience
* User is able to see my Educational history
* User is able to see projects displayed
* User is able to see details about a project
* User is able to login
* User is able to add new projects
* User is able to edit projects
* User is able to delete projects


## MOSCOW table

### Must haves
* User is able to see information about me 
* User is able to see information about my skill level
* User is able to see my work experience
* User is able to see my Educational history
* User is able to see projects displayed

### Should haves
* User is able to see details about a project
* User is able to login
* User is able to add new projects

### Could haves
* User is able to edit projects
* User is able to delete projects
* User is able to view and control website with mobile device

### Won't have
* User is able to edit all information on the web page

## Non-functional requirements
### Performance
* Website should be able to support multiple users accessing it at the same time
* Website should load within 2 seconds

### Security
* Only the owner should be able to login
* Adding/Editing/Deleting projects should only be allowed by the owner

### Visuals
* It should be a presentable website that is pleasing to the eye.


--- 
# After refinement of each requirement

## Functional Requirements

1. Users is a able to see information about me
    * Profile photo + Introduction about who i am + a bullet point list with details about me.
    ![Wireframe Func req 1](Func%20req%201.png)

2. User is able to see information about my skill level
    * Cards that rotate to show my skill level in years i've practiced it.

    ![Wireframe Func req 2](Func%20req%202.png)

3. User is able to see my work experience/Educational history
    * Shows a name, and a summary of what my role there was. Above the card people can click to see the next thing.

    ![Wireframe Func req 3+4](Func%20req%203%2B4.png)

4. User is able to see projects displayed + User is able to see details about a project
    * Shows the name of the project + a small description + main image. it has a button which folds open a section that shows more details about the project like what technology was used

    ![Wireframe Func req 5+6](Func%20req%205%2B6.png)

5. User is able to login
    * Owner of the website can login with a username + password.

    ![Wireframe Func req 7](Func%20req%207.png)

6. User is able to add/edit new projects
    * Owner can give name, describtion, tech used and images for project
    * This only available after the owner is logged in.
    
    ![Wireframe Func req 8+9](Func%20req%208%2B9.png)

7. User is able to delete projects
    * Owner can delete a project by clicking on the delete button when seeing a project
    * This is only available after the owner is logged in