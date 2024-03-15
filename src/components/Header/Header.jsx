import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "@store/modules/app";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Avatar } from "primereact/avatar";
import avatar from "@/assets/images/logo.png"

function Header() {
    const visibleSideBar = useSelector((state) => state.app.visibleSideBar)
    const dispatch = useDispatch()

    const onToggleSideBar = (value) => {
        console.log('onToggerSideBar: ', visibleSideBar)
        value ? dispatch(toggleSideBar({ onClose: true })) : dispatch(toggleSideBar())
    }

    const startContent = (<Button icon="pi pi-arrow-right" onClick={() => onToggleSideBar()} >button</Button>);

    const centerContent = (<div>centerContent</div>);

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
                <Avatar image={avatar} shape="circle" />
                <span className="font-bold text-bluegray-50">Amy Elsner</span>
            </div>
        </React.Fragment>
    )

    // const endContent = (<div>end</div>);

    return (
        <div className="viasm-header">
            <Toolbar start={startContent} center={centerContent} end={endContent} className="" style={{ height: 'var(--header-height)' }} />
        </div>
    )
}

export default Header;
