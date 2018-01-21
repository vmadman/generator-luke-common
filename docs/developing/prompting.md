# Sub-Generator Prompts

These are just a few rough notes that I left for myself.  I should
clean these docs up.. but something is better than nothing.

## Prompt Configuration

```
{
    type      : "input",
    name      : "somePromptName",
    message   : "A question for the user?",
    default   : "a-default-value",

    derive: function( promptData ) {

        // Derive functions are checked first and will
        // receive the highest priority.  If the derive
        // function returns a non-null value, then it
        // will be used, the user will not be prompted,
        // and all other caches will be ignored.

        // You'll see mention of derived settings in the log:
        // Using derived value for somePromptName: my-project

        // This example loads the "name" property from
        // the package.json file, if it exists.
        return me._loadPackageValue("name");

    }

    compose: function( promptName, allValues, promptConfig, allPrompts ) {

        // This function is called if the user does
        // not provide a value (uses the default value).

        return null; // <- the compose value will be ignored
                     //    (so the literal default will be used)

    },

    parse: function( promptName, promptValue, promptConfig, allValues, allPrompts ) {

        // This function is always called if a prompt value
        // is provided by the user (and not loaded from a cache)

        return null; // <- the parse value will be ignored
                     //    (so the current value will not be altered)

    },

    // Allows the final value to be validated using regex
    validationRegex: /^[af0-9]{8}\-[af0-9]{4}\-[af0-9]{4}\-[af0-9]{4}\-[af0-9]{12}$/,

    // When TRUE, validation failures will terminate the generator
    validateStrictly: false,

    // An optional custom message for validation failures
    validationFailureMessage: "The provided value does not appear to be a valid UUID",

    // The only value that has any affect is "prefer-cache", which
    // tells the generator to load from the .yo-rc.json file if
    // a value is available.
    cacheMode : "prefer-cache",

    // Set this to TRUE if the question should be asked, again,
    // in the same session even if this prompt was already
    // satisfied by another sub-generator
    askAgain  : false

}
```