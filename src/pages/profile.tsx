import { useContext, useEffect, useState } from 'react';
import { FaBrain, FaChevronLeft, FaRobot } from 'react-icons/fa';
import { RiLinkedinFill, RiLinkM, RiTwitterFill } from 'react-icons/ri';
import { AiOutlineReload } from 'react-icons/ai';
import { SiC, SiCplusplus, SiCsharp, SiGoland, SiJavascript, SiPhp, SiPython, SiReact, SiRuby, SiRust, SiTypescript } from 'react-icons/si';
import { DiJava } from 'react-icons/di'
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { getUserData, getUserPRData } from '../utils/fetchOpenSaucedApiData';
import { RouteContext } from '../App';

const interestIcon = {
  'python': <SiPython />,
  'java': <DiJava />,
  'javascript': <SiJavascript />,
  'typescript': <SiTypescript />,
  'csharp': <SiCsharp />,
  'cpp': <SiCplusplus />,
  'c': <SiC />,
  'php': <SiPhp />,
  'ruby': <SiRuby />,
  'react': <SiReact />,
  'ml': <FaBrain />,
  'ai': <FaRobot />,
  'golang': <SiGoland />,
  'rust': <SiRust />
}

type InterestIconKeys = keyof typeof interestIcon;

export const Profile = () => {
  const { page, setCurrentPage } = useContext(RouteContext)
  const [user, setUser] = useState<null | { id: string, user_name: string, bio: string, created_at: string, linkedin_url: string, twitter_username: string, url: string, interests: string, open_issues: number }>(null)
  const [userPR, setUserPR] = useState<null | { meta: {itemCount: number} }>(null)

  useEffect(() => {
    getUserData(page.props.userName).then((data) => { setUser(data)})
    getUserPRData(page.props.userName).then((data) => { setUserPR(data)})
  }, [])


  return (
    <div className="grid grid-cols-1 divide-y divider-y-center-2 min-w-[320px] text-white">
      <header className='flex justify-between'>
        <div className="flex items-center gap-2">
          <button onClick={() => { setCurrentPage("home") }} className='rounded-full p-2 bg-slate-700 hover:bg-slate-700/50'>
            <FaChevronLeft className='text-osOrange' />
          </button>
          <img src={OpenSaucedLogo} alt="OpenSauced logo" className='w-[100%]' />
        </div>
        <button 
          title='Refresh user data'
          className='hover:text-orange text-lg' 
          onClick={() => {
            getUserData(page.props.userName, true).then((data) => { setUser(data)})
            getUserPRData(page.props.userName, true).then((data) => { setUserPR(data)})
          }}>
          <AiOutlineReload />
        </button>
      </header>
      <main>
        <div className='flex flex-col items-center gap-1 mb-4'>
          <img
            src={`https://github.com/${page.props.userName}.png`}
            alt="profile image"
            className='rounded-full w-14 aspect-square p-1 bg-slate-700' />
          <p className='font-medium'>@{page.props.userName}</p>
          {(user?.linkedin_url || user?.twitter_username) &&
            <div className='social flex gap-0.5'>
              {user?.linkedin_url &&
                <a 
                  target={'_blank'}
                  href={user.linkedin_url} 
                  title={user.linkedin_url} 
                  className='rounded-sm border bg-slate-700 hover:bg-slate-700/50 hover:text-orange p-1'>
                  <RiLinkedinFill className='text-lg' />
                </a>
              }
              {user?.twitter_username &&
                <a 
                  target={'_blank'}
                  href={`https://twitter.com/${user.twitter_username}`} 
                  title={`https://twitter.com/${user.twitter_username}`} 
                  className='rounded-sm border bg-slate-700 hover:bg-slate-700/50 hover:text-orange p-1'>
                  <RiTwitterFill className='text-lg' />
                </a>
              }
            </div>
          }
          {user?.bio && <span>{user.bio}</span>}
          {user?.url &&
            <a target={'_blank'} href={user.blog_url} className='flex text-orange items-center gap-0.5'>
              <RiLinkM />
              {user.url}
            </a>
          }
        </div>
        <div className='grid grid-cols-2 text-white bg-osOrange -mx-4 mb-4 p-4 py-8'>
          <div className='flex flex-col items-center justify-center p-2 text-xs'>
            <p>Open Issues</p>
            <p className='font-medium text-5xl'>{user?.open_issues}</p>
          </div>
          <div className='flex flex-col items-center justify-center p-2 text-xs'>
            <p>PRs Made</p>
            <p className='font-medium text-5xl'>{userPR?.meta.itemCount}</p>
          </div>
          <div className='flex flex-col items-center justify-center p-2 text-xs'>
            <p>Avg PRs Velocity</p>
            <p className='font-medium text-5xl'>-</p>
          </div>
          <div className='flex flex-col items-center justify-center p-2 text-xs'>
            <p>Contributed Repos</p>
            <p className='font-medium text-5xl'>-</p>
          </div>
        </div>
        {
          <div>
            <h2 className='font-medium text-lg mb-2'>Current Interest</h2>
            <div className='flex gap-1.5' style={{flexWrap: 'wrap'}}>
              {user?.interests.split(',').map((interest) => (
                <a target="_blank" key={interest}
                  href={`https://insights.opensauced.pizza/${interest}/dashboard/filter/recent`} 
                  title={`https://insights.opensauced.pizza/${interest}/dashboard/filter/recent`} 
                  className='flex gap-1 items-center p-1.5 px-4 rounded-full bg-slate-700 hover:bg-slate-700/50'>
                  {interestIcon[interest as InterestIconKeys] ?? null}
                  {interest}
                </a>
              )
              )}
            </div>
          </div>
        }
      </main>
    </div>
  )
}