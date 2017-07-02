/* eslint-disable no-useless-escape */
// prettier-ignore
// https://developer.apple.com/library/content/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_classes.html#//apple_ref/doc/uid/TP40000983-CH1g-DontLinkElementID_57

module.exports = {
  togglePlay: 'tell application \"Spotify\" to playpause',
  prev: 'tell application \"Spotify\" to previous track',
  next: 'tell application \"Spotify\" to next track',
  playerState: `tell application \"Spotify\"
    set state to \"{\"
    set state to state & \"\\\"player_state\\\":\" & \"\\\"\" & (player state as text) & \"\\\",\"
    set state to state & \"\\\"track_name\\\":\" & \"\\\"\" & name of current track & \"\\\",\"
    set state to state & \"\\\"track_id\\\":\" & \"\\\"\" & id of current track & \"\\\",\"
    set state to state & \"\\\"artist_name\\\":\" & \"\\\"\" & artist of current track & \"\\\",\"
    set state to state & \"\\\"album_name\\\":\" & \"\\\"\" & album of current track & \"\\\",\"
    set state to state & \"\\\"artwork_url\\\":\" & \"\\\"\" & artwork url of current track & \"\\\",\"
    set state to state & \"\\\"track_url\\\":\" & \"\\\"\" & spotify url of current track & \"\\\"\"
    return state & \"}\"
  end tell`
};
