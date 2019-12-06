import React, {Component} from "react";
import {Image} from "react-bootstrap";
import Brian from "../../images/Brian.jpg";
import Neville from "../../images/Neville.jpg";
// import Tomas from "../../images/Tomas.jpg";
import Nick from "../../images/Nick.jpg";
// import Michael from "../../images/Michael.jpg";
// import James from "../../images/James.jpg";

class WhoAreWe extends Component {
    render() {
        return  <div className="Backdrop">
                  <div className="WhoAreWe">
                    <div className="Creator">
                      <Image src={Brian} className="CreatorImg" alt="A photo of Brian."></Image>
                      <div className="Info">
                        <div className="Name">Brian Portland</div>
                        <div className="Description">
                          Brian is a Computer Science student at UW-Madison. He plans to graduate this month!
                          He has been a member of the Wisconsin Men's Club Water Polo team for the past 4 years as well.
                          After graduation, Brian hopes to find a job in the Chicago area, where he is from. <br></br>
                          Thanks for checking out our project!
                        </div>
                      </div>
                    </div>
                    <div className="Creator">
                      <Image src={Neville} className="CreatorImg" alt="A photo of Neville."></Image>
                      <div className="Info">
                        <div className="Name">Neville Ng</div>
                        <div className="Description">
                          Neville is a Senior majoring in Computer Sciences at UW-Madison. In his free time,
                          he likes to jam out with friends, pretend to know art and catch up on the latest memes.
                          Neville is an avid DotA 2 fan and plays for the UW-Madison Varsity DotA team. His favorite
                          drink is a nice, cold Long Island. Pls hire him.
                        </div>
                      </div>
                    </div>
                    <div className="Creator">
                      <Image src={Nick} className="CreatorImg" alt="A photo of Nick."></Image>
                      <div className="Info">
                        <div className="Name">Nick Klabjan</div>
                        <div className="Description">
                          Nick is currently pursuing a Computer Science degree at UW-Madison with an expected graduation date of
                          December, 2019. Post graduation, Nick plans on working for Opex Analytics in Chicago as a Software Engineer.
                          During his free time, he loves to play soccer and basketball with his friends.
                        </div>
                      </div>
                    </div>
                    <div className="Creator">
                      <Image src={Brian} className="CreatorImg" alt="A photo of Tomas."></Image>
                      <div className="Info">
                        <div className="Name">Tomas</div>
                        <div className="Description">
                          Lorem ipsum intellegens quid ait illi et ego valde impressis.
                          Hoc replere, intulere. Spero autem quod illud est satis honeste. Bene, tempus est ire!
                        </div>
                      </div>
                    </div>
                    <div className="Creator">
                      <Image src={Brian} className="CreatorImg" alt="A photo of Michael."></Image>
                      {/* <Image src={Michael} className="CreatorImg" alt="A photo of Michael."></Image> */}
                      <div className="Info">
                        <div className="Name">Michael</div>
                        <div className="Description">
                          Lorem ipsum intellegens quid ait illi et ego valde impressis.
                          Hoc replere, intulere. Spero autem quod illud est satis honeste. Bene, tempus est ire!
                        </div>
                      </div>
                    </div>
                    <div className="Creator">
                      <Image src={Brian} className="CreatorImg" alt="A photo of James."></Image>
                      {/* <Image src={James} className="CreatorImg" alt="A photo of James."></Image> */}
                      <div className="Info">
                        <div className="Name">James</div>
                        <div className="Description">
                          Lorem ipsum intellegens quid ait illi et ego valde impressis.
                          Hoc replere, intulere. Spero autem quod illud est satis honeste. Bene, tempus est ire!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      }
}

export default WhoAreWe;
