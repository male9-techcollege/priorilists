/* Potential references in school work/materials: 
hf-websider/huskeseddel-mc-med-kasper
hf-websider/template-strings-mc-with-kasper and github/template-strings-codelab
github/callback-opgave (it mixes user preferences and to-do lists in one string saved to local storage)
USED: github/datastruktur-opgave and earlier localStorage-opgave
USED: gf-websider/dark-mode-sandbox-... (to-do apps and dark mode with local storage)
*/

/* Methods to use:
- setItem(), getItem(), removeItem(), but not clear() unless I want to add that kind of functionality to the app 
- probably also: key() ("This method is particularly useful when you need to enumerate all stored items without knowing their keys in advance." https://strapi.io/blog/how-to-use-localstorage-in-javascript) 
*/

/* Script with MVC architecture (required for this assignment) 
Table of contents: 
View (because variables are mostly view code, and they should be at the top of the script)
Model
Controller */

/* #region VIEW CODE */

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

/* This dark-to-light-mode switch did not work in my first attempts. 
Applying this function to the HTML element (root element) does NOT work. I don't know why. */
function toggleColourSchemeByMariePierreLessard() {
    document.body.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    // Alternatively: 
    // const bodyElementByMariePierreLessard = document.body;
    // bodyElementByMariePierreLessard.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    saveUserPreferencesByMariePierreLessard();
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

/* PROBABLY TO DO: To merge this with user-defined categories and tasks, see callback-opgave
Also: probably change function names to match GitHub plan after the merge. 
I just wanted to make this work now to close the GitHub issue. */
function saveUserPreferencesByMariePierreLessard() {
    if (document.body.classList.contains("dark-mode-by-Marie-Pierre-Lessard")) {
        localStorage.setItem("Priorilists' colours", "dark");
    } else {
        localStorage.removeItem("Priorilists' colours", "dark");
    };
};

/* #endregion about model code */

/* #region CONTROLLER CODE */

window.onload = applyUserPreferencesByMariePierreLessard(); 
function applyUserPreferencesByMariePierreLessard() {
    let colourSchemeByMariePierreLessard = localStorage.getItem("Priorilists mode");
    if (colourSchemeByMariePierreLessard) {
        document.body.classList.add("dark-mode-by-Marie-Pierre-Lessard");
    };
};

/* #endregion about controller code */

