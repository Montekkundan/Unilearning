import { Separator } from "@/components/ui/Separator";
import { DisplayForm } from "./DisplayForm";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { HomeScreen } from "@prisma/client";


export default async function SettingsDisplayPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-sm text-muted-foreground">
          Turn items on or off to control what&apos;s displayed in the app.
        </p>
      </div>
      <Separator />
      <DisplayForm user={{
  id: session.user.id,
  homeScreen: session.user.homeScreen as HomeScreen || null,
}} />
    </div>
  )
}