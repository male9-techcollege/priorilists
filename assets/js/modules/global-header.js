const helpModalByMariePierreLessard = document.getElementById("helpModalByMariePierreLessard");

/* In order to be able to export/import this function, I had to give it a name. 
btnOpenHelpModalByMariePierreLessard.addEventListener(...) cannot be exported.

Alternative export syntax: a list at the end of the module.
"function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

export { add, subtract };"
https://www.w3schools.com/nodejs/nodejs_modules_esm.asp
*/
export default function openHelpModalByMariePierreLessard() {
    helpModalByMariePierreLessard.showModal();
};

export function closeHelpModalByMariePierreLessard() {
    helpModalByMariePierreLessard.close();
};
