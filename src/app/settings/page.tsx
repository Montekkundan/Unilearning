import { Separator } from "@/components/ui/Separator";
import { ProfileForm } from "./ProfileForm";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsProfilePage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm  user={{
              id: session.user.id,
              username: session.user.username || '',
            }} />
    </div>
  )
}