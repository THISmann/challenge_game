const ExcelJS = require("exceljs");
const fs = require("fs");

class GameChallenge {
  constructor(name) {
    this.name = name;
    this.games = [];
    this.teams = [];
  }

  // Method to create a new game
  createGame(gameType) {
    const gameId = this.generateGameId();
    const game = { id: gameId, type: gameType };
    this.games.push(game);
    return game;
  }

  // Method to create a new team
  createTeam(name, points, members) {
    const teamId = this.generateTeamId();
    const team = { id: teamId, name, points, members };
    this.teams.push(team);
    return team;
  }

  // Method to add a member to a team
  addMemberToTeam(teamId, memberName) {
    const team = this.findTeamById(teamId);

    if (!team) {
      throw new Error(`Team with ID ${teamId} not found.`);
    }

    team.members.push(memberName);
  }

  // Method to get all members of a team
  getTeamMembers(teamId) {
    const team = this.findTeamById(teamId);

    if (!team) {
      throw new Error(`Team with ID ${teamId} not found.`);
    }

    return team.members;
  }

  // Method to sort teams by points in descending order
  sortTeamsByPoints() {
    this.teams.sort((teamA, teamB) => teamB.points - teamA.points);
  }

  // Method to sort teams by points in ascending order
  deSortTeamsByPoints() {
    this.teams.sort((teamA, teamB) => teamA.points - teamB.points);
  }

  // Method to add points to a team
  addPointsToTeam(teamId, pointsToAdd) {
    const team = this.findTeamById(teamId);

    if (!team) {
      throw new Error(`Team with ID ${teamId} not found.`);
    }

    team.points += pointsToAdd;
  }

  // Method to remove points from a team
  removePointsFromTeam(teamId, pointsToRemove) {
    const team = this.findTeamById(teamId);

    if (!team) {
      throw new Error(`Team with ID ${teamId} not found.`);
    }

    // Ensure points to remove are not greater than the team's current points
    if (pointsToRemove > team.points) {
      throw new Error(
        `Cannot remove ${pointsToRemove} points from Team ${team.name}. Current points: ${team.points}`
      );
    }

    team.points -= pointsToRemove;
  }

  // Helper method to find a team by ID
  findTeamById(teamId) {
    return this.teams.find((team) => team.id === teamId);
  }

  // Generate a unique game ID
  generateGameId() {
    return `game_${this.games.length + 1}`;
  }

  // Generate a unique team ID
  generateTeamId() {
    return `team_${this.teams.length + 1}`;
  }

  // get All teams
  getAllTeams() {
    return this.teams;
  }

  // get all games
  getAllGames() {
    return this.games;
  }

  // Method to send a sorted table of objects to an Excel file
  async SendSortedTableToExcel(filePath) {
    this.sortTeamsByPoints();

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sorted Table");

    // Add headers to the worksheet
    const headers = [];
    this.teams.forEach((object) => {
      // Get the keys of each object
      const objectKeys = Object.keys(object);

      // Add the keys to the keys array if they are not already present
      objectKeys.forEach((key) => {
        if (!headers.includes(key)) {
          headers.push(key);
        }
      });
    });
    worksheet.addRow(headers);

    // Add sorted data to the worksheet
    this.teams.forEach((row) => {
      const rowData = headers.map((header) => row[header]);
      worksheet.addRow(rowData);
    });

    // Save the Excel file
    await workbook.xlsx.writeFile(filePath);
    console.log(`Sorted table exported to Excel file: ${filePath}`);
  }
}

// Example usage:
const challenge = new GameChallenge("Game Challenge");

const game1 = challenge.createGame("Football");
console.log("Created Game:", game1);

const game2 = challenge.createGame("Basketball");
console.log("Created Game:", game2);

const team1 = challenge.createTeam("Team A", 10, ["Player 1", "Player 2"]);
console.log("Created Team:", team1);

const team2 = challenge.createTeam("Team B", 8, ["Player 3", "Player 4"]);
console.log("Created Team:", team2);

const games = challenge.getAllGames();
console.log("Allgames for this challenges", games);

const team3 = challenge.createTeam("Team C", 12, ["Player 5", "Player 6"]);
console.log("Created Team:", team3);

// Sort teams by points
challenge.sortTeamsByPoints();

console.log("Sorted Teams by Points:", challenge.SendSortedTableToExcel('note.xlsx'));
