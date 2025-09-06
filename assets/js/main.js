/* This dark-to-light-mode switch did not work in my first attempts. 
Applying this function to the HTML element (root element) does NOT work. I don't know why. */
function toggleColourSchemeByMariePierreLessard() {
    document.body.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    /* Alternatively: 
    const bodyElementByMariePierreLessard = document.body;
    bodyElementByMariePierreLessard.classList.toggle("dark-mode-by-Marie-Pierre-Lessard");
    */
};

