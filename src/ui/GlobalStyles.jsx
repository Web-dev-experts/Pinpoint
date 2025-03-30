import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --main-color-red: #A82929;
        --main-color-blue: #2661A0;
        --main-color-black: #0E0E0E;
        --secondary-color-red:#7F2222;
        --secondary-color-blue: #348EEF;
        --secondary-color-black: #000000;

        --main-gradient: linear-gradient(to right, 
                        var(--main-color-red) 0%, 
                        var(--secondary-color-red) 25%, 
                        var(--main-color-black) 50%, 
                        var(--secondary-color-blue) 65%, 
                        var(--main-color-blue) 90%,
                        var(--main-color-red) 100% );
        --secondary-gradient: linear-gradient(to right, var(--main-color-red), var(--main-color-black) ,var(--main-color-blue));
        --third-gradient: linear-gradient(to right, var(--main-color-red), var(--main-color-blue),  var(--main-color-red));

        --main-font: "Lexend" sans-serif;

        --fs-5xl: 120px;
        --fs-4xl: 96px;
        --fs-3xl: 64px;
        --fs-2xl: 48px;
        --fs-l: 36px;
        --fs-m: 30px;
        --fs-s: 20px;

        --main-padding-btn: 25px 12px;
        --main-padding-btn: 20px 10px;
        --main-padding-btn: 14px 7px;
        --main-padding-btn: 10px 5px;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        font-family: "Lexend", sans-serif;;
        color: #ffffff;
    }

    a {
        text-decoration: none;
        color:  #ffffff;
    }

    /* Style the entire popup */
.custom-popup-container {
  background: var(--main-color-black); /* Dark background */
  border-radius: 10px;
  color: white;
  padding: 10px;
  text-align: center;
  border: none;
}

/* Ensure the popup content takes up the whole space */
.custom-popup {
  width: 100%;
  height: 100%;
}

/* Override Leaflet’s default styles */
.leaflet-popup-content-wrapper {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 8px !important;
}

.button {
  flex: 1;
  padding: 15px 20px;
  border: none;
  outline: none;
  font-size: 24px;
  letter-spacing: 3px;
  border-radius: 5px;
  overflow: hidden;
  border-radius: 15px;
  transition: 1s ease-in-out;
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 15px;
    padding: 5px;
    background: var(--main-gradient);
    background-size: 250% 100%;
    background-position: 50% 50%;
    transition: 1s ease-in-out;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }
  &:hover::before {
    background-position: 100% 50%;
  }
}


`;
