import { services } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import BlogCarouselSection from '@/components/BlogCarouselSection';
import IconRenderer from '@/components/IconRenderer';
import LogoCarousel from '@/components/LogoCarousel';
import CertificationSection from '@/components/CertificationSection';
import Reveal from '@/components/Reveal';
import { governmentAuthorities } from '@/data/government-authorities';
import { kenyaCounties } from '@/data/kenya-counties';

const categoryGroups = [
  {
    id: 'construction',
    label: 'Construction & Infrastructure',
    icon: 'Building2',
    slugs: ['construction-civil-engineering', 'roofing-systems-waterproofing', 'architectural-design-house-plans', 'interior-design-office-fitouts', 'office-partitions-glass-works'],
  },
  {
    id: 'energy',
    label: 'Energy & Sustainability',
    icon: 'Sun',
    slugs: ['solar-power-renewable-energy', 'generator-sales-repair', 'electrical-installation-wiring', 'technical-repairs-appliance'],
  },
  {
    id: 'water',
    label: 'Water Systems & Drilling',
    icon: 'Droplets',
    slugs: ['water-filtration-purification', 'borehole-drilling-water-services', 'plumbing-drainage-services', 'swimming-pool-construction'],
  },
  {
    id: 'specialized',
    label: 'Specialized Services',
    icon: 'Shield',
    slugs: ['security-systems-physical-security', 'medical-equipment-supplies', 'logistics-freight-services', 'garage-automotive-services'],
  },
];

export default function ServicesPage() {
  const featuredServices = services.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #0D47A1 100%)',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(212,175,55,0.15) 0%, transparent 50%)',
        }} />
        <div className="container-custom" style={{ position: 'relative', textAlign: 'center' }}>
          <span className="glass-badge" style={{
            background: 'rgba(212,175,55,0.2)',
            border: '1px solid rgba(212,175,55,0.3)',
            color: '#D4AF37',
            padding: '8px 20px',
            fontSize: 12,
          }}>
            4 Core Categories · Nationwide Coverage · NCA, EPRA & NEMA Certified
          </span>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: '#fff',
            marginBottom: 24,
            lineHeight: 1.15,
          }}>
            Four Core Categories. One Standard of Excellence.
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: 720,
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}>
            From construction and solar to medical supplies and logistics — ProTech delivers integrated solutions for commercial, industrial, and residential clients across Kenya.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/request-a-quote" className="glass-btn-cta" style={{ padding: '14px 32px', fontSize: 16, borderRadius: 8, textDecoration: 'none', fontWeight: 600, color: '#fff' }}>
              Get a Custom Quote
            </a>
            <a href="/contact" className="glass-btn" style={{ padding: '14px 32px', fontSize: 16, borderRadius: 8, textDecoration: 'none', fontWeight: 600, color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="glass-section" style={{ background: 'rgba(255,255,255,0.6)', padding: '64px 0', margin: '24px auto', maxWidth: '1280px', borderRadius: 24 }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 36px)',
              color: '#1A1A1A',
              marginBottom: 16,
            }}>
              Our Flagship Services
            </h2>
            <p style={{
              fontSize: 17,
              color: '#334155',
              lineHeight: 1.7,
            }}>
              These six core services represent our deepest expertise and highest client demand. Each is backed by dedicated specialist teams and certified processes.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
          }}>
            {featuredServices.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 100}>
                <ServiceCard service={service} variant="featured" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section style={{ background: '#F5F7FA', padding: '80px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 36px)',
              color: '#1A1A1A',
              marginBottom: 16,
            }}>
              All Services by Category
            </h2>
            <p style={{
              fontSize: 17,
              color: '#334155',
              lineHeight: 1.7,
            }}>
              Explore our complete portfolio organized by service domain. Click any service to view detailed specifications, pricing, FAQs, and project galleries.
            </p>
          </div>

          {categoryGroups.map((group) => {
            const groupServices = services.filter(s => group.slugs.includes(s.slug));
            return (
              <section key={group.id} style={{ marginBottom: 60 }}>
                <div className="glass-card" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 28,
                  padding: '16px 20px',
                  borderBottom: 'none',
                }}>
                  <div className="glass" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(13,71,161,0.1)' }}>
                    <IconRenderer name={group.icon} size={24} style={{ color: '#0D47A1' }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: '#1A1A1A',
                    textTransform: 'capitalize',
                  }}>
                    {group.label}
                  </h3>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 20,
                }}>
                  {groupServices.map((service, i) => (
                    <Reveal key={service.slug} delay={(i % 3) * 100}>
                      <ServiceCard service={service} variant="compact" />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Why Choose ProTech */}
      <section className="glass-section" style={{ background: 'rgba(255,255,255,0.6)', padding: '64px 0', margin: '24px auto', maxWidth: '1280px', borderRadius: 24 }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 36px)',
              color: '#1A1A1A',
              marginBottom: 16,
            }}>
              Why Clients Choose ProTech
            </h2>
            <p style={{
              fontSize: 17,
              color: '#334155',
              lineHeight: 1.7,
            }}>
              We don&apos;t just deliver services — we build lasting partnerships through expertise, transparency, and accountability.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              { title: 'Multi-Disciplinary Expertise', description: 'One partner for construction, engineering, water, energy, security, medical, and logistics — eliminating vendor fragmentation.', icon: 'Building2' },
              { title: 'NCA & EPRA Certified', description: 'Fully licensed by the National Construction Authority and Energy & Petroleum Regulatory Authority for compliant project execution.', icon: 'Shield' },
              { title: 'Countrywide Coverage', description: 'Operations across all 47 counties with dedicated regional teams and local supply chains for rapid deployment.', icon: 'Truck' },
              { title: 'Turnkey Delivery', description: 'From concept and design through procurement, installation, commissioning, and ongoing maintenance — all in-house.', icon: 'Ruler' },
              { title: 'Transparent Pricing', description: 'Detailed BOQs, no hidden costs, milestone-based payments, and fixed-price options for defined scopes.', icon: 'Lightbulb' },
              { title: '24/7 Support', description: 'Emergency response teams for critical infrastructure — power, water, security, and medical equipment — with SLA-backed uptime.', icon: 'Wrench' },
            ].map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 100}>
                <div className="glass-card hover-lift" style={{
                  padding: '28px 24px',
                  height: '100%',
                }}>
                  <div className="glass" style={{ width: 48, height: 48, background: 'rgba(13,71,161,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <IconRenderer name={item.icon} size={24} style={{ color: '#0D47A1' }} />
                  </div>
                  <h4 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#1A1A1A',
                    marginBottom: 8,
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service Delivery Process */}
      <section className="glass-section glass-dark" style={{ background: 'rgba(13,71,161,0.9)', padding: '64px 0', margin: '24px auto', maxWidth: '1280px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 36px)',
              color: '#fff',
              marginBottom: 16,
            }}>
              Our Service Delivery Process
            </h2>
            <p style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
            }}>
              A structured, transparent workflow ensures every project — large or small — meets quality, timeline, and budget commitments.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
            position: 'relative',
          }}>
            {[
              { step: '01', title: 'Consultation & Site Survey', desc: 'Free initial consultation, site assessment, and requirement gathering by our technical team.', accent: '#D4AF37', bg: 'rgba(212,175,55,0.15)', border: 'rgba(212,175,55,0.4)' },
              { step: '02', title: 'Design & Proposal', desc: 'Detailed scope, BOQ, timeline, and 3D visualizations where applicable. Presented for client approval.', accent: '#0D47A1', bg: 'rgba(13,71,161,0.15)', border: 'rgba(13,71,161,0.4)' },
              { step: '03', title: 'Approvals & Permits', desc: 'We handle NCA, NEMA, county government, and EPRA approvals — ensuring full regulatory compliance.', accent: '#1E3A8A', bg: 'rgba(30,58,138,0.15)', border: 'rgba(30,58,138,0.4)' },
              { step: '04', title: 'Procurement & Mobilization', desc: 'Materials sourced from vetted suppliers. Teams mobilized with safety briefings and project schedules.', accent: '#6A1B9A', bg: 'rgba(106,27,154,0.15)', border: 'rgba(106,27,154,0.4)' },
              { step: '05', title: 'Execution & Supervision', desc: 'Certified project managers oversee daily operations with quality checks at every milestone.', accent: '#0D47A1', bg: 'rgba(13,71,161,0.15)', border: 'rgba(13,71,161,0.4)' },
              { step: '06', title: 'Testing, Handover & Support', desc: 'Commissioning tests, client walkthrough, documentation handover, and warranty activation.', accent: '#D4AF37', bg: 'rgba(212,175,55,0.15)', border: 'rgba(212,175,55,0.4)' },
            ].map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 100}>
                <div className="glass-card-hover" style={{ padding: '32px 26px', textAlign: 'center', background: item.bg, border: `2px solid ${item.border}` }}>
                  <div style={{
                    width: 64, height: 64, margin: '0 auto 22px',
                    background: `linear-gradient(135deg, ${item.accent} 0%, ${item.accent}CC 100%)`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800, fontSize: 20, color: '#fff',
                    boxShadow: `0 8px 24px ${item.accent}40`,
                    border: '3px solid rgba(255,255,255,0.2)',
                }}>
                  {item.step}
                </div>
                <h4 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#fff',
                  marginBottom: 10,
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, fontWeight: 400 }}>
                  {item.desc}
                </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Accreditations */}
      <CertificationSection />

      {/* CTA Section */}
      <section className="glass-section glass-dark" style={{ background: 'rgba(13,71,161,0.9)', padding: '64px 0', margin: '24px auto', maxWidth: '1280px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-custom" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 36px)',
            color: '#fff',
            marginBottom: 16,
          }}>
            Ready to Start Your Project?
            </h2>
          <p style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            Get a detailed proposal with timelines, cost breakdown, and compliance roadmap — free consultation for new clients.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/request-a-quote" className="glass-btn-cta" style={{ padding: '14px 32px', fontSize: 16, borderRadius: 8, textDecoration: 'none', fontWeight: 600, color: '#fff' }}>
              Request a Quote
            </a>
            <a href="tel:0725310112" className="glass-btn" style={{ padding: '14px 32px', fontSize: 16, borderRadius: 8, textDecoration: 'none', fontWeight: 600, color: '#fff', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(37,211,102,0.9)' }}>
              Call 0725310112
            </a>
          </div>
        </div>
      </section>

      {/* Regulatory Authorities */}
      <section className="section-tighter bg-gradient-to-b from-secondary-50/50 to-white">
        <div className="container-custom">
          <LogoCarousel
            items={governmentAuthorities}
            title="Regulatory Authorities & Certifications"
            subtitle="We operate under the strict oversight of Kenya's key regulatory bodies"
            itemsPerView={4}
            interval={1000}
            className="mb-16"
          />
        </div>
      </section>

      {/* Counties We Serve */}
      <section className="section-tighter bg-gradient-to-b from-surface-50/50 to-white">
        <div className="container-custom">
          <LogoCarousel
            items={kenyaCounties.slice(0, 20)}
            title="Counties We Serve"
            subtitle="Proudly delivering services across 20+ counties in Kenya"
            itemsPerView={6}
            interval={1000}
            className="mb-16"
          />
        </div>
      </section>

      <BlogCarouselSection
        title="Service Guides & Insights"
        subtitle="Read in-depth guides related to our services across Kenya."
        limit={9}
      />
    </div>
  );
}
