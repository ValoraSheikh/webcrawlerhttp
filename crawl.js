const {JSDOM} = require('jsdom')

async function crawlPage(currentURL) {
    console.log(`actively crawling: ${currentURL}`);
    
    try {
        const resp = await fetch(currentURL);

        if (resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`);
            return
        }

        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`non html response, contenttype: ${contentType} on page ${currentURL}`);
            return
        }



        console.log(await resp.text());
    } catch (error) {
        console.log(`error in fetch: ${error.message}, on page ${currentURL}`);
    }
    
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');

    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === `/`) {
            // Relative
            try {
                let urlObj = new URL (`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with relative url:${error.message}`);
            }
        } else{
            // Absolute
            try {
                let urlObj = new URL (linkElement.href);
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with relative url:${error.message}`);
            }
        }
    }
    return urls;
}

function normalizeURL(urlString) {
    let urlObj = new URL(urlString);
    let hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === `/`) { 
        return hostPath.slice(0, -1) // for removing `/` in URL
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}