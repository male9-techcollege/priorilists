/* Variables for dynamic message with instructions to new users */
export const introMsgContainerByMariePierreLessard = document.getElementById("introMsgByMariePierreLessard");
const introMsgByMariePierreLessard = `To get started, click on an icon to either add a task category <span class="align-svg-with-text-by-Marie-Pierre-Lessard"><span>(</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/></svg><span>)</span></span> or a task <span class="align-svg-with-text-by-Marie-Pierre-Lessard"><span>(</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg><span>)</span></span>.`;

/* View code */
/* The function displayGetStartedByMariePierreLessard() {};
follows createEmptyDataSetByMariePierreLessard() */
export default function displayGetStartedByMariePierreLessard() {
    /* If the class is in the DOM, the div is always visible because of the padding. */
    introMsgContainerByMariePierreLessard.classList.add("intro-msg-by-Marie-Pierre-Lessard");
    introMsgContainerByMariePierreLessard.innerHTML = introMsgByMariePierreLessard;
    displayDataSetByMariePierreLessard();
};

