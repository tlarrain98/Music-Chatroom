import React, {Component} from "react";
import LandingPage from './LandingPage';
import '../../css/homepage/HomePage.css';
import {Card, Button} from 'react-bootstrap';


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
            displayProfile: false,
            display_name: ""
        }
    }

    async componentDidMount() {
      const response = await fetch('https://api.spotify.com/v1/me', {
      method: "GET",
      headers: {
          authorization: `Bearer ${this.props.access_token}`,
          },
      });
      const myJson = await response.json();
      console.log("MyJson: ", myJson);
      var displayName = myJson.display_name;
      this.setState({
          display_name: displayName
      });
  }

    renderPage(){
      if(this.props.loggedInStatus === false) {
        return  (<LandingPage login={this.props.login}/>)
      }
      else {
        return  (   <>
                    <div className="homeTitle">Lounges</div>
                    <div className="Chatrooms"> {
                      this.props.chatRooms.map((chatname, idx) => {
                        return (
                          <Card className="createdChatRoom" key={idx}>
                            <Card.Body>
                              <Card.Title className="cardTitle">Lounge Name</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">Master: {this.state.display_name}</Card.Subtitle>
                              <Card.Text className="cardText">
                                This is the description the lounge master has for this lounge.
                              </Card.Text>
                              <Button className="enterBtn" onClick={this.props.handleChat} variant="primary">Enter Lounge</Button>
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
                  <header className="Home-Page">
                    {this.renderPage()}
                  </header>
               </div>)

    }
}

export default HomePage;
