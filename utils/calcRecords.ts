import type { MatchInfo } from "~/types/getUserProfile"

const calcRecords = (matches: MatchInfo[]) => {
  const total = matches.length
  let win = 0
  let complete = 0
  const modes = {
    combine: 0,
    infinit: 0,
    fastest: 0,
  }
  type TModes = keyof typeof modes

  matches.forEach((m) => {
    if (m.matchResult === "1") win += 1
    if (m.player.matchRetired === "0") complete += 1

    if (m.channelName.endsWith("Combine")) modes.combine += 1
    else if (m.channelName.endsWith("Infinit")) modes.infinit += 1
    else if (m.channelName.endsWith("Fastest")) modes.fastest += 1
  })

  const mostMode = Object.entries(modes).sort(
    (a, b) => b[1] - a[1]
  )[0][0] as TModes

  return { total, win, complete, mostMode }
}

export default calcRecords
