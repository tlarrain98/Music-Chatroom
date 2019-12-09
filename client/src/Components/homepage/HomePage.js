import React, {Component} from "react";
import LandingPage from './LandingPage';
import '../../css/homepage/HomePage.css';
import {Card, Button} from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLock } from '@fortawesome/free-solid-svg-icons'

class HomePage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
        }
        this.joinRoom = this.joinRoom.bind(this);
        this.checkForLounges = this.checkForLounges.bind(this);
        this.setUpTimer = this.setUpTimer.bind(this);

    }

    joinRoom(lounge_id){
      this.props.joinChatRoom(lounge_id);
      //Join room after 100 milliseconds
      this.props.handleChat();
    }

    async setUpTimer() {
      if (this._isMounted === true && this.props.loggedInStatus === true)
      {
        this.props.getLounges();
      }

    }

    checkForLounges(interval) {
      //Check for lounges every interval
      setInterval(this.setUpTimer, interval);
    }

    componentDidMount(){
      this._isMounted = true;
      this.props.getLounges();
      this.checkForLounges(2000);
    }

    renderPage(){
      if(this.props.loggedInStatus === false) {
        return  (<LandingPage login={this.props.login}
                              currDisplay={"landing"} />)
      }
      else {
        return  (   <>
                    <div className="homeTitleHeader">
                      <div className="homeTitle">
                      Lounges
                      </div>
                    </div>
                    <div className="Chatrooms"> {
                      this.props.chatRooms.map((chatroom, idx) => {
                        return (
                          <Card className="createdChatRoom" key={idx} bg="dark" text="white">
                            <Card.Header className="roomCardHeader">
                              <Card.Title>{chatroom.name}</Card.Title>
                              {/*
                              <div className="roomLock">
                                <FontAwesomeIcon icon={faLock} />
                                <FontAwesomeIcon icon={faLock} />
                              </div>
                              */}
                            </Card.Header>
                            <Card.Body className="roomCardBody">
                              <Card.Subtitle className="mb-2 text-muted">
                                Master: {chatroom.loungeMasterName}
                                <div className="loungeGenres"> {"Genre(s): " + chatroom.genres} </div>
                              </Card.Subtitle>
                              <div className="loungeDesc">
                              <Card.Text className="cardText">
                                {chatroom.desc}
                              </Card.Text>
                               </div>
                              <Button className="enterBtn"
                                      onClick={()=> this.joinRoom(chatroom.id)}
                                      variant="primary"
                                      disabled={!this.props.isPremiumUser ? true : false}>
                                Enter Lounge
                              </Button>
                            </Card.Body>

                          </Card>
                        )
                      })
                    }
                    </div>
                    </>
                  );
      }
    }

    render() {
        return (<div className="HomePage">
                    {this.renderPage()}
               </div>)

    }

    componentWillUnmount(){
      this._isMounted = false;
    }
}

export default HomePage;
