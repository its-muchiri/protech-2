import { services } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import BlogCarouselSection from '@/components/BlogCarouselSection';
import { Building2, Sun, Droplets, Wrench, Home, Shield, Car, Drill, Ruler, Zap, Lightbulb, Sofa, Frame, Truck, Heart } from 'lucide-react';

export const metadata = {
  title: 'All Services | ProTech Consulting Kenya',
  description: 'Browse all 17+ professional services offered by ProTech Consulting. Construction, Solar, Plumbing, Security, Borehole Drilling and more.',
};

const categoryGroups = [
  {
    id: 'construction',
    label: 'Construction & Property',
    icon: Building2,
    slugs: ['construction-civil-engineering', 'swimming-pool-construction', 'roofing-systems-waterproofing', 'architectural-design-house-plans', 'interior-design-office-fitouts', 'office-partitions-glass-works'],
  },
  {
    id: 'engineering',
    label: 'Engineering & Technical',
    icon: Wrench,
    slugs: ['solar-power-renewable-energy', 'generator-sales-repair', 'electrical-installation-wiring', 'technical-repairs-appliance', 'plumbing-drainage-services'],
  },
  {
    id: 'water',
    label: 'Water & Environment',
    icon: Droplets,
    slugs: ['water-filtration-purification', 'borehole-drilling-water-services'],
  },
  {
    id: 'specialized',
    label: 'Specialized Services',
    icon: Shield,
    slugs: ['security-systems-physical-security', 'medical-equipment-supplies', 'logistics-freight-services', 'garage-automotive-services'],
  },
];

const iconMap = {
  Building2, Sun, Droplets, Wrench, Home, Shield, Car, Drill, Ruler, Zap, Lightbulb, Sofa, Frame, Truck, Heart
};

export default function ServicesPage() {
  const featuredServices = services.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(234,88,12,0.15) 0%, transparent 50%)',
        }} />
        <div className="container-custom" style={{ position: 'relative', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(234,88,12,0.2)',
            border: '1px solid rgba(234,88,12,0.3)',
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 600,
            color: '#EA580C',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 24,
          }}>
            17+ Professional Services · Nationwide Coverage · NCA & EPRA Certified
          </span>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: '#fff',
            marginBottom: 24,
            lineHeight: 1.15,
          }}>
            Comprehensive Multi-Service Solutions
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
            <a href="/request-a-quote" className="btn-cta" style={{ padding: '14px 32px', fontSize: 16 }}>
              Get a Custom Quote
            </a>
            <a href="/contact" className="btn-outline" style={{ padding: '14px 32px', fontSize: 16, borderColor: '#fff', color: '#fff' }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 36px)',
              color: '#0B1F3A',
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
            gap: 28,
          }}>
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section style={{ background: '#F0FDF4', padding: '80px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 36px)',
              color: '#0B1F3A',
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
            const Icon = iconMap[group.icon];
            return (
              <section key={group.id} style={{ marginBottom: 60 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 28,
                  paddingBottom: 12,
                  borderBottom: '2px solid #0F4C2C',
                }}>
                  <Icon size={24} style={{ color: '#0F4C2C' }} />
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: '#0B1F3A',
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
                  {groupServices.map((service) => (
                    <ServiceCard key={service.slug} service={service} variant="compact" />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Why Choose ProTech */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 36px)',
              color: '#0B1F3A',
              marginBottom: 16,
            }}>
              Why Clients Choose ProTech
            </h2>
            <p style={{
              fontSize: 17,
              color: '#334155',
              lineHeight: 1.7,
            }}>
              We don't just deliver services — we build lasting partnerships through expertise, transparency, and accountability.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              { title: 'Multi-Disciplinary Expertise', description: 'One partner for construction, engineering, water, energy, security, medical, and logistics — eliminating vendor fragmentation.', icon: Building2 },
              { title: 'NCA & EPRA Certified', description: 'Fully licensed by the National Construction Authority and Energy & Petroleum Regulatory Authority for compliant project execution.', icon: Shield },
              { title: 'Countrywide Coverage', description: 'Operations across all 47 counties with dedicated regional teams and local supply chains for rapid deployment.', icon: Truck },
              { title: 'Turnkey Delivery', description: 'From concept and design through procurement, installation, commissioning, and ongoing maintenance — all in-house.', icon: Ruler },
              { title: 'Transparent Pricing', description: 'Detailed BOQs, no hidden costs, milestone-based payments, and fixed-price options for defined scopes.', icon: Lightbulb },
              { title: '24/7 Support', description: 'Emergency response teams for critical infrastructure — power, water, security, and medical equipment — with SLA-backed uptime.', icon: Wrench },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '32px 24px',
                background: '#F0FDF4',
                borderRadius: 12,
                border: '1px solid #DCFCE7',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ width: 48, height: 48, background: '#0F4C2C', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <item.icon size={24} style={{ color: '#fff' }} />
                </div>
                <h4 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#0B1F3A',
                  marginBottom: 8,
                }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Delivery Process */}
      <section style={{ background: '#0B1F3A', padding: '80px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
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
              { step: '01', title: 'Consultation & Site Survey', desc: 'Free initial consultation, site assessment, and requirement gathering by our technical team.' },
              { step: '02', title: 'Design & Proposal', desc: 'Detailed scope, BOQ, timeline, and 3D visualizations where applicable. Presented for client approval.' },
              { step: '03', title: 'Approvals & Permits', desc: 'We handle NCA, NEMA, county government, and EPRA approvals — ensuring full regulatory compliance.' },
              { step: '04', title: 'Procurement & Mobilization', desc: 'Materials sourced from vetted suppliers. Teams mobilized with safety briefings and project schedules.' },
              { step: '05', title: 'Execution & Supervision', desc: 'Certified project managers oversee daily operations with quality checks at every milestone.' },
              { step: '06', title: 'Testing, Handover & Support', desc: 'Commissioning tests, client walkthrough, documentation handover, and warranty activation.' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative', padding: '32px 24px', textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, #EA580C 0%, #0F4C2C 100%)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700, fontSize: 18, color: '#fff',
                }}>
                  {item.step}
                </div>
                <h4 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 17,
                  color: '#fff',
                  marginBottom: 8,
                }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Accreditations */}
      <section style={{ background: '#F0FDF4', padding: '60px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: 20,
              color: '#0B1F3A',
              marginBottom: 8,
            }}>
              Certifications & Accreditations
            </h3>
            <p style={{ color: '#334155', maxWidth: 600, margin: '0 auto' }}>
              All our operations comply with Kenyan regulatory standards and international best practices.
            </p>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 20,
            alignItems: 'center',
          }}>
            {['NCA Registered', 'EPRA Licensed', 'NEMA Compliant', 'ERC Certified', 'ISO 9001:2015', 'KRA Tax Compliant', 'Ministry of Health Approved', 'County Government Approved'].map((cert, i) => (
              <span key={i} style={{
                padding: '10px 20px',
                background: '#fff',
                border: '1px solid #DCFCE7',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                color: '#0F4C2C',
              }}>
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)', padding: '80px 0' }}>
        <div className="container-custom" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
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
            <a href="/request-a-quote" className="btn-cta" style={{ padding: '14px 32px', fontSize: 16 }}>
              Request a Quote
            </a>
            <a href="tel:0725310112" className="btn-whatsapp" style={{ padding: '14px 32px', fontSize: 16 }}>
              Call 0725310112
            </a>
          </div>
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
