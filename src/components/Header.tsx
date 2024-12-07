import React, { useState } from "react";
import "css/main.css";

const Header: React.FC = () => {
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const faqData: any[] = [
    {
        question: "What do the stars between the map names mean?",
        answer: `The stars separate the maps into rough difficulty categories.<br /><br />
                  <span style="color: #9900ff"><b>1 Star:</b></span> Green GM+1 to Yellow GM+1.<br />
                  <span style="color: #ff39d2"><b>2 Star:</b></span> Red GM+1 to Green GM+2.<br />
                  <span style="color: #fe496a"><b>3 Star:</b></span> Yellow GM+2 or harder.</b></span>`,
    },
    {
        question: "How are the maps ordered?",
        answer: `Maps are ranked alphabetically within subtiers, with <span style="color: #9900ff"><b>1 star</b></span> being the easiest, and <span style="color: #fe496a"><b>3 star</b></span> being the hardest. <br />
                  Each star is currently split into two tiers, high and low.`,
    },
    {
        question: "What is the legacy sheet?",
        answer: `The legacy sheet is an archive of maps that have since been removed from the clears sheet. The reason for removal is located in the map's cell.`,
    },
    {
        question: "Why are there some clears that go against the rules despite them being enforced?",
        answer: `All rules are only enacted <b>after</b> they begin being enforced, so any clears that are submitted before a rule is enforced will not be removed.`,
    },
    {
        question: "What defines the leniency for 'exceptions can be made'?",
        answer: `genuinely speaking here, everyone will be given the benefit of the doubt unless its blatantly fake. this list is supposed to be an archive of the community's best efforts, for both the clearers and the mappers.`,
    },
  ];

  return (
    <header>
      <nav className="center">
        <div className="navgroup hover" style={{ marginRight: "auto" }}>
          <a href="/" className="nav-item">
            <h1 className="nav-logotext">Hardest Maps Clear List</h1>
          </a>
        </div>
        <div className="navgroup hover">
          <a href="/players/" className="nav-item">
            <span>Players</span>
          </a>
        </div>
        <div className="navgroup hover">
          <a
            href="https://docs.google.com/spreadsheets/d/1A88F3X2lOQJry-Da2NpnAr-w5WDrkjDtg7Wt0kLCiz8/edit#gid=2029222410"
            className="nav-item"
          >
            <span>Changelog</span>
          </a>
        </div>
        <div className="navgroup hover dropdown">
          <a href="/maps/" className="nav-item">
            <span>Maps</span>
            <i
              className="fa fa-caret-down"
              style={{ height: "50%", paddingLeft: "5px" }}
            />
          </a>
          <ul className="nav-hover-dropdown">
            <li className="hover">
              <a href="https://docs.google.com/spreadsheets/d/1A88F3X2lOQJry-Da2NpnAr-w5WDrkjDtg7Wt0kLCiz8/edit?gid=1936850276#gid=1936850276">
                Legacy & Rejected
              </a>
            </li>
            <li className="hover">
              <a href="https://docs.google.com/spreadsheets/d/1A88F3X2lOQJry-Da2NpnAr-w5WDrkjDtg7Wt0kLCiz8/edit?gid=1934867615#gid=1934867615">
                Community Low Deaths
              </a>
            </li>
            <li className="hover">
              <a href="https://docs.google.com/spreadsheets/d/1A88F3X2lOQJry-Da2NpnAr-w5WDrkjDtg7Wt0kLCiz8/edit?gid=36020274#gid=36020274">
                Pending
              </a>
            </li>
          </ul>
        </div>
        <div className="navgroup hover">
          <button
            className="nav-item"
            id="openPopup1"
            style={{ padding: "5px 10px" }}
            onClick={() => setIsPopup1Open(true)}
          >
            <img
              src="/static/images/changelog.svg"
              alt="Changelog"
              style={{ height: "30px", width: "30px", filter: "invert(100%)" }}
            />
          </button>
        </div>
        <div className="navgroup hover">
          <button
            className="nav-item"
            id="openPopup2"
            style={{ padding: "5px 10px" }}
            onClick={() => setIsPopup2Open(true)}
          >
            <img
              src="/static/images/settings.svg"
              alt="Settings"
              style={{ height: "30px", width: "30px", filter: "invert(100%)" }}
            />
          </button>
        </div>

        <div
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fa fa-bars" style={{ fontSize: "40px", marginTop: "10px", marginRight: "15px"}}></i>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? "show" : ""}`}>
        <a href="/players/">Players</a>
        <a href="/maps/">Maps</a>
        <a href="https://docs.google.com/spreadsheets/d/1A88F3X2lOQJry-Da2NpnAr-w5WDrkjDtg7Wt0kLCiz8/edit#gid=2029222410">
          Changelog
        </a>
        <div style={{ display: "flex", flexDirection: "row" }}>
        <button className="nav-item" id="openPopup1" style={{ padding: "5px 10px" }} onClick={() => setIsPopup1Open(true)}>
            <img src="/static/images/changelog.svg" alt="Changelog" style={{ height: "30px", width: "30px", filter: "invert(100%)" }}/>
          </button>
          <button className="nav-item" id="openPopup2" style={{ padding: "5px 10px" }} onClick={() => setIsPopup2Open(true)}>
            <img src="/static/images/settings.svg" alt="Settings" style={{ height: "30px", width: "30px", filter: "invert(100%)" }}/>
          </button>
        </div>
    </div>

      {isPopup1Open && (
        <div className="popup-overlay" id="popup1">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Welcome & Rules</h2>
              <button onClick={() => setIsPopup1Open(false)}>
                <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            <div className="popup-subcontainer">
                <h2>Rules for a new map to the list:</h2>
                <ol>
                    <li>Has to be easily available via Gamebanana or another permanent source, such as Google Drive.</li>
                    <li>The difficulty of the map has to be GM+1 difficulty or harder. </li>
                    <li>Must be cleared by at least one person with video.</li>
                    <li>The map maker decides whether their map should be added or not.</li>
                </ol>
                <h2>Requirements to submit a clear to the list:</h2>
                <ol>
                    <li>Don't cheat. Plain and simple.</li>
                    <li>A clear video is not necessary but strongly recommended. <br />
                        <b>Video is required for any clear above 1 star. </b></li>
                    <li>If you submit with a video, put it in a permanent place where it may be viewed indefinitely 
                        (YouTube, Twitch, etc.) Journal is <b>required</b> if there is no video.</li>
                    <li>Use an external image hosting tool such as catbox, Imgur, etc. for your journal screenshot. We will no longer be using discord images.</li>
                    <li>Don't pausebuffer or use savestates to clear a screen. Using either of these to practice or learn is perfectly fine.</li>
                    <li>Pausing to prevent spinners from loading is also <b>not</b> allowed. 
                        (No, waiting 118 hours for 2/3rds of the spinners to unload is not allowed either)</li>
                    <li><b>Don't</b> use mods that can give you important information which you normally don't have access to (such as CelesteTAS).</li>
                    <li><b>Don't</b> use features that significantly affect the visual part of the clear (e. g. simplified graphics feature from CelesteTAS).</li>
                    <li>Using Input History to your advantage in any way is <b>NOT</b> allowed (e. g. having frame count shown for inputs).</li>
                </ol>
                <h2>Video Recommendations:</h2>
                <ol>
                    <li>Use an input overlay (This is <b>heavily recommended</b> for any clear above 1 star).</li>
                    <li>If you can't use a normal input display, 
                        the Input History mod <b>is allowed</b> as long as you  
                        <b> turn off</b> the "Show Frame Count' option.</li>
                    <li>Use file timer. <b>(This is heavily recommended)</b>.</li>
                    <li>Disable screenshake and turn photosensitive mode on.</li>
                    <li>Put the link to the map in description of the video (especially if you are <b>submitting a new map</b> to the list).</li>
                </ol>
                <hr />
                <h2 id="faq-title">Frequently Asked Questions (FAQ)</h2>
                {faqData.map((faq, index) => (
                    <div key={index} className="faq-item">
                    <p
                        className="question"
                        onClick={() => toggleFAQ(index)}
                        style={{ cursor: "pointer" }}
                    >
                        {faq.question}
                        <i
                        className={`fa fa-caret-down ${openFAQIndex === index ? 'rotate' : ''}`}
                        aria-hidden="true"
                        style={{ marginLeft: '8px', transition: 'transform 0.3s' }}
                        ></i>
                    </p>
                    {openFAQIndex === index && (
                        <p
                        className="faq-answer"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                    )}
                    </div>
                ))}
                <hr />
                <p style={{ fontSize: "125%", marginTop: "10px" }}>
                    <b>
                        There is also a <a href="https://discord.gg/qWz3QYpun5" style={{color: "#7289DA"}}>dedicated server</a> specifically for the list 
                        to see a changelog, or meta-discuss about the list / with the list team.  
                    </b><br /><br />
                    <b>
                        If you want to submit a clear, ping the @Hard Clears Team role in the public Celeste Discord, the dedicated Hard List discord, 
                        or you can dm any one of us (mystral_fox, parrotdash, mineprodan, cubes9, 10percentpig, issytas, krzysiekee, burgerhex) 
                        if you're uncomfortable with speaking in the servers :3		
                    </b>
                </p>
            </div>
          </div>
        </div>
      )}

      {isPopup2Open && (
        <div className="popup-overlay" id="popup2">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Settings</h2>
              <button onClick={() => setIsPopup2Open(false)}>
                <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            <div className="popup-subcontainer">
              <h2>I might implement something here later...</h2>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
