/* eslint-disable no-useless-escape */
// prettier-ignore
// https://developer.apple.com/library/content/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_classes.html#//apple_ref/doc/uid/TP40000983-CH1g-DontLinkElementID_57

function checkStatus(str) {
  return `tell application "System Events"
    if ((get name of every application process) contains "Spotify") then
      tell application \"Spotify\"
        if ((player state as string) is equal to "stopped") then
          return \"{\\\"player_state\\\":\\\"stopped\\\",\\\"status\\\":\\\"running\\\"}\"
        else
          ${str}
        end if
      end tell
    else
      return \"{\\\"status\\\":\\\"not_running\\\"}\"
    end if
  end tell`;
}

export default {
  togglePlay: checkStatus`playpause`,
  prev: checkStatus`previous track`,
  next: checkStatus`next track`,
  playerState: checkStatus`
    set state to \"{\"
    set state to state & \"\\\"player_state\\\":\" & \"\\\"\" & player state & \"\\\",\"
    set state to state & \"\\\"track_name\\\":\" & \"\\\"\" & name of current track & \"\\\",\"
    set state to state & \"\\\"track_id\\\":\" & \"\\\"\" & id of current track & \"\\\",\"
    set state to state & \"\\\"artist_name\\\":\" & \"\\\"\" & artist of current track & \"\\\",\"
    set state to state & \"\\\"album_name\\\":\" & \"\\\"\" & album of current track & \"\\\",\"
    set state to state & \"\\\"artwork_url\\\":\" & \"\\\"\" & artwork url of current track & \"\\\",\"
    set state to state & \"\\\"track_url\\\":\" & \"\\\"\" & spotify url of current track & \"\\\",\"
    set state to state & \"\\\"status\\\":\\\"running\\\"\"
    return state & \"}\"
  `
};
