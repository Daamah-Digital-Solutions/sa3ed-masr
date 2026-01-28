import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface UserMenuProps {
  onAction?: () => void;
}

export function UserMenu({ onAction }: UserMenuProps) {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
    } else {
      toast({
        title: "تم تسجيل الخروج",
      });
      navigate('/');
    }
    onAction?.();
  };

  if (loading) {
    return <span className="text-muted-foreground text-sm">...</span>;
  }

  if (!user) {
    return (
      <Link
        to="/auth"
        onClick={onAction}
        className="px-4 py-2 text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors editorial-spacing rounded-lg inline-block"
      >
        تسجيل الدخول
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Link
        to="/profile"
        onClick={onAction}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {user.email?.split('@')[0]}
      </Link>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 text-sm border border-border hover:bg-muted transition-colors editorial-spacing rounded-lg"
      >
        خروج
      </button>
    </div>
  );
}
