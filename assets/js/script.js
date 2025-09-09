//Script with MVC architecture (required for this assignment)

/* Variables for matrix quadrants */
const topPrioritySectionByMariePierreLessard = document.getElementById("priority1");
const planningSectionByMariePierreLessard = document.getElementById("priority2");
const InterruptionSectionByMariePierreLessard = document.getElementById("priority3");
const distractionSectionByMariePierreLessard = document.getElementById("priority4");

/* Variables for modals */
const helpModalByMariePierreLessard = document.getElementById("helpModalByMariePierreLessard");
const categoryCreationModalByMariePierreLessard = document.getElementById("catCreationModalByMariePierreLessard");
const categoryEditingAndDeletionModalByMariePierreLessard = document.getElementById("catEditingModalByMariePierreLessard");
const taskCreationModalByMariePierreLessard = document.getElementById("taskCreationModalByMariePierreLessard");
const taskEditingAndDeletionModalByMariePierreLessard = document.getElementById("taskEditingModalByMariePierreLessard");




/* #region MODEL CODE */

/* #endregion about model code */

/* #region VIEW CODE */

/* This dark-to-light-mode switch did not work in my first attempts. 
Applying this function to the HTML element (root element) does NOT work. I don't know why. */
/* TO DO: save to local storage so that the user doesn't lose his/her colour scheme on the next visit/on refresh. */
function toggleColourSchemeByMariePierreLessard() {
    document.body.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    /* Alternatively: 
    const bodyElementByMariePierreLessard = document.body;
    bodyElementByMariePierreLessard.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    */

    /* TO DO: how do you save a user preference as a key-value pair? You would probably have to put the choice in a variable... 
    localStorage.setItem();
    */
};

/* Checked: all open and close functions of 5 modals */
function openHelpModalByMariePierreLessard() {
    helpModalByMariePierreLessard.showModal();
};

function closeHelpModalByMariePierreLessard() {
    helpModalByMariePierreLessard.close();
};

function openCategoryCreationModalByMariePierreLessard() {
    categoryCreationModalByMariePierreLessard.showModal();
};

function closeCategoryCreationModalByMariePierreLessard() {
    categoryCreationModalByMariePierreLessard.close();
};

function openCategoryEditingAndDeletionModalByMariePierreLessard() {
    categoryEditingAndDeletionModalByMariePierreLessard.showModal();
};

function closeCategoryEditingAndDeletionModalByMariePierreLessard() {
    categoryEditingAndDeletionModalByMariePierreLessard.close();
};

function openTaskCreationModalByMariePierreLessard() {
    taskCreationModalByMariePierreLessard.showModal();
};

function closeTaskCreationModalByMariePierreLessard() {
    taskCreationModalByMariePierreLessard.close();
};

function openTaskEditingAndDeletionModalByMariePierreLessard() {
    taskEditingAndDeletionModalByMariePierreLessard.showModal();
};

function closeTaskEditingAndDeletionModalByMariePierreLessard() {
    taskEditingAndDeletionModalByMariePierreLessard.close();
};

/* #endregion about view code */

/* #region CONTROLLER CODE */

/* #endregion about controller code */

