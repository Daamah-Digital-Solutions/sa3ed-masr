import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

export default function Welcome() {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center accent-bg px-3 py-1 text-xs text-accent mb-6 editorial-spacing">
            مرحباً بك
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4 md:mb-6 editorial-spacing">
            أهلاً بيك في مجتمع
            <br />
            <span className="text-accent">ساعد مصر</span>
          </h1>

          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto leading-relaxed px-4">
            انضمامك معانا خطوة مهمة في دعم منظومة ريادة الأعمال المصرية.
            سواء جاي تساعد أو محتاج مساعدة، إحنا هنا عشان نوصّلك بالناس الصح.
          </p>
        </div>

        {/* Quote */}
        <div className="max-w-md mx-auto mb-10 md:mb-16 px-4">
          <div className="relative bg-card border border-border rounded-lg p-5 md:p-6">
            <span className="absolute -top-3 right-6 bg-background px-2 text-accent text-2xl">"</span>
            <p className="text-lg md:text-xl font-bold mb-2">
              دة وقتكم <span className="text-accent">مش وقتنا</span>
            </p>
            <p className="text-muted-foreground text-xs md:text-sm">
              — الرؤية اللي بنؤمن بيها
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-center text-lg md:text-xl font-semibold mb-6 md:mb-8 editorial-spacing">
            إيه الخطوة الجاية؟
          </h2>

          {/* CTA Cards */}
          <div className="grid gap-4 md:grid-cols-2 mb-8 md:mb-10">
            {/* Card 1 - Mentor */}
            <Link
              to="/mentor-register"
              className="group relative overflow-hidden bg-card border border-border rounded-xl p-5 md:p-6 hover:border-accent transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl md:text-3xl">
                  💪
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold mb-1">عايز أساعد</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 leading-relaxed">
                    شارك خبرتك وساعد الجيل الجديد من رواد الأعمال
                  </p>
                  <span className="inline-flex items-center text-accent text-sm font-medium">
                    سجل كمنتور
                    <svg className="w-4 h-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 2 - Seeker */}
            <Link
              to="/seeker-register"
              className="group relative overflow-hidden bg-card border border-border rounded-xl p-5 md:p-6 hover:border-accent transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl md:text-3xl">
                  🚀
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold mb-1">محتاج مساعدة</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 leading-relaxed">
                    احكيلنا عن مشروعك وهنوصلك بالخبراء المناسبين
                  </p>
                  <span className="inline-flex items-center text-accent text-sm font-medium">
                    سجل مشروعك
                    <svg className="w-4 h-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Browse Links */}
          <div className="text-center border-t border-border pt-6 md:pt-8">
            <p className="text-muted-foreground text-xs md:text-sm mb-4">
              أو تصفح المنتورز والمشاريع الأول
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/mentors"
                className="px-4 py-2 text-xs md:text-sm border border-border rounded-lg hover:bg-muted transition-colors"
              >
                تصفح المنتورز
              </Link>
              <Link
                to="/projects"
                className="px-4 py-2 text-xs md:text-sm border border-border rounded-lg hover:bg-muted transition-colors"
              >
                تصفح المشاريع
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
