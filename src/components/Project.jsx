import React, { useState } from 'react'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {FiX} from 'react-icons/fi'

import '../css/global.css'
import '../css/project.css'
import { IconButton } from './Common';
import {ProgressProvider} from './Common'

class GradientSVG extends React.Component {
    render() {
      let { startColor, endColor, idCSS, rotation } = this.props;
  
      let gradientTransform = `rotate(${rotation})`;
  
      return (
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id={idCSS} gradientTransform={gradientTransform}>
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
        </svg>
      );
    }
}

  

const Project = () => {

    const [openDiscussionPanel, setOpenDiscussionPanel] = useState(false)


    return (
        <React.Fragment>
            <div className="main-container">
                <div className="project-top-block">
                    <p className="t5 sub" style={{marginTop:10}}>
                        Projects  >  Project Management
                    </p>
                    <div className="project-top-block-main">
                        <div className="horizontal">
                            <div className="project-pie">
                                <ProgressProvider valueStart={0} valueEnd={80}>
                                {value => 
                                    <CircularProgressbarWithChildren 
                                        value={value} 
                                        circleRatio={0.7} 
                                        styles={buildStyles({
                                            rotation: 0.5 + (1 - 70 / 100) / 2,
                                            pathTransitionDuration: 1.5,
                                            textColor: "#151515",
                                            pathColor: "green",
                                            trailColor: "#eee",
                                            
                                        })}
                                        strokeWidth={6}
                                    >
                                        
                                        <p className="t3">{value}%</p>
                                        <p className="t6 tcgrey" style={{marginBottom:10}}>progress</p>
                                        
                                    </CircularProgressbarWithChildren>
                                        
                                }
                                </ProgressProvider>
                            </div>
                            <div className="project-title-block">
                                <p className="t1 title">Project Management</p>
                            </div>
                        </div>
                        <div>
                            options
                            <button onClick={() => setOpenDiscussionPanel(!openDiscussionPanel)}>Open</button>
                        </div>
                    </div>
                </div>
                <div className="project-main">
                    <div className="project-main-content">
                    </div> 
                    <div className={openDiscussionPanel ? "project-discussion-block" : "project-discussion-block isClosed"}>
                        <div className="horizontal" style={{padding: '10px 15px', borderBottom: '2px solid #eee', height: 50}}>
                            <div style={{display: openDiscussionPanel ? 'block' : 'none'}}>
                                <p className="t4 title">Project Discussion</p>
                                <p className="t6 themeColor" style={{marginTop: 5}}>Abigail Spencer, John Doe and 3 more</p>
                            </div>
                            <IconButton icon={<FiX size={20} color="#151515"/>} onClick={() => setOpenDiscussionPanel(false)} style={{display: openDiscussionPanel ? 'flex' : 'none'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Project