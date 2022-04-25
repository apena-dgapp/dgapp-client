import React,{useContext} from 'react';
import Images from '../../images/index';
import GlobalContext from '../../../context/GlobalContext';

const Sidebar = () => {

    const [contextState] = useContext(GlobalContext);

  return (
    <>
        <div className={contextState.token ? 'sideBarContainer': 'd-none'}>
            <div className="sideRage"></div>

                <div className="sidebarTitle">
                    <span>ABOUT US</span>
                </div>
                    <img className='sideImg' src={Images.aboutMe} alt="ABOUT US"/>

                    <p className='mb-4 aboutUs-txt'>
                        Promover y coordinar con las entidades públicas competentes las normas, 
                        planes, políticas, normas e iniciativas que se requieran para el 
                        desarrollo y buen funcionamiento de las distintas formas de participación
                        público-privada previstas en esta ley.
                    </p>
                    <div className="sidebarTitle">
                        <span>CONTENT</span>
                    </div>
                <ul className="sidebarList">
                    <li className="sidebarListItems">Projects</li>
                    <li className="sidebarListItems">Collaborator</li>
                    <li className="sidebarListItems">Recognitions</li>
                    <li className="sidebarListItems">Activities</li>
                    <li className="sidebarListItems">Calendar</li>
                    <li className="sidebarListItems">Services</li>
                </ul>

                <div className="sidebarTitle">
                    <span>CHAT</span>
                </div>
                <div className="container-chat">
                    <figure>
                        <img className='img-chat' src={Images.teams} alt='teams'/>
                    </figure>
                    <figure>
                        <img className='img-chat' src={Images.yammer} alt='teams'/>
                    </figure>
                    <figure>
                        <img className='img-chat' src={Images.outlook} alt='teams'/>
                    </figure>
            </div>

        </div>
    </>
  )
}

export default Sidebar

