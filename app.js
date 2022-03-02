import { titleCase } from "./node_modules/title-case/dist.es2015/index.js";
var apiKey = config.YOUR_API_KEY;
fetch(
  "https://youtube.googleapis.com/youtube/v3/videos?id=Qi6UF2KfNac&part=snippet&part=contentDetails&key=" + apiKey
)
  .then((response) => response.json())
  .then((data) => {
    let youtubeObject = data.items[0].snippet;
    let runTime = data.items[0].contentDetails.duration;
    function createCitation(citationStyle, urlValue) {
      function sentenceCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

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
          " [Video]. YouTube "; // + urlValue;

        return finalCitation;

        //“8 Hot Dog Gadgets put to the Test.” YouTube, uploaded by Crazy Russian Hacker, 6 June 2016, www.youtube.com/watch?v=WBlpjSEtELs.
      } else if (citationStyle == 3) {
        //Chicago 3

        let finalCitation =
          '"' + titleCase(youtubeObject.title) +
          '." '  +
          youtubeObject.channelTitle +
          ". "
         +
          dateFormat(youtubeObject.publishedAt, citationStyle) +
          ". Video, " +
           runTimeToReadable(runTime) +
          '. ' 
         // + urlValue + "."

        return finalCitation;
        //“Grammar: Active and Passive Voice.” Purdue OWL. February 1, 2019. Video, 4:22. http://youtu.be/GEP-8lFTKKg.
      }
    }

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
        let hours = arr.slice(arr.indexOf("T") + 1, arr.indexOf("H")).join("");
        let minutes = arr
          .slice(arr.indexOf("H") + 1, arr.indexOf("M"))
          .join("");
        let seconds = arr
          .slice(arr.indexOf("M") + 1, arr.indexOf("S"))
          .join("");

        return hours + ":" + minutes + ":" + seconds;
      }
    }

    function dateFormat(string, selectedCitationStyle) {
      let stringy = string.substring;

      var parsedMonth = parseInt(string.substring(5, 7), 10);
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
          monthNames[parsedMonth] + //month
          " " +
          string.substring(8, 10) //day
        );
      } else if (selectedCitationStyle == 2) {
        return (
          string.substring(8, 10) +
          " " +
          monthNames[parsedMonth] +
          ", " +
          string.substring(0, 4)
        );
      } else if (selectedCitationStyle == 3) {
        return (
            monthNames[parsedMonth]+
          " " +
          + string.substring(8, 10)+
          ", " +
          string.substring(0, 4) 
         
        );
      }
    }
    let citationHolder = document.getElementById("citation-holder");
    citationHolder.innerHTML = "Your citation is: " + createCitation(2);
  });


/* function titleCaseBasic(string) {
          str = string.toLowerCase()
                   .split(' ')
                   .map(function(word) {
                       console.log(word);
              if (word.length < 3) { return word.charAt(0)+ word.slice(1);
              }  else { return word.charAt(0).toUpperCase() + word.slice(1);}
        });
        console.log(str);
         return str.join(' ');
                 titleCase("Here's Why the 2017 Acura NSX Is Better Than You Think example.");
 
        }*/

let testData = {
  kind: "youtube#videoListResponse",
  etag: "EppOzvwy-RJMMNeYus0IV3Q4pak",
  items: [
    {
      kind: "youtube#video",
      etag: "GhUFVL45M5uU2LvUE_OhDb5z02c",
      id: "Qi6UF2KfNac",
      snippet: {
        publishedAt: "2017-05-23T15:59:14Z",
        channelId: "UCsqjHFMB_JYTaEnf_vmTNqg",
        title: "Here's Why the 2017 Acura NSX Is Better Than You Think",
        description:
          "CHECK OUT CARS & BIDS\nhttp://carsandbids.com\n\nThe 2017 Acura NSX is expensive -- it starts at $156,000, and some 2017 NSX models cost well over $200,000. But it's better than you think, even for that high price tag -- and here's why.\n\nFOLLOW ME!\nFacebook - http://www.facebook.com/ddemuro\nTwitter - http://www.twitter.com/dougdemuro\nInstagram - http://www.instagram.com/dougdemuro",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Qi6UF2KfNac/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Qi6UF2KfNac/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Qi6UF2KfNac/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/Qi6UF2KfNac/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/Qi6UF2KfNac/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Doug DeMuro",
        tags: [
          "acura nsx",
          "2017 nsx",
          "new nsx",
          "new acura nsx",
          "2017 acura nsx",
          "acura nsx hybrid",
          "nsx hybrid",
          "nsx price",
          "nsx cost",
          "new nsx price",
          "nsx features",
          "doug demuro",
          "demuro",
        ],
        categoryId: "2",
        liveBroadcastContent: "none",
        localized: {
          title: "Here's Why the 2017 Acura NSX Is Better Than You Think",
          description:
            "CHECK OUT CARS & BIDS\nhttp://carsandbids.com\n\nThe 2017 Acura NSX is expensive -- it starts at $156,000, and some 2017 NSX models cost well over $200,000. But it's better than you think, even for that high price tag -- and here's why.\n\nFOLLOW ME!\nFacebook - http://www.facebook.com/ddemuro\nTwitter - http://www.twitter.com/dougdemuro\nInstagram - http://www.instagram.com/dougdemuro",
        },
      },
    },
  ],
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1,
  },
};
