import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl text-center">
        <div className="inline-flex items-center accent-bg px-3 py-1 text-xs text-accent mb-6 editorial-spacing">
          مبادرة مجتمعية
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 editorial-spacing">
          دة وقتكم
          <br />
          <span className="text-accent">مش وقتنا</span>
        </h1>
        
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          منصة لربط الجيل الجديد من رواد الأعمال المصريين بالخبراء والمستثمرين. 
          مستوحاة من رؤية محمد أبو النجا نجاتي.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/mentor-register"
            className="px-6 py-3 bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 editorial-spacing"
          >
            عايز أساعد ←
          </Link>
          <Link
            to="/seeker-register"
            className="px-6 py-3 border border-border text-foreground font-medium transition-all hover:bg-card editorial-spacing"
          >
            محتاج مساعدة
          </Link>
        </div>
      </div>
    </section>
  );
}
