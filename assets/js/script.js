/* Ref. for the following notes:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

This is a default import (a default function does not require curly brackets, and I could have renamed it without using "as"). */
import displayGetStartedByMariePierreLessard from "./modules/intro-msg.js";
/* This is a namespace import: */
import * as helpModalFunctions from "./modules/global-header.js";
/* This is a named import */
/* MAYBE TO DO */
// import {name1, name2} "./modules/sth.js";
/* MAYBE TO DO: This is a module imported for its side effects (): */
// import "./modules/sth.js";

/* For a potential demonstration on AirTame (TO DO: put in relevant MVC sections later): */
const btnOpenHelpModalByMariePierreLessard = document.getElementById("openHelpModalByMariePierreLessard");
const btnCloseHelpModalByMariePierreLessard = document.getElementById("closeHelpModalByMariePierreLessard");

/* Q: Why does an event listener fail to work if openHelpModalByMariePierreLessard() is passed as 
an argument instead of the equivalent of 
() => {openHelpModalByMariePierreLessard()} ?
A: Syntax: addEventListener("event", function, ...)
When a function is called, it represents the return value of the executed function, it is NOT
a function to be executed IF the event is fired, so open-modal and close-modal functions were both run 
as soon as the window was open, and the event listener received the returned value of these functions, 
which must be (name of modal), display: block; or display: none; 
As a consequence, the dialog did not open, but the console logs showed that the functions were run. 
Source with the technical explanation:
"The second argument of addEventListener expects to receive a function. (...)
When you invoke a function, you are running the function and receiving its return value in its place. 
Unless your function returns another function, addEventListener won't have a function to fire when the click event happens. 
Instead it will have undefined if there is no return statement, or some other value (e.g. a number, a boolean, etc) 
which it can't do anything with. (...)
Calling myFunction() means you are passing the return value of myFunction into a place that expects 
a function. This function call gets evaluated when the event listener is added right away, 
and again, unless it returns a function, the event listener will not have a function to fire when you click."
https://www.reddit.com/r/learnjavascript/comments/qv7mrf/event_listener_triggering_by_itself */
btnOpenHelpModalByMariePierreLessard.addEventListener("click", () => {
    /* Since all functions of the global-header module are imported in the namespace helpModalFunctions,
    the default function cannot be called by its name, just by the keyword default! */
    helpModalFunctions.default();
});
btnCloseHelpModalByMariePierreLessard.addEventListener("click", () => {
    helpModalFunctions.closeHelpModalByMariePierreLessard();
});



/* Potential references in school work/materials: 
hf-websider/huskeseddel-mc-med-kasper
hf-websider/template-strings-mc-with-kasper and github/template-strings-codelab
USED: github/callback-opgave (it mixes user preferences and to-do lists in one string saved to local storage)
USED: github/datastruktur-opgave and earlier localStorage-opgave
USED: gf-websider/dark-mode-sandbox-... (to-do apps and dark mode with local storage)
USED: Global Goals assignment from the grundforløb (form validation)
*/

/* Methods to use:
- setItem(), getItem(), removeItem(), but not clear() unless I want to add that kind of functionality to the app 
- probably also the following, but I think that this is for key-value pairs stored in local storage, not for the contents of an array that is a value of such a pair: key() (
Source 1: "This method is particularly useful when you need to enumerate all stored items without knowing their keys in advance." https://strapi.io/blog/how-to-use-localstorage-in-javascript 
Source 2: "The key() method of the Storage interface, when passed a number n, returns the name of the nth key in a given Storage object." https://developer.mozilla.org/en-US/docs/Web/API/Storage/key 
*/

/* Script with MVC architecture (required for this assignment) 
Table of contents: 
Variables (M, V, C)
Model code
View code 
Controller code */

/* #region VARIABLES */

/* Model-code variables */

/* Variables for to-do-list arrays and their objects */

/* TO DO: based on the data structure in callback-opgave, I probably should have created 2 arrays in each of the 4 arrays for priority levels: 
one for individual tasks, which would each have their own index,
and one for categories, which would each have their own index, and also would each have a key-value pair for an array that contains tasks. 
IDEAS ON HOW TO PROCEED based on callback-opgave: 
Display function (at initialisation):
- When dynamically generating HTML elements for objects in local storage:
-- <li> are parents of screen-reader-accessible inline elements (inputs for titles/name, Edit button, and probably hidden elements for the invisible text areas and select menus). Are labels required for the sake of screen-reader users? Would their absence be confusing for the blind? NO labels, I think, because they should just think that this button opens a dialog. ARIA labels are needed here!
-- BETTER/EASIER: the Edit button has to be inside of a form that is invisible to the user. That way, the button knows what data it is supposed to send somewhere (to a dialog in this case). The input elements have to be deactivated and invisible. The button should be described to the blind as something that OPENS a dialog to enable editing. The button relays the index of the object, I think! Why would an ID be necessary?
-- For testing purposes, put text in dummy data set and give IDs to objects in that set while working on display function, before working on Edit button event listener. 

ID generation in string in local storage:
- If I want to use push() etc., I think that I need a counter that gives numeric IDs to items, so that I can know their index, but maybe there is an easier way than that... See Kasper's master class.
*/

/* Task objects either go in a categoryArrayByMariePierreLessard or in one of the 4 priority-level arrays. */
let taskByMariePierreLessard = {
    taskId: "",
    priorityLevel: "",
    categoryName: "",
    taskName: "",
    taskDetails: ""
};

/* categoryArray is a container for user-defined tasks, and it goes into the object categoryByMariePierreLessard  */
let categoryArrayByMariePierreLessard = [taskByMariePierreLessard];

let categoryByMariePierreLessard = {
    categoryId: "",
    priorityLevel: "",
    categoryName: "",
    categoryTasks: categoryArrayByMariePierreLessard
};

/* The 4 arrays for priority levels are containers for user-defined tasks and categories. 
Display location: see variables for matrix quadrants. */
let topPriorityArrayByMariePierreLessard = [categoryByMariePierreLessard, taskByMariePierreLessard];
let planningArrayByMariePierreLessard = [categoryByMariePierreLessard, taskByMariePierreLessard];
let InterruptionArrayByMariePierreLessard = [categoryByMariePierreLessard, taskByMariePierreLessard];
let distractionArrayByMariePierreLessard = [categoryByMariePierreLessard, taskByMariePierreLessard];

/* Do not move this array above the four variables it contains. An error would result. 
Accessing variables (below) before they are declared (above) is not allowed. */
let userDataArrayByMariePierreLessard = [topPriorityArrayByMariePierreLessard, planningArrayByMariePierreLessard, InterruptionArrayByMariePierreLessard, distractionArrayByMariePierreLessard];

const savedUserDataByMariePierreLessard = JSON.parse(localStorage.getItem("Priorilists' to-dos"));

/* View-code variables */

/* Variables for matrix quadrants (ul of each section) */
const topPriorityUlByMariePierreLessard = document.getElementById("priority1ul");
const planningUlByMariePierreLessard = document.getElementById("priority2ul");
const InterruptionUlByMariePierreLessard = document.getElementById("priority3ul");
const distractionUlByMariePierreLessard = document.getElementById("priority4ul");

/* Variables for modals */
const categoryCreationModalByMariePierreLessard = document.getElementById("catCreationModalByMariePierreLessard");
const categoryEditingAndDeletionModalByMariePierreLessard = document.getElementById("catEditingModalByMariePierreLessard");
const taskCreationModalByMariePierreLessard = document.getElementById("taskCreationModalByMariePierreLessard");
const taskEditingAndDeletionModalByMariePierreLessard = document.getElementById("taskEditingModalByMariePierreLessard");

/* Variables for buttons, inside and outside of modals (at least one is in an imported module) */
/* Open and close */
const btnToggleColourSchemeByMariePierreLessard = document.getElementById("toggleColourSchemeByMariePierreLessard");
const btnOpenCategoryCreationModalByMariePierreLessard = document.getElementById("openCategoryCreationModalByMariePierreLessard");
const btnCloseCategoryCreationModalByMariePierreLessard = document.getElementById("closeCategoryCreationModalByMariePierreLessard");
const btnOpenTaskCreationModalByMariePierreLessard = document.getElementById("openTaskCreationModalByMariePierreLessard");
const btnCloseTaskCreationModalByMariePierreLessard = document.getElementById("closeTaskCreationModalByMariePierreLessard");
/* TO DO: 
1st problem: 
I have temporary buttons in the HTML file to avoid the error message due to event listeners triggered by non-existing buttons (dynamically created buttons).
This error is thrown in sloppy mode as well.
The easiest solution must be to create such buttons in the view function following the initialisation function, whether there is user data saved in local storage or just empty strings.

2nd problem:
the 2 variables defined with let for buttons need to designate the Edit btn on which the user clicked.
Options:
reassign value of 
btnOpenCategoryEditingAndDeletionModalByMariePierreLessard
and
btnOpenTaskEditingAndDeletionModalByMariePierreLessard
to the edit button on which the user clicked. Bo said that the dynamically created buttons can have an ID that reflects the displayed object that it allows to modify (the ID of the object in the string saved to local storage). 
OR
Bo explained that we can use switch to have one function triggered by diff. things (but it doesn't seem to apply here).
OR
The event listener on the buttons created dynamically could ...

TEMPORARY variables defined by let -- just to avoid errors in the console. See temporary buttons in the HTML file.
Note: I can't give the same ID to all of these Open buttons. 
However, there is only one Close button in each dialog. */
let btnOpenCategoryEditingAndDeletionModalByMariePierreLessard = document.getElementById("openCategoryEditingAndDeletionModalByMariePierreLessard");
const btnCloseCategoryEditingAndDeletionModalByMariePierreLessard = document.getElementById("closeCategoryEditingAndDeletionModalByMariePierreLessard");
let btnOpenTaskEditingAndDeletionModalByMariePierreLessard = document.getElementById("openTaskEditingAndDeletionModalByMariePierreLessard");
const btnCloseTaskEditingAndDeletionModalByMariePierreLessard = document.getElementById("closeTaskEditingAndDeletionModalByMariePierreLessard");
/* Other buttons */
const btnCreateCategoryByMariePierreLessard = document.getElementById("createCategoryByMariePierreLessard");
const btnEditCategoryByMariePierreLessard = document.getElementById("editCategoryByMariePierreLessard");
const btnCreateTaskByMariePierreLessard = document.getElementById("createTaskByMariePierreLessard");
const btnEditTaskByMariePierreLessard = document.getElementById("editTaskByMariePierreLessard");



/* Controller-code variables */

let errorsByMariePierreLessard = [];

/* #endregion about variables */

/* #region MODEL CODE */

/* Research notes about the POOR SECURITY of local storage (most complex sites must at least have sth like Google Analytics on them!): 
A funny but enlightening quote:
"What's the most dangerous thing in the entire world? That's right! JavaScript.
Think about it like this: when you store sensitive information in local storage, you're essentially using the most dangerous thing in the world to store your most sensitive information in the worst vault ever created: not the best idea.
What the problem really boils down to is cross-site scripting attacks (XSS). (...)
If an attacker can run JavaScript on your website, they can retrieve all the data you've stored in local storage and send it off to their own domain. (...)
If your website is truly secure and no attacker can run JavaScript code on your website then you are technically safe, but in reality that is incredibly hard to achieve. Let me explain.
If your website contains any third party JavaScript code included from a source outside your domain:
- Links to bootstrap
- Links to jQuery
- Links to Vue, React, Angular, etc.
- Links to any ad network code
- Links to Google Analytics
- Links to any tracking code
Then you are currently at risk for having an attacker run JavaScript on your website. (...)
At most companies, the marketing team directly manages the public website using different WYSIWYG editors and tooling. Can you really be sure that nowhere on your site are you using third-party JavaScript? I'd argue “no”. (...)
I feel the need to specifically call out JSON Web Tokens (JWTs).
The biggest security offenders I see today are those of us who store JWTs (session data) in local storage. Many people don't realize that JWTs are essentially the same thing as a username/password.
If an attacker can get a copy of your JWT, they can make requests to the website on your behalf and you will never know. (...)
There are thousands of tutorials, YouTube videos, and even programming classes at universities and coding boot camps incorrectly teaching new developers to store JWTs in local storage as an authentication mechanism. THIS INFORMATION IS WRONG. If you see someone telling you to do this, run away!"
https://dev.to/rdegges/please-stop-using-local-storage-1i04
The above source goes on to talk about other types of storage, some of which were not mentioned in class:
- cookies
- the IndexedDB API 
- the cache API
*/

/* MAYBE TO DO: merge this with user-defined categories and tasks like in callback-opgave (but the current code seems to work fine)
*/
function saveUserPreferencesByMariePierreLessard() {
    if (document.body.classList.contains("dark-mode-by-Marie-Pierre-Lessard")) {
        localStorage.setItem("Priorilists' colours", "dark");
    } else {
        localStorage.removeItem("Priorilists' colours", "dark");
    };
};

function createEmptyDataSetByMariePierreLessard() {
    localStorage.setItem("Priorilists' to-dos", JSON.stringify(userDataArrayByMariePierreLessard));
    // Checked with: 
    console.log(userDataArrayByMariePierreLessard);
    displayGetStartedByMariePierreLessard(userDataArrayByMariePierreLessard);
};

function fetchLocalStorageByMariePierreLessard() {
    validateLocalStorageByMariePierreLessard(savedUserDataByMariePierreLessard);
};

/* This is for task names. */
function validateTaskNameByMariePierreLessard(input) {
    const validTaskNameByMariePierreLessard = /^[a-zA-ZæÆøØåÅ0-9$£%\-+=/*.:;,!?"@( )]{1,255}$/;
    return validTaskNameByMariePierreLessard.test(input);
};

/* This is for task details (line breaks and tabulations are allowed in this one, on top of more characters). */
function validateTaskDetailsByMariePierreLessard(input) {
    const validTaskDetailsByMariePierreLessard = /^[a-zA-ZæÆøØåÅ0-9$£%\-+=/*.:;,!?"@( )\n\t]{1,4000}$/;
    return validTaskDetailsByMariePierreLessard.test(input);
};

/* This is for category names. */
function validateCategoryNameByMariePierreLessard(input) {
    const validCategoryNameByMariePierreLessard = /^[a-zA-ZæÆøØåÅ0-9$£%\-+=/*.:;,!?"@( )]{1,50}$/;
    return validCategoryNameByMariePierreLessard.test(input);
};

btnCreateTaskByMariePierreLessard.addEventListener("click", function createTaskByMariePierreLessard() {
    const taskOriginalNameByMariePierreLessard = document.getElementById("tonByMariePierreLessard");
    const taskOriginalDetailsByMariePierreLessard = document.getElementById("todByMariePierreLessard");
    const taskPriorityLevelByMariePierreLessard = document.getElementById("tlpByMariePierreLessard");

    validateTaskNameByMariePierreLessard(taskOriginalNameByMariePierreLessard.value.trim());
    validateTaskDetailsByMariePierreLessard(taskOriginalDetailsByMariePierreLessard.value);

    if (!validateTaskNameByMariePierreLessard) {
        errorsByMariePierreLessard.push('The task name is required, and it must be between 1 og 255 characters. Only certain special characters are allowed.\n');
    } else {
        const taskToSaveByMariePierreLessard = {
            taskId: "",
            /* TO DO: options for an ID:
             - crypto.randomUUID() (sources: huskeseddel-mc-med-kasper + https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
             - counter like the following (by Wayne at https://stackoverflow.com/questions/5690723/how-should-i-generate-unique-ids-for-a-bunch-of-objects): 
            function generateId(prefix, start) {
                var i = start || 0;
                return function() {
                    return prefix + i++;
                }
            }
            // start the counter at 12
            var id = generateId("symbol_", 12);
            id();
            or the following (by ChaosPandion at https://stackoverflow.com/questions/5690723/how-should-i-generate-unique-ids-for-a-bunch-of-objects)
            function IdGenerator(baseName) {
                this.baseName = "" + baseName;
                this.number = 0;
            }

            IdGenerator.prototype.next = function () {
                return "" + this.baseName + this.number++;
            };

            var gen = new IdGenerator("symbol_")
            for (var i = 0; i < 100; i++) {
                console.log(gen.next());
            }
             - Symbol() (sources/comments: but the methods taught to us probably won't work considering the following: "Ensure Privacy: Symbol keys are not accessible through standard object iteration methods like for…in, making them ideal for creating private or internal properties that should not be exposed." https://medium.com/@sujithakumars/javascript-symbols-the-key-to-unique-identifiers-1c5563965da7 + "Enumerable properties are those properties whose internal enumerable flag is set to true, which is the default for properties created via simple assignment or via a property initializer. Properties defined via Object.defineProperty and such are not enumerable by default. Most iteration means (such as for...in loops and Object.keys) only visit enumerable keys." https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties)
             */
            priorityLevel: "",
            categoryName: "",
            taskName: "",
            taskDetails: ""
        };

        // taskPriorityLevelByMariePierreLessard.value = taskToSaveByMariePierreLessard.priorityLevel

        /* TO DO: save name and priority level, probably with push(), 
        in the right location of the right array depending on select-menu selection:
topPriorityArrayByMariePierreLessard 
planningArrayByMariePierreLessard 
InterruptionArrayByMariePierreLessard 
distractionArrayByMariePierreLessard 
         */
        /* TO DO: 
        save future position of category in matrix:
        the sections in the DOM are identified by 4 variables (constants) called topPrioritySectionByMariePierreLessard, planningSectionByMariePierreLessard, InterruptionSectionByMariePierreLessard, and distractionSectionByMariePierreLessard.
        The following values are given to the options in the DOM:
        "I+U"
        "I-U"
        "NI+U"
        "NI-U"
        */
        /* TO DO: the following regex (without the \n\t when there is no text area) is to be called in functions 
        createCategoryByMariePierreLessard() (in progress)
        editCategoryByMariePierreLessard()
        createTaskByMariePierreLessard()
        editTaskByMariePierreLessard()
        
                Regular expression with forbidden characters or with only characters allowed.
                Browsers must be fault-tolerant with some regular expressions because I should have put one escape-sequence prefix (the backslash) before character - inside of the bracket list for my textarea regex from the grundforløb. Only 4 characters need to be preceded by a backslash inside of a bracket list. More require the backslash outside of bracket list.
                See: https://www3.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
                */
        /* Global Goals/Kryb/La Cuisine/Spicy's textarea validation, edited 
        (note that French diacritics are not allowed by this regex):

        THIS NEEDS TO BE REUSED
1) Already defined in global scope:           let errorsByMariePierreLessard = [];

3 regular expressions like this one already defined in global scope (the following was a draft):
    function validateOutgoingUserDataByMariePierreLessard(input) {
        const validOutgoingUserDataByMariePierreLessard = /^[a-zA-ZæÆøØåÅ0-9$£%\-+=/*.:;,!?"@()\n\t]{1,4000}$/;
        return validOutgoingUserDataByMariePierreLessard.test(input);
    };

2)  PARTIALLY DONE/TO DO: edit source of data
    if (!validateOutgoingUserData(form.message.value)) {
        errorsByMariePierreLessard.push('Din besked må kun indeholde visse specieltegn for at være gyldig (f.eks. "()-:;.,!?%@). Beskeden må desuden ikke være længere end 4000 karakterer.\n');
    };
    
3)  NOT DONE:
    if (errorsByMariePierreLessard.length > 0) {
        console.log('Number of errors: ', errorsByMariePierreLessard.length);
        let msgByMariePierreLessard = 'The following errors were found: \n\n';
        for (let i = 0; i < errorsByMariePierreLessard.length; i++) {
            msg += errorsByMariePierreLessard[i];
        };
        alert(msgByMariePierreLessard);
        return false;
    };
*/

    };
});

btnEditTaskByMariePierreLessard.addEventListener("click", function editTaskByMariePierreLessard() {
    const newTaskNameByMariePierreLessard = document.getElementById("ntnByMariePierreLessard");
    const newTaskDetailsByMariePierreLessard = document.getElementById("ntdByMariePierreLessard");

    validateTaskNameByMariePierreLessard(newTaskNameByMariePierreLessard.value.trim());
    validateTaskDetailsByMariePierreLessard(newTaskDetailsByMariePierreLessard.value);

    /* TO DO: reuse code from createTaskByMariePierreLessard() */
});

btnCreateCategoryByMariePierreLessard.addEventListener("click", function createCategoryByMariePierreLessard() {
    const catOriginalNameByMariePierreLessard = document.getElementById("conByMariePierreLessard");
    const catPriorityLevelByMariePierreLessard = document.getElementById("clpByMariePierreLessard");

    validateCategoryNameByMariePierreLessard(catOriginalNameByMariePierreLessard.value.trim());

    if (!validateCategoryNameByMariePierreLessard) {
        errorsByMariePierreLessard.push('The category name is required, and it must be between 1 og 50 characters. Only certain special characters are allowed.\n');
    } else {
        /* TO DO */
        const categoryToSaveByMariePierreLessard = {
            categoryId: "",
            priorityLevel: "",
            categoryName: "",
            categoryTasks: [] // TO DO should I create an empty task array and display 1 task under category after creation of category?
        };

        // catPriorityLevelByMariePierreLessard.value = categoryToSaveByMariePierreLessard.priorityLevel ??
    };
});

btnEditCategoryByMariePierreLessard.addEventListener("click", function editCategoryByMariePierreLessard() {
    const newCategoryNameByMariePierreLessard = document.getElementById("ncnByMariePierreLessard");

    validateCategoryNameByMariePierreLessard(newCategoryNameByMariePierreLessard.value.trim());

    /* TO DO: reuse code from createCategoryByMariePierreLessard() */
});

/* #endregion about model code */

/* #region VIEW CODE */

/* This dark-to-light-mode switch did not work in my first attempts. 
Applying this function to the HTML element (root element) instead of body does NOT work. I don't know why. */
btnToggleColourSchemeByMariePierreLessard.addEventListener("click", function toggleColourSchemeByMariePierreLessard() {
    document.body.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    // Alternatively: 
    // const bodyElementByMariePierreLessard = document.body;
    // bodyElementByMariePierreLessard.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    saveUserPreferencesByMariePierreLessard();
});

btnOpenCategoryCreationModalByMariePierreLessard.addEventListener("click", function openCategoryCreationModalByMariePierreLessard() {
    categoryCreationModalByMariePierreLessard.showModal();
});

btnCloseCategoryCreationModalByMariePierreLessard.addEventListener("click", function closeCategoryCreationModalByMariePierreLessard() {
    categoryCreationModalByMariePierreLessard.close();
});

btnOpenCategoryEditingAndDeletionModalByMariePierreLessard.addEventListener("click", function openCategoryEditingAndDeletionModalByMariePierreLessard() {
    categoryEditingAndDeletionModalByMariePierreLessard.showModal();
});

btnCloseCategoryEditingAndDeletionModalByMariePierreLessard.addEventListener("click", function closeCategoryEditingAndDeletionModalByMariePierreLessard() {
    categoryEditingAndDeletionModalByMariePierreLessard.close();
});

btnOpenTaskCreationModalByMariePierreLessard.addEventListener("click", function openTaskCreationModalByMariePierreLessard() {
    taskCreationModalByMariePierreLessard.showModal();
});

btnCloseTaskCreationModalByMariePierreLessard.addEventListener("click", function closeTaskCreationModalByMariePierreLessard() {
    taskCreationModalByMariePierreLessard.close();
});

btnOpenTaskEditingAndDeletionModalByMariePierreLessard.addEventListener("click", function openTaskEditingAndDeletionModalByMariePierreLessard() {
    taskEditingAndDeletionModalByMariePierreLessard.showModal();
});

btnCloseTaskEditingAndDeletionModalByMariePierreLessard.addEventListener("click", function closeTaskEditingAndDeletionModalByMariePierreLessard() {
    taskEditingAndDeletionModalByMariePierreLessard.close();
});


/* V */
/* TO DO: 
function displayDataSetByMariePierreLessard();
follows validateLocalStorageByMariePierreLessard() and
displayGetStartedByMariePierreLessard() 

It is best to tolerate the error 
ReferenceError: displayDataSetByMariePierreLessard is not defined 
instead of trying to put sth temporary in the function 
because the validation function issued an error message as soon as I create an incomplete 
displayDataSetByMariePierreLessard(), at least on the first day.
On the second day, I didn't get any error when I wrote the following to get an explanation from Kasper
*/
function displayDataSetByMariePierreLessard() {
    console.log("Hello, I am a function holding the data found in local storage!");

};
/* maybe use switch instead 
    This was based on the model in Kasper's huskeseddel masterclass.
    However, the recipe in callback-opgave is better. 
displayDataSetByMariePierreLessardTest();
console.log(displayDataSetByMariePierreLessardTest);
function displayDataSetByMariePierreLessardTest() {
    if (savedUserDataByMariePierreLessard.topPriorityArrayByMariePierreLessard. ??) {
        createInput(objData);
    };
};
*/

/* #endregion about view code */

/* #region CONTROLLER CODE */

/* C */
window.onload = appLoadingByMariePierreLessard();

/* C */
function appLoadingByMariePierreLessard() {
    /* This applies the colour theme previously chosen by user (M->C->V). */
    applyUserPreferencesByMariePierreLessard();
    /* This starts the loading flow (M->C->V). */
    fetchLocalStorageByMariePierreLessard();
};

/* C */
function applyUserPreferencesByMariePierreLessard() {
    let colourSchemeByMariePierreLessard = localStorage.getItem("Priorilists' colours");
    if (colourSchemeByMariePierreLessard) {
        document.body.classList.add("dark-mode-by-Marie-Pierre-Lessard");
    };
};

/* C */
function validateLocalStorageByMariePierreLessard() {
    if (!savedUserDataByMariePierreLessard) {
        createEmptyDataSetByMariePierreLessard();
        // Checked: console.log("No user data in local storage");
    } else {
        // Checked: console.log("There is user data in local storage");

        /* First step: validate the data found in local storage 
        Q: What is the point of doing that? The validation of forms with reg. ex. happens on submit...
        A1: "occasionally, we encounter situations where users dive into developer tools, make manual changes to local storage, and then claim the app is "broken." (...)
         - Corrupted data: Changing or removing keys can break dependencies within the app.
         - Invalid states: The app might expect specific values or formats. Manual edits can cause the app to encounter unexpected inputs.
         - Security risks: In some cases, overwriting local storage with malicious values could expose vulnerabilities (if the app doesn’t sanitize inputs). (...)
        While user tampering isn’t your fault, there are steps you can take to minimize the impact of such actions:
-->      1. Validate Local Storage Data: Always validate and sanitize data retrieved from local storage before using it in your app. For instance, check if required keys exist and if values are in the correct format. (...)
-->      - Detect Tampering (If Feasible): While it’s not foolproof, you could implement basic checks to detect tampering. For example, store a hash of critical values and verify it during app initialization."
        https://corner.buka.sh/dont-blame-the-app-understanding-local-storage-tampering/
        A2: "Local Storage Vulnerabilities:
         1. Cross-Site Scripting (XSS): If user input stored in local storage is retrieved and displayed on web pages without proper sanitization, it can lead to XSS vulnerabilities. Attackers can inject malicious scripts into the local storage, which when retrieved and executed on other users’ browsers, can lead to session hijacking, data theft, or other malicious actions.
         2. Insecure Direct Object References (IDOR): Storing sensitive data in local storage without proper access controls can lead to IDOR vulnerabilities. Attackers may manipulate the data stored in local storage to access unauthorized resources or escalate privileges.
         3. Data Leakage: Storing sensitive information such as authentication tokens or user credentials in local storage without encryption or proper security measures can lead to data leakage vulnerabilities. Attackers with access to the local storage may extract this information and misuse it for unauthorized access or identity theft.
         4. Lack of Secure Communication: Local storage is susceptible to man-in-the-middle (MITM) attacks if data stored in it is transmitted over insecure channels. Attackers can intercept communication between the client and server, tamper with the data stored in local storage, or inject malicious content, compromising the integrity and confidentiality of the data. (...)
         Prevent injection attacks by thoroughly validating and sanitizing input data before storing it in JSON format. Input validation helps mitigate risks associated with SQL injection, cross-site scripting (XSS), and other injection-based attacks, ensuring the integrity of the stored data."
        https://fdzdev.medium.com/storing-accessing-and-displaying-json-data-in-local-storage-pe-d4ef8e509e31 
        */
        /*
        Rejected option: use the PHP htmlentities() to escape HTML characters. This apparently will only work if the backend uses PHP. 
        Sources: 
        https://fdzdev.medium.com/storing-accessing-and-displaying-json-data-in-local-storage-pe-d4ef8e509e31
        https://www.w3schools.com/php/func_string_htmlentities.asp
        https://www.w3schools.com/php/func_string_html_entity_decode.asp (Probably not intended to be used in the current situation any injected code would be run.)
        "The htmlentities( ) and htmlspecialchars( ) in PHP both convert special characters to their HTML entities, but 'htmlspecialchars()' only converts characters that have special meaning in HTML, while 'htmlentities( )' converts a broader range of characters."
        https://www.geeksforgeeks.org/php/htmlentities-vs-htmlspecialchars-function-in-php/
        */
        /* TO DO: the following forbids any character that is not in the bracket list, such as <> in <script>. However, it does not make sure that the various types of brackets are in the right sequence, i.e. it does not verify that the structure of the string is correct. 
        It is just a start because I am not sure that I can get everything done by the deadline. */
        /* Edited version of textarea validation from Global Goals/Kryb/La Cuisine/Spicy assignments.  
        (Note that French diacritics are not allowed by this regex.) */

        function validateIncomingUserDataByMariePierreLessard(data) {
            /* This bracket list has to include characters (brackets) that aren't in the constants for individual fields. Its length is limited by the capacity of the typical local storage when the encoding UTF-8 is used. */
            /* The space between the parentheses is not a mistake: it is a space! I also could have used \s, which encompasses several types of whitespace, but I wanted stronger constraints. */
            const validIncomingUserDataByMariePierreLessard = /^[a-zA-ZæÆøØåÅ0-9$£%\-+=/*.:;,!?"@( )[\]{}\n\t]{1,2500000}$/;
            return validIncomingUserDataByMariePierreLessard.test(data);
        };

        // This sends valid data to displayDataSetByMariePierreLessard()  
        if (validateIncomingUserDataByMariePierreLessard(savedUserDataByMariePierreLessard)) {
            displayDataSetByMariePierreLessard();
        } else {
            /* This saves a valid (empty) data set to local storage if the incoming user data does not pass the validation test, i.e. it replaces the invalid data by valid data (an empty data set). 
            I didn't use createEmptyDataSetByMariePierreLessard(); because it makes the get-started div reappear after 1st use!
            */
            errorsByMariePierreLessard.push('Corrupt user data in local storage. Tampering may have occurred. The corrupt data was deleted.\n');
            // This overwrites the corrupt data.
            localStorage.setItem("Priorilists' to-dos", JSON.stringify(userDataArrayByMariePierreLessard));
            // Checked with: console.log(userDataArrayByMariePierreLessard);
            displayDataSetByMariePierreLessard();

            /* Notes on flaw in my flowchart for the loading flow.
            I corrected the code description, but not the flowchart. 
            TO DO: edit flowchart if time allows.
            Replacing the following line byt the setItem() method stopped the get-started div from reappearing every time the page was refreshed.
            createEmptyDataSetByMariePierreLessard();
            However, I got the custom error message on later visits even though my regex was fine (I had tested it earlier).
            The error disappeared once I added displayDataSetByMariePierreLessard(); instead of createEmptyDataSetByMariePierreLessard(); 
            I also tried with fetchLocalStorageByMariePierreLessard(); but then I got an infinite loop ("RangeError: Maximum call stack size exceeded").
            It must have been caused by the lack of a function to send the data to the next function
            (JavaScript being a single-threaded language).
            */
        };

        if (errorsByMariePierreLessard.length > 0) {
            console.log('Number of errors: ', errorsByMariePierreLessard.length);
            let msgByMariePierreLessard = 'The following errors were found: \n\n';
            for (let i = 0; i < errorsByMariePierreLessard.length; i++) {
                msg += errorsByMariePierreLessard[i];
            };
            alert(msgByMariePierreLessard);
            return false;
        };
        /* Checked with valid data and invalid data. */
    };
};

/* #endregion about controller code */
