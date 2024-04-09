document.addEventListener('DOMContentLoaded', function () {
  const MAX_VOTERS = 100;
  const MAX_CANDIDATES = 9;

  // preferences[i][j] is jth preference for voter i
  let preferences = new Array(MAX_VOTERS);
  for (let i = 0; i < MAX_VOTERS; i++) {
    preferences[i] = new Array(MAX_CANDIDATES).fill(0);
  }

  class Candidate {
    constructor(name, votes, eliminated) {
      this.name = name;
      this.votes = votes;
      this.eliminated = eliminated;
    }
  }


  let candidates = [];


  let voter_count = 5;
  let candidate_count = 3;

  function vote(voter, rank, name) {
    for (let i = 0; i < rank; i++) {
      if (preferences[voter][i] === preferences[voter][rank]) {
        // If the same candidate is already voted for a higher rank by the same voter, invalidate the vote
        return false;
      }
    }
    for (let i = 0; i < candidate_count; i++) {
      if (candidates[i].name.trim().toUpperCase() === name.trim().toUpperCase()) {
        preferences[voter][rank] = i;
        return true;
      }
    }
    return false;
  }



  function tabulate() {
    for (let i = 0; i < voter_count; i++) {
      for (let j = 0; j < candidate_count; j++) {
        if (!candidates[preferences[i][j]].eliminated) {
          candidates[preferences[i][j]].votes++;
          break;
        }
      }
    }
    return;
  }

  function printWinner() {
    let remainingCandidates = [];
    for (let i = 0; i < candidates.length; i++) {
      if (!candidates[i].eliminated) {
        remainingCandidates.push(candidates[i]);
      }
    }

    if (remainingCandidates.length === 1) {
      const winnerInput = document.querySelector('#winner');
      winnerInput.value = remainingCandidates[0].name;
      return true;
    }

    return false;
  }



  function find_min() {
    let min = 10000;
    for (let i = 0; i < candidate_count; i++) {
      if (candidates[i].votes < min && !candidates[i].eliminated) {
        min = candidates[i].votes;
      }
    }
    return min;
  }

  function is_tie(min) {
    for (let i = 0; i < candidate_count; i++) {
      if (candidates[i].votes !== min && !candidates[i].eliminated) {
        return false;
      }
    }
    return true;
  }

  function eliminate(min) {
    for (let i = 0; i < candidate_count; i++) {
      if (candidates[i].votes === min) {
        candidates[i].eliminated = true;
      }
    }
    return;
  }

  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();




    const candidateDivs = document.querySelectorAll('.candidate');
    candidates = [];
    candidate_count = candidateDivs.length; // Update candidate_count
    candidateDivs.forEach(candidateDiv => {
      const name = candidateDiv.querySelector('input').value;
      const votes = 0;
      const eliminated = false;
      const candidate = new Candidate(name, votes, eliminated);
      candidates.push(candidate);
    });

    const voterFieldset = document.getElementById('voter-fieldset');

    // Loop through each voter div in the fieldset
    const voterDivs = voterFieldset.querySelectorAll('div');
    const votes = [];

    for (let i = 0; i < voter_count; i++) {
      const rankInputs = voterDivs[i].querySelectorAll('.rank-input');
      const voterVotes = Array.from(rankInputs).map(rankInput => rankInput.value.trim());
      votes[i] = voterVotes;
    }

    // Example console log to display the votes array
    console.log(votes);



    for (let i = 0; i < voter_count; i++) {
      for (let j = 0; j < candidate_count; j++) {
        if (!vote(i, j, votes[i][j])) {
          alert("Invalid vote!");
          break;
        }
      }
    }

    while (true) {
      // Calculate votes given remaining candidates
      tabulate();

      // Check if election has been won
      const won = printWinner();
      if (won) {
        break;
      }

      // Eliminate last-place candidates
      const min = find_min();
      const tie = is_tie(min);

      // If tie, everyone wins
      if (tie) {
        const winners = [];
        for (let i = 0; i < candidate_count; i++) {
          if (!candidates[i].eliminated) {
            winners.push(candidates[i].name);
          }
        }
        const winnerInput = document.getElementById('winner');
        winnerInput.value = winners.join(', ');
        break;
      }

      // Eliminate anyone with minimum number of votes
      eliminate(min);

      // Reset vote counts back to zero
      for (let i = 0; i < candidate_count; i++) {
        candidates[i].votes = 0;
      }
    }

  });
});


