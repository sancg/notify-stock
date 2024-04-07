import { ProfileForm } from '@/components/ProfileForm';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="h-[100dvh] grid justify-center place-items-center">
      <ProfileForm />
    </main>
  );
}
