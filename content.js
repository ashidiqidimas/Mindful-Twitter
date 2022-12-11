// Change this constant to configure how many tweet before you will be ask to do a mindful session.
// P.S This is just an approximate value. Btw, 80-100 is the sweet range
const TWEET_CELL_OFFSET = 10; // I set 10 so you can see the effect easily. Feel free to change it to whatever value that you want

let averageCellHeight;
let isPopUpShowed = false;
let popUp;

const addScrollListener = () => {
    let cellRemaining = TWEET_CELL_OFFSET;
    window.addEventListener("scroll", async () => {
        let scroll = this.scrollY;
        if (scroll / averageCellHeight > cellRemaining) {
            cellRemaining += TWEET_CELL_OFFSET;
            if (isPopUpShowed === false) await showPopUp();
        }
    });
};

// Wait until finishes rendering, then mount the `addScrollListener` function
const observer = new MutationObserver(() => {
    addScrollListener();
    // Disconnect the observer when React has finished rendering
    const tweetCells = document.querySelectorAll(
        '[data-testid="cellInnerDiv"]'
    );
    if (tweetCells[0]) {
        averageCellHeight = getAverageCellHeight(tweetCells);
        observer.disconnect();
    }
});

observer.observe(document.body, { subtree: true, childList: true });
createModalpopup();
hidePopUp();

async function createModalpopup() {
    const newPopUp = document.createElement("DIV");
    newPopUp.id = "div";
    popUp = newPopUp;

    newPopUp.setAttribute(
        "style",
        "height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; background-color: #E8DCCC; z-index: 9999 !important; transition: opacity 0.35s linear; display: flex; flex-direction: column; align-items: center; justify-content: center;"
    );

    document.body.appendChild(newPopUp);

    // Mindfullness Container
    const mindfulnessContainer = document.createElement("DIV");
    mindfulnessContainer.setAttribute(
        "style",
        "text-align: center; display: none; flex-direction: column; align-items: center; padding: 0 10%; transition: opacity 0.2s linear; opacity: 0;"
    );
    newPopUp.appendChild(mindfulnessContainer);

    // Circle animation
    const circleContainer = document.createElement("DIV");
    circleContainer.setAttribute(
        "style",
        "height: 280px; width: 280px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center;"
    );
    mindfulnessContainer.appendChild(circleContainer);
    const circle = document.createElement("DIV");
    circle.setAttribute(
        "style",
        "height: 20%; width: 20%; background-color: #EBA093; border-radius: 1000px; transition: all 4s ease-in-out"
    );
    circleContainer.appendChild(circle);

    // Inhale
    const inhaleContainer = document.createElement("P");
    inhaleContainer.setAttribute(
        "style",
        "font-size: 20px; font-family: sans-serif; transition: opacity 0.15s linear"
    );
    const inhaleText = document.createTextNode("Breathe in..");
    inhaleContainer.appendChild(inhaleText);
    mindfulnessContainer.appendChild(inhaleContainer);

    // Exhale
    const exhaleContainer = document.createElement("P");
    exhaleContainer.setAttribute(
        "style",
        "font-size: 20px; font-family: sans-serif; display: none; opacity: 0; transition: opacity 0.15s linear"
    );
    const exhaleText = document.createTextNode("Breathe out..");
    exhaleContainer.appendChild(exhaleText);
    mindfulnessContainer.appendChild(exhaleContainer);

    // Option Container
    const optionsContainer = document.createElement("DIV");
    optionsContainer.id = "optionContainer";
    optionsContainer.setAttribute(
        "style",
        "margin: auto 0; text-align: center; display: flex; flex-direction: column; align-items: center; padding: 0 10%; transition: opacity 0.2s linear;"
    );

    newPopUp.appendChild(optionsContainer);

    const heading = document.createElement("H1");
    const headingText = document.createTextNode(
        "You've scrolled for a while, do you want to do a short mindfulness session?"
    );
    heading.appendChild(headingText);

    heading.setAttribute("style", "color: #373234;");

    optionsContainer.appendChild(heading);

    // Configuring the start button
    const startButton = document.createElement("button");
    const startText = document.createTextNode("Yes, start mindfulness session");
    startButton.appendChild(startText);

    startButton.onclick = () => {
        optionsContainer.style.opacity = "0";

        // wait until the opacity transition finishes
        setTimeout(() => {
            optionsContainer.style.display = "none";
            mindfulnessContainer.style.display = "flex";
            setTimeout(() => {
                mindfulnessContainer.style.opacity = "1";
                inhaleContainer.style.opacity = "1";
                inhaleContainer.style.display = "block";
                exhaleContainer.style.opacity = "0";
                exhaleContainer.style.display = "none";
                // start the breathe animation
                circle.style.height = "100%";
                circle.style.width = "100%";
                setTimeout(() => {
                    inhaleContainer.style.opacity = "0";
                    setTimeout(() => {
                        inhaleContainer.style.display = "none";
                        exhaleContainer.style.display = "block";
                        setTimeout(() => {
                            exhaleContainer.style.opacity = "1";
                            circle.style.height = "20%";
                            circle.style.width = "20%";
                            setTimeout(() => {
                                circle.style.height = "100%";
                                circle.style.width = "100%";
                                exhaleContainer.style.opacity = "0";
                                setTimeout(() => {
                                    exhaleContainer.style.display = "none";
                                    inhaleContainer.style.display = "block";
                                    setTimeout(() => {
                                        inhaleContainer.style.opacity = "1";
                                        setTimeout(() => {
                                            circle.style.height = "20%";
                                            circle.style.width = "20%";
                                            inhaleContainer.style.opacity = "0";
                                            setTimeout(() => {
                                                inhaleContainer.style.display =
                                                    "none";
                                                exhaleContainer.style.display =
                                                    "block";
                                                setTimeout(() => {
                                                    exhaleContainer.style.opacity =
                                                        "1";
                                                    setTimeout(() => {
                                                        hidePopUp();
                                                        setTimeout(() => {
                                                            optionsContainer.style.display =
                                                                "flex";
                                                            optionsContainer.style.opacity =
                                                                "1";
                                                            mindfulnessContainer.style.display =
                                                                "none";
                                                            mindfulnessContainer.style.opacity =
                                                                "0";
                                                        }, 500);
                                                    }, 4100);
                                                }, 150);
                                            }, 250);
                                        }, 4100);
                                    }, 250);
                                }, 150);
                            }, 4100);
                        }, 250);
                    }, 150);
                }, 4100);
            }, 200);
        }, 200);
    };

    optionsContainer.appendChild(startButton);

    // Styling the start button
    startButton.setAttribute(
        "style",
        "margin-top: 40px; border: 1 #373234; height: 64px; width:100%; padding: 0 16px; font-size:20px; cursor: pointer; color: #F3ECE4; background-color: #373234; border-radius: 16px; transition: 0.3s;"
    );

    startButton.addEventListener("mouseover", () => {
        startButton.style.backgroundColor = "#171214";
    });

    startButton.addEventListener("mouseout", () => {
        startButton.style.backgroundColor = "#373234";
    });

    // Configuring the dismiss button
    const dismissButton = document.createElement("button");
    var dismissText = document.createTextNode(
        "No, I'm not in the mood for mindfulness"
    );
    dismissButton.appendChild(dismissText);

    dismissButton.onclick = function remove(btn) {
        hidePopUp();
    };

    optionsContainer.appendChild(dismissButton);

    // Styling the dismiss button
    dismissButton.setAttribute(
        "style",
        "border: 1 #373234; height: 64px; width:100%; padding:0 16px; font-size:20px; cursor: pointer; color: #373234; background-color: #F3ECE4; border-radius: 16px; margin-top: 16px; transition: 0.3s;"
    );

    dismissButton.addEventListener("mouseover", () => {
        dismissButton.style.backgroundColor = "#F8F6F2";
    });

    dismissButton.addEventListener("mouseout", () => {
        dismissButton.style.backgroundColor = "#F3ECE4";
    });
}

async function showPopUp() {
    isPopUpShowed = true;

    const optionContainer = document.getElementById("optionContainer");
    optionContainer.style.display = "flex";

    popUp.style.visibility = "visible";
    popUp.style.opacity = "1";
}

async function hidePopUp() {
    isPopUpShowed = false;

    popUp.style.opacity = "0";

    // We have to wait for the transition to finish before we set visibility to hidden
    setTimeout(() => {
        popUp.style.visibility = "hidden";
    }, 350);
}

// Utils Functions
const getAverageCellHeight = (cells) => {
    let sum = 0;
    cells.forEach((cell) => (sum += cell.offsetHeight));
    return sum / cells.length;
};
