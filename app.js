//imports titleCase helper function from package that puts video titles into title case for MLA and Chicago styles
//takes title string, returns formatted string
import { titleCase } from "./node_modules/title-case/dist.es2015/index.js";
var apiKey = config.YOUR_API_KEY;

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", runProgram);
//main program, runs on clicking submit
function runProgram() {
  //retrieves choice of citation style among 3 radio buttons, returns 1, 2, or 3;
  function getStyleChoice() {
    console.log("test");
    let choice = 0;
    let styleRadioButton = document.querySelectorAll(".style-radio-button");
    styleRadioButton.forEach((element) => {
      if (element.checked == true) {
        choice = element.value;
      }
    });
    return choice;
  }

  let urlValueSubmitted = document.getElementById("url-value").value;
  let idValue = urlValueSubmitted.substring(32, 43);
  //async function that calls YouTube API
  fetch(
    "https://youtube.googleapis.com/youtube/v3/videos?id=" +
      idValue +
      "&part=snippet&part=contentDetails&key=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => {
      let youtubeObject = data.items[0].snippet;
      let runTime = data.items[0].contentDetails.duration;
      //creates the citation, returns final string to insert in HTML, takes citationStyle number from radio button and desired URL
      function createCitation(citationStyle, urlValue) {
        if (citationStyle == 1) {
          //APA 1
          let finalCitation =
            youtubeObject.channelTitle +
            ". (" +
            dateFormat(youtubeObject.publishedAt, citationStyle) +
            "). " +
            sentenceCase(youtubeObject.title.toLowerCase()).italics() +
            " [Video]. YouTube " +
            urlValue;
          return finalCitation;
        } else if (citationStyle == 2) {
          //MLA 2
          let finalCitation =
            titleCase(youtubeObject.title) +
            "YouTube, uploaded by " +
            youtubeObject.channelTitle +
            ", ";
          ". (" +
            dateFormat(youtubeObject.publishedAt, citationStyle) +
            "). " +
            '"' +
            titleCase(youtubeObject.title) +
            '"' +
            " [Video]. YouTube " +
            urlValue;

          return finalCitation;

          //“8 Hot Dog Gadgets put to the Test.” YouTube, uploaded by Crazy Russian Hacker, 6 June 2016, www.youtube.com/watch?v=WBlpjSEtELs.
        } else if (citationStyle == 3) {
          //Chicago 3

          let finalCitation =
            '"' +
            titleCase(youtubeObject.title) +
            '." ' +
            youtubeObject.channelTitle +
            ". " +
            dateFormat(youtubeObject.publishedAt, citationStyle) +
            ". Video, " +
            runTimeToReadable(runTime) +
            ". " +
            urlValue +
            ".";

          return finalCitation;
          //“Grammar: Active and Passive Voice.” Purdue OWL. February 1, 2019. Video, 4:22. http://youtu.be/GEP-8lFTKKg.
        }
      }

      /*Formatting helper functions*/
      //Helper function that takes ISO 8601 runtime input string from YouTube API and converts and returns string to human readable time format, e.g., 6:24
      //Won't currently work for videos longer than 1 day
      function runTimeToReadable(str) {
        let arr = str.split("");

        if (arr.indexOf("H") == -1) {
          let minutes = arr
            .slice(arr.indexOf("T") + 1, arr.indexOf("M"))
            .join("");
          let seconds = arr
            .slice(arr.indexOf("M") + 1, arr.indexOf("S"))
            .join("");

          return minutes + ":" + seconds;
        } else {
          let hours = arr
            .slice(arr.indexOf("T") + 1, arr.indexOf("H"))
            .join("");
          let minutes = arr
            .slice(arr.indexOf("H") + 1, arr.indexOf("M"))
            .join("");
          let seconds = arr
            .slice(arr.indexOf("M") + 1, arr.indexOf("S"))
            .join("");

          return hours + ":" + minutes + ":" + seconds;
        }
      }
      //helper function that puts title of video into sentence case, for APA style, takes title string, returns formatted string
      function sentenceCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      //Helper function takes date string from YouTube API and selected citation style number and returns to human readable string
      //appropriate to selected citation style.
      function dateFormat(string, selectedCitationStyle) {
        let parsedMonth = parseInt(string.substring(5, 7), 10);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        if (selectedCitationStyle == 1) {
          return (
            string.substring(0, 4) + //year
            ", " +
            monthNames[parsedMonth - 1] + //month
            " " +
            string.substring(8, 10) //day
          );
        } else if (selectedCitationStyle == 2) {
          return (
            string.substring(8, 10) +
            " " +
            monthNames[parsedMonth - 1] +
            ", " +
            string.substring(0, 4)
          );
        } else if (selectedCitationStyle == 3) {
          return (
            monthNames[parsedMonth - 1] +
            " " +
            +string.substring(8, 10) +
            ", " +
            string.substring(0, 4)
          );
        }
      }

      let citationHolder = document.getElementById("citation-holder");

      citationHolder.innerHTML =
        "Your citation is: " +
        createCitation(getStyleChoice(), urlValueSubmitted);
    }).catch(error => {
        console.log(error);
      });;
}
