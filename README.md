
# Runoff Election Website

## Overview
This repository contains a web-based implementation of a runoff election system, originally inspired by the "Runoff" problem set from CS50. The website allows users to simulate a ranked-choice voting process where they can input candidate names and their preferences, and the system calculates the winner based on the ranked-choice voting algorithm.

## Features
- Input form for users to enter candidate names and vote preferences.
- Calculation of election winner using the ranked-choice voting method.
- Visual representation of the voting process and outcome.
- Responsive design with Bootstrap styling for optimal viewing on various devices.

## Runoff Election Process
In a runoff election, voters rank candidates in order of preference. The counting process involves several steps:

1. **Vote Collection**: Users input candidate names and rank them according to their preferences. Each voter's ballot contains a ranked list of candidates.
2. **Vote Tabulation**: Initially, the votes are counted by tallying the first choice preferences of each voter. If any candidate receives more than 50% of the first-choice votes, they are declared the winner.
3. **Elimination of Candidates**: If no candidate has a majority, the candidate with the fewest first-choice votes is eliminated from the race. Their votes are transferred to the next ranked candidate on each ballot.
4. **Recounting**: The votes are recounted, and the process continues until a candidate achieves a majority of votes.

This ranked-choice voting method ensures that the eventual winner is preferred by the majority of voters.

## Usage
1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser.
3. Enter the names of candidates and submit the ballot with your preferences.
4. View the election process and the eventual winner displayed on the website.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Bootstrap

## Credits
This project was developed by Sarvesh Shahane. It was inspired by the "Runoff" problem set from [CS50](https://cs50.harvard.edu/x/), Harvard University's introduction to computer science course.

## License
This project is licensed under the [MIT License](LICENSE).

