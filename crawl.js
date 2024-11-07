function normalizeURL(urlString) {
    let urlObj = new URL(urlString)
    let hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === `/`) { 
        return hostPath.slice(0, -1) // for removing `/` in URL
    }
    return hostPath
}

module.exports = {
    normalizeURL
}