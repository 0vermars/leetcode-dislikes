// get title slug
const currentUrl = window.location.href
const splits = currentUrl.split('/')
const titleSlug = splits[4]

// construct request to get dislike count
const leetcodeGraphql = 'https://leetcode.com/graphql/'
const request = {
  "query":"\n    query questionTitle($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    titleSlug\n   dislikes\n  }\n}\n    ",
  "variables":{"titleSlug":titleSlug},
  "operationName":"questionTitle"
};

// get dislike count
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('POST', leetcodeGraphql);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function () {
  const dislikes = xhr.response.data.question.dislikes

  setTimeout(() => {
    // find thumb down element then append dislike count
    const thumbDownSvg = document.querySelector('[data-icon="thumbs-up"]')

    const element = document.createElement('div')
    element.innerHTML = (dislikes * 1.0 / 1000).toFixed(1) + 'K'

    const thumbDown = thumbDownSvg.parentElement.parentElement.nextSibling.nextSibling
    thumbDown.appendChild(element)
  }, 500);
};

xhr.send(JSON.stringify(request));