import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogClose,
  type AlertDialogFlipDirection,
} from '@/components/animate-ui/primitives/base/alert-dialog';

type BaseAlertDialogDemoProps = {
  from: AlertDialogFlipDirection;
};

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseAuth } from '@/hooks/useAuth';
import { LoaderCircle, Trash2, User2 } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { useState } from 'react';
import {ChangePassword, DeleteAccount, tokenManager, UpdateAccount, UserManager, type ChangePasswordRequest, type UpdateRequest } from '@/hooks/auth';
import { useNavigate } from 'react-router-dom';



export function Account({ from }: BaseAlertDialogDemoProps) {

    const {user, isAuthenticated} = UseAuth()
    const navigate =useNavigate()
    const[update, setUpdate] =useState<UpdateRequest>({
      fullName: user?.fullName || "",
  email: user?.email || ""
    }) 
    const [changePassword, SetChangePassword] = useState<ChangePasswordRequest>({
      oldPassword: "",
      newPassword: ""
    })
    const [loading, setLoading]= useState(false)
    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState<string>()

   const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdate({ ...update, [e.target.id]: e.target.value });
  };

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetChangePassword({ ...changePassword, [e.target.id]: e.target.value })
  };


  // Handles the Update account submit
  const handleUpdateAccount = async (e: React.FormEvent)=>{
    e.preventDefault()

    if(!isAuthenticated){
      setError("You are not authenticated")
      return
    }

    setLoading(true)
    try{
      const response = await UpdateAccount(update)
      setSuccess(response.message)
      
       const updatedUser = { ...user, ...update };
    localStorage.setItem('authUser', JSON.stringify(updatedUser));

    }catch(err){ 
      setError("Invalid email or user name")
    throw err 
  }finally{
    setLoading(false)
  }
  }

  // Handle Change password submit

  const handleChangePasswordSubmit = async (e: React.FormEvent )=>{
    e.preventDefault()

    if(!isAuthenticated){
      setError("You're not authenticated")
    }

    setLoading(true)

    try{
      const response = await ChangePassword(changePassword)
      setSuccess("Password Changed Sucessful")
      UserManager.removeUser()
      tokenManager.removeToken()
      navigate('/auth/login')
      console.log(response.status)


    }catch(error){
      setError('Invalid current password')
    }finally{
      setLoading(false)
    }
  }

  // Handle Delete account
  const handleDeleteAccount = async ()=>{
    setLoading(true)
    try{
      const response = await DeleteAccount()
      window.alert('Account Deleted')
      navigate('/auth/signup')
      tokenManager.removeToken()
      UserManager.removeUser()
    }catch(err){
      throw err
      setError('No auth header found')
    }finally{
      setLoading(false)
    }
  }

  return (

    <div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-7'>

        <div>
            <Card className='border-0 h-70 bg-[#02204b]'>

                <div className='p-6 flex flex-wrap justify-center mt-5'>

                  <div className="mb-2">
                    <Avatar className="h-25 w-25  ">
               <AvatarImage alt={user?.fullName} />
               <AvatarFallback className="rounded-2xl">
                 <User2 size={48} />
               </AvatarFallback>
             </Avatar>
                  </div>

                  <div className="flex flex-col justify-center ml-10 ">
                    <p className='text-2xl text-gray-100 font-semibold mb-3'>{user?.fullName}</p>
                    <p className='text-sm text-gray-300'>{user?.email}</p>
                  </div>
                </div>
            </Card>
        </div>

    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs className='h-100 ' defaultValue="account">
        <TabsList className='bg-[#02204b]'>
          <TabsTrigger className='' value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger className=" " value="delete">Delete Account</TabsTrigger>
        </TabsList>
        <Card className="shadow-none py-0 border-0">
          <TabsContents className="py-6 bg-[#02204b] rounded-2xl border-1 border-gray-400">

            {/* Account Tab */}
            <TabsContent value="account" className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle className='text-gray-100'>Account</CardTitle>
                <CardDescription className='text-gray-200'>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              {/* Form for update */}
              <form className='flex flex-col gap-6' onSubmit={handleUpdateAccount}>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label className='text-gray-100' htmlFor="fullName">Full Name</Label>
                  <Input value={update.fullName} onChange={handleUpdateChange} className='text-sm h-11 font-light text-gray-200' id="fullName" placeholder={user?.fullName} />
                </div>
              </CardContent>
              <CardContent className="grid gap-6">
                <div className="grid gap-3 ">
                  <Label className='text-gray-100' htmlFor="email">Email</Label>
                  <Input onChange={handleUpdateChange} value={update.email} className='text-sm font-light h-11 text-gray-200' id="email" placeholder={user?.email} />
                </div>

                {error && (
                  <div className="rounded-md bg-red-500/20 p-3 border border-red-500/30">
                    <p className="text-red-300 text-sm text-center">{error}</p>
                  </div>
                )}

                 {success && (
                  <p className="text-green-400 bg-blue-950 border border-gray-700 rounded-xl p-3 text-center mt-1">
                    {success}. <a onClick={() => window.location.reload()}> <u className='text-blue-500'>Refresh!</u> </a>
                  </p>
                )}
              </CardContent>

              <CardFooter>
                <Button type='submit' disabled={loading}
                className='bg-orange-600 hover:bg-orange-600/90'>
                {loading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
              </form>
            </TabsContent>




            {/* Changing password Tab */}
            <TabsContent value="password" className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle className='text-gray-100'>Password</CardTitle>
                <CardDescription className='text-gray-300'>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>


              <form className='flex flex-col gap-6' onSubmit={handleChangePasswordSubmit}>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label className='text-gray-100' htmlFor="current password">Current password</Label>
                  <Input className='text-xl font-light text-gray-200 h-11' id="oldPassword" value={changePassword.oldPassword} onChange={handlePasswordChange}  type="password"
                  placeholder='••••••••' />
                </div>
                <div className="grid gap-3">
                  <Label className='text-gray-100' htmlFor="new-password">New password</Label>
                  <Input className='text-xl font-light h-11 text-gray-200' id="newPassword" value={changePassword.newPassword} onChange={handlePasswordChange} type="password"
                  placeholder='••••••••' />
                </div>
              </CardContent>
              {error && (
                  <div className="rounded-md bg-red-500/20 p-3 ml-6 mr-6 border border-red-500/30">
                    <p className="text-red-300 text-sm text-center">{error}</p>
                  </div>
                )}

                
              <CardFooter>
                <Button type='submit' disabled={loading}
                className='bg-orange-600 hover:bg-orange-600/90'>
                {loading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Password"
                  )}
                </Button>
              </CardFooter>
              </form>
            </TabsContent>

            {/* Delete Account Tab */}
            <TabsContent value="delete" className="flex flex-col justify-center ml-10 p-10 gap-6">
               <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 rounded-lg w-50 text-primary-foreground px-4 py-2 text-sm flex gap-2"><Trash2 size={19}/>
        Delete Account
      </AlertDialogTrigger>

      <AlertDialogPortal>
        <AlertDialogBackdrop className="fixed inset-0 z-50 bg-black/80" />
        <AlertDialogPopup
          from={from}
          className="sm:max-w-md fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50  bg-[#ffffff] rounded-2xl p-6 "
        >
          <AlertDialogHeader>
            <AlertDialogTitle className=" font-semibold mb-4">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4 flex justify-end gap-2">
            <AlertDialogClose className="bg-blue-900 rounded-sm text-white px-4 py-2 text-sm">
              Cancel
            </AlertDialogClose>
            <AlertDialogClose onClick={handleDeleteAccount} disabled={loading} className="bg-red-600 rounded-sm text-primary-foreground px-4 py-2 text-sm">
               {loading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialogPortal>
    </AlertDialog>
            </TabsContent>
          </TabsContents>
        </Card>
      </Tabs>
    </div>
    </div>

  );
}

export default Account