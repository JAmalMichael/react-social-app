import  { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesandMutations'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate();
    const {user} = useUserContext();

    useEffect(() => {
        if(isSuccess) navigate(0);
    }, [isSuccess])

  return (
    <section className='topbar'>
        <div className='flex-between py-3 px-5'>
            <Link to="/" className='flex gap-3 item-center'>
                {/* <img 
                src="/assets/images."
                alt="logo"
                /> */}
                <h2 className="h3-bold md:h4-bold sm:pt-1 text-light-3" >ProGram</h2>
            </Link>
            <div className='flex gap-4'>
                <Button variant="ghost" className='shad-button_ghost' onClick={() => signOut()} >
                    <img src="/assets/icons/logout.svg" alt="logout" />
                </Button>
                <Link to={`/profile/${user.id}`} className='flex-cneter gap-3'>
                <img 
                src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
                alt='imageprofile'
                className='h-8 w-8 rouded-full'
                />
                </Link>
            </div>
        </div>
        </section>
  )
}

export default Topbar