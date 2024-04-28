import  { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesandMutations'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const LeftSideBar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate();
    const {user} = useUserContext();

    useEffect(() => {
        if(isSuccess) navigate(0);
    }, [isSuccess])

  return (
    <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
        <Link to="/" className='flex gap-3 item-center'>
                {/* <img 
                src="/assets/images."
                alt="logo"
                /> */}
                <h2 className="h3-bold md:h4-bold sm:pt-1 text-light-3" >ProGram</h2>
            </Link>
            <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                <img 
                src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
                alt='imageprofile'
                className='h-14 w-14 rouded-full'
                />
                <div className='flex flex-col'>
                    <p className='body-bold'>
                        {user.name}
                    </p>
                    <p className='small-regular text-light-3'>
                       @{user.username}
                    </p>
                </div>
                </Link>

                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link: INavLink) => {
                        return(
                            <li
                            className="leftsidebar-link"
                            key={link.label}
                            >
                                <NavLink
                                 to="link.route" 
                                 className="flex gap-4 items-center p-4"
                                >
                                    <img 
                                    src={link.imgURL}
                                    alt={link.label}
                                    className='group-hover:invert-white '
                                    />
                                 {link.label}
                            </NavLink>
                            </li>
                          
                        )
                    })}

                </ul>
        </div>
    </nav>
  )
}

export default LeftSideBar