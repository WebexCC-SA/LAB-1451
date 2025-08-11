// docs/js/custom_highlights.js

// This function will handle the dynamic highlighting
function applyCustomHighlights() {
    // Original sessionStorage logic (keep this as is)
    // This part seems to be related to other functionality you have
    Object.keys(sessionStorage).forEach(key => {
        Array.from(document.getElementsByClassName(key)).forEach((element) => {
            element.innerHTML = sessionStorage.getItem(key);
        });
    });

    // Define the mapping between your custom tags and the CSS classes
    const highlightTags = {
        'highlight_0': 'custom-highlight-0',
        'highlight_1': 'custom-highlight-1',
        'highlight_2': 'custom-highlight-2',
        'highlight_3': 'custom-highlight-3',
        'highlight_4': 'custom-highlight-4',
        'highlight_5': 'custom-highlight-5',
        'highlight_6': 'custom-highlight-6',
        'highlight_7': 'custom-highlight-7' 
    };

    // Iterate over each custom tag type
    for (const tagName in highlightTags) {
        const className = highlightTags[tagName]; // Get the CSS class name for the current tag
        // Get all elements with the current custom tag name (e.g., <highlight_1>)
        // Array.from is used to convert the live HTMLCollection to a static Array
        // so that modifications during iteration don't cause issues.
        const elements = Array.from(document.getElementsByTagName(tagName));

        elements.forEach(el => {
            // Create a new <span> element
            const span = document.createElement('span');
            // Add the corresponding CSS class to the new <span>
            span.classList.add(className);
            // Copy the original content from inside the custom tag to the new <span>
            span.innerHTML = el.innerHTML;

            // Replace the custom tag element with the newly created <span> element
            // Ensure the parentNode exists before attempting to replace
            if (el.parentNode) {
                el.parentNode.replaceChild(span, el);
            }
        });
    }

    // Original 'copy' tag logic (keep this as is)
    // This part handles click events for elements with the tag <copy>
    Array.from(document.getElementsByTagName("copy")).forEach(el => {
        el.addEventListener("click", function (event) {
            if (event.target.tagName === "COPY") {
                navigator.clipboard.writeText(event.target.innerText);
            }
            if (event.target.tagName === "W") { // Assuming 'W' is a nested tag within 'copy'
                navigator.clipboard.writeText(event.target.parentNode.innerText);
            }
        });
    });
}

// Ensure the highlighting function runs after the entire HTML document has been loaded and parsed.
// This is crucial because the script needs to find and manipulate elements that exist on the page.
document.addEventListener('DOMContentLoaded', applyCustomHighlights);

// Your existing setValues function (keep this as is)
function setValues() {
    document.querySelector("#info").querySelectorAll("input").forEach((input) => {
        sessionStorage.setItem(input.name, input.value);
    });
    // Prevent default form submission if this is part of a form
    // Note: 'event' should be passed as a parameter to setValues(event) if used in an event listener
    if (typeof event !== 'undefined' && event.preventDefault) {
        event.preventDefault();
    }
    // Re-run the highlight logic in case new content is added/modified
    applyCustomHighlights();
}