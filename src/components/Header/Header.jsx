import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "@store/modules/app";
import { Toolbar } from "primereact/toolbar";
import { Avatar } from "primereact/avatar";
import logo from "@/assets/images/logo.png";
import avatar from "@/assets/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'antd';

function Header() {
    const dispatch = useDispatch()
    const visibleSideBar = useSelector((state) => state.app.visibleSideBar)
    let visibleMenuAvatar = true
    const menuAvatar = [
        { key: 1, label: 'Đăng xuất' }
    ]

    const onChangeVisibleMenuAvatar = (value) => {
        console.log('onChangeVisibleMenuAvatar: ', value)
    }

    const onToggleSideBar = (value) => {
        value ? dispatch(toggleSideBar({ onClose: true })) : dispatch(toggleSideBar())
        const tsIcon = document.getElementsByClassName("toggle-sidebar-icon")[0]
        if (visibleSideBar) {
            tsIcon.style.transform = 'rotate(0deg)'
            tsIcon.style.transition = 'all .3s'
            // tsIcon.style.
        } else {
            tsIcon.style.transform = 'rotate(-180deg)'
            tsIcon.style.transition = 'all .3s'
        }
    }

    const onToggleMenuAvatar = (e) => {
        const menuAvatar = document.getElementById("menu-avatar")
        console.log('e.target: ', e.target)
        visibleMenuAvatar = !visibleMenuAvatar
        menuAvatar.style.display = visibleMenuAvatar ? 'block' : 'none'
    }

    const startContent = (
        <div className="header-left">
            <div className="toggle-sidebar-swap">
                <FontAwesomeIcon icon={faChevronRight} onClick={() => onToggleSideBar()}
                                 className="w-6 h-6 toggle-sidebar-icon"/>
            </div>
            <img src={logo} className="viasm-logo"/>
        </div>
    );

    const centerContent = (<div></div>);

    const endContent = (
        <React.Fragment>
            <div className="flex justifi-content-center align-items-center gap-2 header-right">
                <span style={{fontSize: '14px'}}>Minh Phương</span>
                <Avatar image={avatar} shape="circle" style={{height: '38px', width: '38px', marginLeft: '12px'}}/>
            </div>
        </React.Fragment>
    );

    return (
        <div className="viasm-header">
            <Toolbar start={startContent} center={centerContent} end={endContent}/>
        </div>
    )
}

export default Header;
