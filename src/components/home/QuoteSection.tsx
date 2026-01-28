export function QuoteSection() {
  return (
    <section className="py-12">
      <div className="container max-w-3xl">
        <div className="p-6 md:p-8 bg-card border border-border">
          <div className="text-xs text-muted-foreground mb-4 editorial-spacing">
            محمد أبو النجا نجاتي — ٢٠٢٦
          </div>
          <blockquote className="text-foreground italic text-base md:text-lg leading-relaxed quote-border">
            "جيلي والأكبر مني محتاجين ناخد خطوة لورا ونبقى مسهلين لصعود جيل جديد من المستثمرين ورواد الأعمال..."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
