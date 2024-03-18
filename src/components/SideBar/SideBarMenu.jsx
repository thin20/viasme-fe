import React from 'react';
import { Menu } from 'primereact/menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faCalendarDays, faCalendarCheck, faMoneyBill, faBook, faSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function SideBarMenu() {
    const navigate = useNavigate()
    const goto = (e, routerLink) => {
        console.log('e: ', e)
        console.log('routerLink: ', routerLink)
        // e.stopPropagation()
        // e.preventDefault()
        // navigate(routerLink)
    }

    const items = [
        {
            template: () => {
                return (
                    <div className="menu-subsystem">
                        <svg className="menu-item--icon" style={{fontSize: '0.9rem', height: '20px'}} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512">
                            <path
                                d="M94.1 315.1c0 25.9-21.2 47.1-47.1 47.1S0 341 0 315.1c0-25.9 21.2-47.1 47.1-47.1h47.1v47.1zm23.7 0c0-25.9 21.2-47.1 47.1-47.1s47.1 21.2 47.1 47.1v117.8c0 25.9-21.2 47.1-47.1 47.1s-47.1-21.2-47.1-47.1V315.1zm47.1-189c-25.9 0-47.1-21.2-47.1-47.1S139 32 164.9 32s47.1 21.2 47.1 47.1v47.1H164.9zm0 23.7c25.9 0 47.1 21.2 47.1 47.1s-21.2 47.1-47.1 47.1H47.1C21.2 244 0 222.8 0 196.9s21.2-47.1 47.1-47.1H164.9zm189 47.1c0-25.9 21.2-47.1 47.1-47.1 25.9 0 47.1 21.2 47.1 47.1s-21.2 47.1-47.1 47.1h-47.1V196.9zm-23.7 0c0 25.9-21.2 47.1-47.1 47.1-25.9 0-47.1-21.2-47.1-47.1V79.1c0-25.9 21.2-47.1 47.1-47.1 25.9 0 47.1 21.2 47.1 47.1V196.9zM283.1 385.9c25.9 0 47.1 21.2 47.1 47.1 0 25.9-21.2 47.1-47.1 47.1-25.9 0-47.1-21.2-47.1-47.1v-47.1h47.1zm0-23.7c-25.9 0-47.1-21.2-47.1-47.1 0-25.9 21.2-47.1 47.1-47.1h117.8c25.9 0 47.1 21.2 47.1 47.1 0 25.9-21.2 47.1-47.1 47.1H283.1z"/>
                        </svg>
                        HỘI NGHỊ HỘI THẢO
                    </div>
                )
            }
        },
        {
            label: 'Quản lý đề xuất sự kiện khoa học',
            icon: <FontAwesomeIcon icon={faCalendarPlus} className="menu-item--icon" />,
            command: () => {
                navigate('/hoinghihoithao/sukien-dexuat')
            }
        },
        {
            label: 'Quản lý tổ chức sự kiện khoa học',
            icon: <FontAwesomeIcon icon={faCalendarDays} className="menu-item--icon" />,
            command: () => {
                navigate('/hoinghihoithao/sukien-kehoach')
            }
        },
        {
            label: 'Điểm danh tham gia SKKH',
            icon: <FontAwesomeIcon icon={faCalendarCheck} className="menu-item--icon" />,
            command: () => {
                navigate('/hoinghihoithao/diemdanh-sukien')
            }
        },
        {
            label: 'Quản lý đóng phí',
            icon: <FontAwesomeIcon icon={faMoneyBill} className="menu-item--icon" />,
            command: () => {
                navigate('/hoinghihoithao/sukien-dongphi')
            }
        },
        {
            label: 'Tổng kết báo cáo SKKH',
            icon: <FontAwesomeIcon icon={faBook} className="menu-item--icon" />,
            command: () => {
                navigate('/hoinghihoithao/sukien-baocao')
            }
        }
    ];

    return (
        <div className="card flex justify-content-center sidebar-menu">
            <Menu model={items} className="menu"/>
        </div>
    );
}

export default SideBarMenu;
