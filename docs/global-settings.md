# Global Settings

Many of the prompts asked by the generators are universal and you'll
find yourself answering the same questions, over and over.

If your running the generators on Linux, you can stop that by adding a
"User Prompt Overrides File" at `~/.yo-rc.overrides.json`:

```
$ cat ~/.yo-rc.overrides.json
{
  "generator-luke": {
    "fullName": "Luke Chavers",
    "emailAddress": "luke@c2cschools.com",
    "githubOwner": "c2cs"
  }
}
```

With the

# Further Reading

* [Partial Listing](partials/) - Individual docs for each partial
* [Sub-Generators](generators.md) - General information about generators and sub-generators
* [Project Scaffolds](project-scaffolds.md) - The other type of sub-generator
* [Project README](../README.md) - Basic project information