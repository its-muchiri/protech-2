import { services } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';

export const metadata = {
  title: 'All Services | ProTech Consulting Kenya',
  description: 'Browse all 17+ professional services offered by ProTech Consulting. Construction, Solar, Plumbing, Security, Borehole Drilling and more.',
};

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(234,88,12,0.15) 0%, transparent 50%)',
        }} />
        <div className="container-custom" style={{ position: 'relative', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: '#fff',
            marginBottom: 16,
          }}>
            All Services
          </h1>
          <p style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Comprehensive multi-service solutions for your construction, commercial, and residential needs across Kenya
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ background: '#F0FDF4', padding: '80px 0' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 28,
          }}>
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
