/** ******************************
 *   File: book_search.js
 *   Applicant: Nathan Storey
 *   Date: 12/8/23
 *  ******************************
 * 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    // Checks to make sure searchTerm is not empty
    if (typeof searchTerm !== 'string' || searchTerm.trim() === '') {
        return { error: 'Search term must not be empty.'};
    }

    // Checks if scannedTextObj is a JSON object
    if (typeof scannedTextObj !== 'object' ||  scannedTextObj === null || scannedTextObj.length === 0) {
        return { error: 'Scanned object must be an array of book objects.'};
    }

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    result.SearchTerm = searchTerm;
    
    for (const book of scannedTextObj) {
        if (!book.Content || !Array.isArray(book.Content)) {
            continue; // Skip if content is not in array
        }

        // Iterate through the content of the selected book
        for (const content of book.Content) {
            if (content.Text && content.Text.includes(searchTerm)) {
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line
                });
            }
        }
    }

    if (result.Results.length === 0) {
        result.Results = 'Not found.';
    }

    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Example output object for case sensitivity */
const twentyLeaguesOutUpper = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8,
        }
    ]
}

/** Example output object for negative results */
const twentyLeaguesOutNeg = {
    "SearchTerm": "foo",
    "Results": 'Not found.'
}

/** Example output object for instances when searchTerm is empty */
const twentyLeaguesOutEmptyTerm = {
    error: 'Search term must not be empty.'
}

/** Example output object for instances when searchTerm is empty */
const twentyLeaguesOutObject = {
    error: 'Scanned object must be an array of book objects.'
}

/** Example output object for instances when searchTerm is null */
const twentyLeaguesOutNull = {
    error: 'Scanned object must be an array of book objects.'
}

const twentyLeaguesOutWS = {
    "SearchTerm": " myself",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10,
        }
    ]
}

const twentyLeaguesOutMulti = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9,
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10,
        }
    ]
}

const twentyLeaguesOutHyphenated = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8,
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOutPartial = {
    "SearchTerm": "he",
    "Reaults": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/* --- My unit tests --- */

/** Case sensitivity - Positive result */
const test3result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutUpper) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOutUpper);
    console.log("Received:", test3result);
}

/** Negative result test */
const test4result = findSearchTermInBooks("foo", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutNeg) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOutNeg);
    console.log("Received:", test4result);
}

/** Empty search term test */
const test5result = findSearchTermInBooks("", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutEmptyTerm) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesOutEmptyTerm);
    console.log("Received:", test5result);
}

/** Empty scanned object test */
const test6result = findSearchTermInBooks("the", []);
if (JSON.stringify(twentyLeaguesOutObject) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", twentyLeaguesOutObject);
    console.log("Received:", test6result);
}

/** Null scanned object test */
const test7result = findSearchTermInBooks("the", null);
if (JSON.stringify(twentyLeaguesOutObject) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", twentyLeaguesOutNull);
    console.log("Received:", test7result);
}

/** White space test */
const test8result = findSearchTermInBooks(" myself", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutWS) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", twentyLeaguesOutWS);
    console.log("Received:", test8result);
}

/** Multiple instances test */
const test9result = findSearchTermInBooks("and", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutMulti) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", twentyLeaguesOutMulti);
    console.log("Received:", test9result);
}

/** Hyphenated words test */
// To-do if given more time.

/** Partial word test */
// To-do if given more time.
