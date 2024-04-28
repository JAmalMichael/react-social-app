import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import { AllUsers, EditPost, Explore, Home, LikedPosts, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import './globals.css';
import { Routes, Route } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from './components/ui/toaster';
import CreatePost from './_root/pages/CreatePost';


const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            <Route element={<AuthLayout />}>
            {/* public Routes */}
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
            </Route>
      

            {/* private routes */}
            <Route element={<RootLayout/>}>
            <Route index element={<Home />}/>
            <Route  path='/explore' element={<Explore />} />
            <Route  path='/saved' element={<Saved />} />
            <Route  path='/all-users' element={<AllUsers />} />
            <Route  path='/create-post' element={<CreatePost />} />
            <Route  path='/update-post/:id' element={<EditPost />} />
            <Route  path='/posts/:id' element={<PostDetails />} />
            <Route  path='/profile/:id/*' element={<Profile />} />
            <Route  path='/update-profile/:id' element={<UpdateProfile />} />
            <Route  path='/likedposts' element={<LikedPosts />} />
            </Route>

        </Routes>
        <Toaster />
    </main>
  )
}

export default App