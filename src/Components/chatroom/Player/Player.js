import React, {Component} from "react";
import SliderCom from './Slider';
import '../../../css/chatroom/player/Player.css'
class Player extends Component {

  constructor(props) {
      super(props);
      this.checkForPlayer = this.checkForPlayer.bind(this);
      this.createPlayerEventListeners = this.createPlayerEventListeners.bind(this);
      this.checkForPlayer();
      this.state = {
        duration: "",
        position: "",
        trackName: "",
        albumName: "",
        artistName: "",
        albumCover: ""
      }
  }

  createPlayerEventListeners() {
      //Add event listeners to browser spotify player
        this.player.on('initialization_error', e => { 
          console.error(e);
        });
        this.player.on('authentication_error', e => {
          console.error(e);
        });
        this.player.on('account_error', e => { 
          console.error(e); 
        });
        this.player.on('playback_error', e => { 
          console.error(e); 
        });

        // Playback status updates
        this.player.on('player_state_changed', state => this.onStateChanged(state));

        // Ready
        this.player.on('ready', async data => {
          let { device_id } = data;
          console.log("Let the music play on!");
          await this.setState({ deviceId: device_id });
          this.transferPlaybackHere();
        });

        this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        });
      }

    checkForPlayer() {
      if (window.Spotify !== null) {
        this.player = new window.Spotify.Player({
          name: "Cadence Web Player",
          getOAuthToken: cb => { cb(this.props.access_token); },
        });
        this.createPlayerEventListeners();
        this.player.connect();
        // finally, connect!
        console.log("Spotify Player connected!");
        console.log(this.player);
      }
    }

    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    onStateChanged(state) {
      console.log(state);
      console.log("________________________________________________________");
      console.log(this.state);
      // if we're no longer listening to music, we'll get a null state.
      if (state !== null) {
        const {
          current_track: currentTrack,
        } = state.track_window;
        const position = this.millisToMinutesAndSeconds(state.position);
        const duration = this.millisToMinutesAndSeconds(state.duration);
        const trackName = currentTrack.name;
        const albumName = currentTrack.album.name;
        const albumCover = currentTrack.album.images[0].url;
        const artistName = currentTrack.artists.map(artist => artist.name).join(", ");
        const playing = !state.paused;
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          playing,
          albumCover
        });
      }
    }

    transferPlaybackHere() {
      console.log("playback transfered")
      const deviceId = this.state.deviceId;
      const access_token = this.props.access_token;

      fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
          authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "device_ids": [ deviceId ],
          "play": true,
        }),
      });
    }

    onPrevClick() {
      this.player.previousTrack();
    }

    onPlayClick() {
      this.player.togglePlay();
    }

    onNextClick() {
      this.player.nextTrack();
    }

    playSong() {
      //Sends device ID and Access token to backend to play music
      //through socket
      //Hardcode to play "spotify:track:5bvNpG6wiIEf1PA13TkTu2" for now
      let song = "spotify:track:5bvNpG6wiIEf1PA13TkTu2";
      this.props.socket.emit('play_music', this.props.access_token, this.state.deviceId, song);
      console.log("test")
    }

    render() {
        return (
            <div className="player">
              <div className="row">
                  <button className="previous" onClick={()=>{this.onPrevClick()}}>Previous</button>
                  <button className="play-pause" onClick={()=>{this.onPlayClick()}}>Play/Pause</button>
                  <button className="next" onClick={()=>{this.onNextClick()}}>Next</button>
              </div>
              <SliderCom />
              <div className="albumInfo">
                <img className="albumCover" src={this.state.albumCover} style={{width:75, height:75}} alt="Album Cover Doesn't Exist"></img>
                <div className="albumName">{this.state.albumName}</div>
              </div>
              <div className="position">{this.state.position}</div>
              <div className="duration">{this.state.duration}</div>
              <div className="trackInfo">
                <div className="trackName">{this.state.trackName}</div>
                <div className="artistName">{this.state.artistName}</div>
              </div>
            </div>
        )
    }

    componentWillUnmount(){
      this.player.disconnect();
      this.player = null;
    }
}

export default Player;
