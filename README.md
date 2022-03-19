# McGill Tech Games Backend Challenge
Implements a REST API to manage a list of song.
## Endpoints
### get /list
Returns all songs
### put /add
Adds a song to the list. Needs a title, artist and genre.
### del /delete
Deletes a song from the list. Takes in a title.
### post /playlist
Returns a playlist. Takes in either an artist or a genre (not both).
### post /like, post /unlike
Like or unlike a song. Takes in a title.
### get /judge
Determines your default genre and judges you based on it.