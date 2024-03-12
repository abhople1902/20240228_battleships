// export enum shipType {
//     Carrier = 'Aircraft carriers',
//     Submarine = 'Submarine',
//     Destroyer = 'Destroyer',
//     Cruiser = 'Cruiser',
//     Frigate = 'Frigate'
// }

// export enum playerType {
//   Human = 'Human',
//   Bot = 'Bot'
// }

// export enum Status {
//   NotStarted = 0,
//   Started = 1,
//   Terminated = -1,
//   Finished = 2
// }

const shipType = ['Carriers', 'Submarine', 'Destroyer', 'Cruiser', 'Frigate']
const playerType = ['Bot', 'Human']
const gameStatusCodes = [0, -1, 1, 2]
module.exports = {playerType, gameStatusCodes}