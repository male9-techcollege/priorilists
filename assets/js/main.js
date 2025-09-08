//Script with MVC architecture (required for this assignment)

/* #region MODEL CODE */

/* #endregion about model code */

/* #region VIEW CODE */

/* This dark-to-light-mode switch did not work in my first attempts. 
Applying this function to the HTML element (root element) does NOT work. I don't know why. */
/* TO DO: save to local storage so that the choice also applies to other pages of site, so that the user doesn't lose his/her colour scheme when navigating to help page and back (each page has its own local storage). 
This might require an event listener on the header links instead of an expansion of the function below. */
function toggleColourSchemeByMariePierreLessard() {
    document.body.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    /* Alternatively: 
    const bodyElementByMariePierreLessard = document.body;
    bodyElementByMariePierreLessard.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    */
};

/* TO DO: the footer is also visible on the help page, so make sure that functions work on help page and bring user back to home page when modals close. 
The user has to see that the changes were implemented, just like when a form is submited. */
/* TO DO: make this match code description */
function openCatCreationModalByMariePierreLessard() {
    document.getElementById("catCreationModalByMariePierreLessard").showModal();
}

function openTaskCreationModalByMariePierreLessard() {
    document.getElementById("taskCreationModalByMariePierreLessard").showModal();
}

/* #endregion about view code */

/* #region CONTROLLER CODE */

/* #endregion about controller code */

