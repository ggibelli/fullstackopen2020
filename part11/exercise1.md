# Exercise 11.1

 **For this exercise, I chose to talk about the CI/CD using python as a language.**

## Point 1
- For linting in python we could use *flake8* and *pylama*, which are linters using other linters packed together, and they work detecting logical and coding error and also enforcing a good coding style following the **PEP8**, that is the official style guide for python code, and we could use pylint as a standalone linter, it's one of the oldest linter and it works well, even though it's a bit slower and hard to configure.
- To test our code in python we could use the standard library, *unittest*, which is also the default choice for Django and flask, otherwise, another common option would be *pytest* and *nose*.
- Being python an *interpreted language* we don't need to build anything, so the building part would be making sure to have the requirements file with all the dependencies needed for the app, and testing the code so that could be deployed.

## Point 2
Other well-known CI/CD services are *CircleCI* that let you choose between cloud and self-hosted (at a price), *Travis* and they both provide seamless integration with GitHub.

## Point 3
Not knowing which kind of software this team is working on it's hard to answer, if the application *doesn't have special requirements*, a **cloud solution** could be easier to set up and cheaper to maintain, on the other hand, if they need *faster execution time for the tests,* or if they have *special hardware requirements* and don't mind a little more configuration time in the beginning, the **self-hosted solution** it could be worth the effort.
