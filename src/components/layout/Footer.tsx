export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container text-center">
        <p className="text-sm text-muted-foreground editorial-spacing">
          ساعد.مصر · مبادرة مجتمعية · ٢٠٢٦
        </p>
        <p className="text-xs text-muted-foreground/60 mt-2 italic">
          "نركز على تكوين فريق واحد اسمه سوق مصر"
        </p>
        <p className="text-xs text-muted-foreground/50 mt-4">
          صُنع بكل حب بواسطة{' '}
          <a
            href="https://daamah.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            دَعمة للحلول الرقمية
          </a>
        </p>
      </div>
    </footer>
  );
}
