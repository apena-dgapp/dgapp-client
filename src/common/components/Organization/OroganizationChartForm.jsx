import React from 'react';
import Images from '../../images/index';

const OroganizationChartForm = () => {
  return (
    <>
    <div className='tree-container'>

      {/* <div className="allPostTitle-cont">
        <div className='allPostTitle'>Organization Chart</div>
      </div> */}

          <div className="tree">
            <ul>
              <li><a href='/#'><img src={Images.director} alt=''/><span>Child</span></a>
                  <ul>
                    <li><a href='/#'><img src={Images.director} alt=''/><span>Grand Child</span></a>
                        <ul>
                            <li><a href='/#'><img src={Images.director} alt=''/><span>Great Grand Child</span></a></li>
                            <li><a href='/#'><img src={Images.director} alt=''/><span>Great Grand Child</span></a></li>
                        </ul> 
                    </li>

                    <li><a href='/#'><img src={Images.director} alt=''/><span>Great Grand Child</span></a>
                      <ul>
                        <li><a href='/#'><img src={Images.director} alt=''/><span>Great Grand Child</span></a></li>
                        <li><a href='/#'><img src={Images.director} alt=''/><span>Great Grand Child</span></a></li>
                        <li><a href='/#'><img src={Images.director} alt=''/><span>Great Grand Child</span></a></li>
                      </ul> 
                    </li>
                    <li><a href='/#'><img src={Images.director} alt=''/><span>Grand Child</span></a></li>
                  </ul>  
              </li>
            </ul>  
          </div>  
      </div>
    </>
  )
}

export default OroganizationChartForm