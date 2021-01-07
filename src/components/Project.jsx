import React from 'react'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import '../css/global.css'
import '../css/project.css'

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
    const [value, setValue] = React.useState(valueStart)
    React.useEffect(() => {
      setValue(valueEnd)
    }, [valueEnd])
  
    return children(value)
}

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



    return (
        <React.Fragment>
            <div className="main-container">
                <div className="project-top-block">
                    <p className="t5" style={{marginTop:10}}>
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
                                            rotation: 0.5 + (1 - 69 / 100) / 2,
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
                                <p className="t1">Project Management</p>
                            </div>
                        </div>
                        <div>
                            options
                        </div>
                    </div>
                </div>
                <div className="project-main">
                    <p>uui</p>
                    <div className="project-discussion-block">
                        <div>
                            <div>
                                <p className="t3">Project Discussion</p>
                                <p className="t5">Abigail Spencer, John Doe and 3 more</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Project