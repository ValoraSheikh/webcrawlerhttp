const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

// Test for `normalize URL` function

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})


test('normalizeURL strip trailing slash ', () => {
    const input = 'https://blog.boot.dev/path/'; // Adding a `/` at end of URL, if user enter it they should get to where they want
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'; // It works correctly because of URL is case sensetive `using new URL in crawl.js`
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

// Test for `getURLsFromHTML` function

test('getURLsFromHTML absolute', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev"> 
            Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    // JSDOM put trailing slash at HTML URL
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/"]; // So output is look like this 
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/path/"> 
            Boot.dev Blog
            </a>
        </body>
    </html>
    `; // This is relative URL so you need to add trailing slash
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"]; // So output is look like this 
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML both', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/"> 
            Boot.dev Blog path 1
            </a>
            <a href="/path2/"> 
            Boot.dev Blog path 2
            </a>
        </body>
    </html>
    `;
    // JSDOM put trailing slash at HTML URL
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/" ]; // So output is look like this 
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalid', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="invalid"> 
            Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = []; // So output is look like this 
    expect(actual).toEqual(expected);
})