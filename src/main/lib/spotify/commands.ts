/* eslint-disable no-useless-escape */
// prettier-ignore
// https://developer.apple.com/library/content/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_classes.html#//apple_ref/doc/uid/TP40000983-CH1g-DontLinkElementID_57

function ifRunning(str) {
  return `tell application "System Events"
    if (get name of every application process) contains "Spotify" then
      ${str}
    else
      return \"{\\\"status\\\":\\\"not_running\\\"}\"
    end if
  end tell`;
}

export default {
  togglePlay: ifRunning`tell application \"Spotify\" to playpause`,
  prev: ifRunning`tell application \"Spotify\" to previous track`,
  next: ifRunning`tell application \"Spotify\" to next track`,
  playerState: ifRunning`tell application \"Spotify\"
    set state to \"{\"
    set state to state & \"\\\"player_state\\\":\" & \"\\\"\" & player state & \"\\\",\"
    set state to state & \"\\\"track_name\\\":\" & \"\\\"\" & name of current track & \"\\\",\"
    set state to state & \"\\\"track_id\\\":\" & \"\\\"\" & id of current track & \"\\\",\"
    set state to state & \"\\\"artist_name\\\":\" & \"\\\"\" & artist of current track & \"\\\",\"
    set state to state & \"\\\"album_name\\\":\" & \"\\\"\" & album of current track & \"\\\",\"
    set state to state & \"\\\"artwork_url\\\":\" & \"\\\"\" & artwork url of current track & \"\\\",\"
    set state to state & \"\\\"track_url\\\":\" & \"\\\"\" & spotify url of current track & \"\\\",\"
    set state to state & \"\\\"status\\\":\\\"success\\\" \"
    return state & \"}\"
  end tell`
};
