import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import React, { useEffect, useState } from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
    const [loginn, setLoginn] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem('isLoggedIn')
        console.log(token, "Token");

        if (!token) {
            navigate('/')
        }

        setLoginn(true)
    }, [loginn])

    const location = useLocation();
    console.log(location);

    const handleLog = () => {
        localStorage.removeItem('isLoggedIn')
        setLoginn(false)
    }

    let headerText = 'Dashboard'; // Default
    if (location.pathname === '/dash/category') {
        headerText = 'Dashboard / Category';
    } else if (location.pathname === '/dash/sub-category') {
        headerText = 'Dashboard / Sub Category';
    } else if (location.pathname === '/dash/qa') {
        headerText = 'Dashboard / Q & A';
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '16.5%' }}>
                    <div className=''>
                        <div className="mainSidebar">
                            <div className="headData"><h1 style={{ color: 'white', fontSize: '20px', fontWeight: '400' }}>Interview Portal</h1></div>
                            <div className="orderList">
                                <ul>
                                    <li style={{ listStyle: 'none', margin: '20px', display: 'grid', alignItems: 'center', justifyContent: 'center', gridTemplateColumns: '50px 130px' }} ><SpaceDashboardIcon /><Link to={'/dash'}>Dashboard</Link></li>
                                    <li style={{ listStyle: 'none', margin: '20px', display: 'grid', alignItems: 'center', justifyContent: 'center', gridTemplateColumns: '50px 130px' }} ><CategoryIcon /><Link to={'/dash/category'}>Category</Link></li>
                                    <li style={{ listStyle: 'none', margin: '20px', display: 'grid', alignItems: 'center', justifyContent: 'center', gridTemplateColumns: '50px 130px' }} ><ControlPointDuplicateIcon /><Link to={'/dash/sub-category'}>Sub Category</Link></li>
                                    <li style={{ listStyle: 'none', margin: '20px', display: 'grid', alignItems: 'center', justifyContent: 'center', gridTemplateColumns: '50px 130px' }} ><HelpOutlineIcon /><Link to={'/dash/qa'}>Q & A</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <div className="dashContents" style={{ width: '99.8%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="dashHeader">
                            {headerText}
                        </div>
                        <div onClick={() => handleLog()} style={{ color: 'white', margin: '20px' }}>
                            <MeetingRoomIcon />
                        </div>
                    </div>
                    <div className="boxData" style={{ display: 'flex', margin: '20px' }}>

                        {/* <Route> */}
                        <Outlet />
                        {/* </Route> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar