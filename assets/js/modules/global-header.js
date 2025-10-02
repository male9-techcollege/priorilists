const helpModalByMariePierreLessard = document.getElementById("helpModalByMariePierreLessard");

/* In order to be able to import this function, I had to give it a name. 
btnOpenHelpModalByMariePierreLessard.addEventListener(...) was sufficient when there only was a window scope. */
export default function openHelpModalByMariePierreLessard() {
    helpModalByMariePierreLessard.showModal();
};

export function closeHelpModalByMariePierreLessard() {
    helpModalByMariePierreLessard.close();
};
