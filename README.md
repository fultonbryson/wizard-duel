# WIZARD DUEL

_A session-based health tracking companion application for Magic: The Gathering_

> ## API
>
> > ### Player Creation
> >
> > A user can create a player instance, storing a player name and player id.
> >
> > > Endpoint: '/api/player'
> > > Method: 'POST'
> >
> > Expected Response:
> >
> > `{
> >
> >     "id": INT,
> >
> >     "player_name": STR
> >
> > }`
>
> > ### Match Creation
> >
> > A player can create a match instance, storing match id, match format, and match starting health
> >
> > > Endpoint: '/api/match'
> > > Method: 'POST'
> >
> > Expected Response:
> >
> > `{
> >
> >     "id": INT,
> >
> >     "match_format": STR,
> >
> >     "match_start_health": INT,
> >
> > }`
>
> > ### Get Roster
> >
> > Return all players with the same player match id
> >
> > > Endpoint: '/api/players/<match_id>'
> > > Method: 'GET'
> >
> > Expected Response:
> >
> > `{
> >
> >     "id": INT,
> >
> >     "player_name": STR,
> >
> >     "player_health_total": INT,
> >
> >     "player_match_id": INT,
> >
> > }`
>
> > ### Get Match Details
> >
> > Return match format and match start health
> >
> > > Endpoint: '/api/matches/<match_id>'
> > > Method: 'GET'
> >
> > Expected Response:
> >
> > `{
> >
> >     "id": INT,
> >
> >     "match_format": STR,
> >
> >     "match_start_health": INT,
> >
> > }`
>
> > ### Update Player Match ID
> >
> > Updates player_match_id upon match creation or match join
> >
> > > Endpoint: '/api/player-match/<player_id>'
> > > Method: 'PUT'
> >
> > Expected Response:
> >
> > `{
> >
> >     "id": INT,
> >
> >     "player_name": STR,
> >
> >     "player_health_total": INT,
> >
> >     "player_match_id": INT,
> >
> > }`
>
> > ### Update Player Health Total
> >
> > Updates player_health_total upon incrementation or decrementation
> >
> > > Endpoint: '/api/player-health/<player_id>'
> > > Method: 'PUT'
> >
> > Expected Response:
> >
> > `{
> >
> >     "id": INT,
> >
> >     "player_name": STR,
> >
> >     "player_health_total": INT,
> >
> >     "player_match_id": INT,
> >
> > }`
>
> > ### Delete Player Instance
> >
> > Deletes all player instance data with the same player match id
> >
> > > Endpoint: '/api/players/<match_id>'
> > > Method: 'DELETE'
> >
> > Expected Response:
> >
> > `{
> >
> >     "Successfully deleted players"
> >
> > }`
>
> > ### Delete Match Instance
> >
> > Deletes match instance data based on match id
> >
> > > Endpoint: '/api/matches/<match_id>'
> > > Method: 'DELETE'
> >
> > Expected Response:
> >
> > `{
> >
> >     "Match Successfully Deleted"
> >
> > }`

###### Created By Bryson Fulton | Capstone Project
