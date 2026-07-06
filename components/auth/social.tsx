"use client"

import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social = () => {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })

  }
  return (
    <div className="w-full">
      <Button
        className="w-full cursor-pointer"
        size="lg"
        variant="outline"
        onClick={ () => onClick("google")}
      >
        <FcGoogle style={{ width: '25px', height: '25px' }} />
      </Button>
    </div>
  )
}