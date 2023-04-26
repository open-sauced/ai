import { useContext, useEffect, useState } from 'react';
import { FaBrain, FaChevronLeft, FaRobot } from 'react-icons/fa';
import { RiLinkedinFill, RiLinkM, RiTwitterFill } from 'react-icons/ri';
import { AiOutlineReload } from 'react-icons/ai';
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { getUserData, getUserPRData } from '../utils/fetchOpenSaucedApiData';
import { RouteContext } from '../App';

export const Profile = () => {
  const { page, setCurrentPage } = useContext(RouteContext)
  return (
    <div className="text-white">
      <p>{page.props.userName}</p>
    </div>
  )
}