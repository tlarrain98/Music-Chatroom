import React, {Component} from "react";
import '../../../css/chatroom/Queue.css'
import QueueDeck from './QueueDeck';

class Queue extends Component {

    render() {
        return (
                <div className="queue">
                    <QueueDeck socket={this.socket}
                               access_token={this.props.access_token}/>
                </div>
        )
    }
}

export default Queue;
