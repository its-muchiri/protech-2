export default function TrustBadges() {
  const badges = [
    { name: 'NCA', label: 'National Construction Authority', color: 'bg-blue-50 border-blue-200' },
    { name: 'EPRA', label: 'Energy & Petroleum Regulatory Authority', color: 'bg-green-50 border-green-200' },
    { name: 'NEMA', label: 'National Environment Management Authority', color: 'bg-emerald-50 border-emerald-200' },
    { name: 'KRA', label: 'Kenya Revenue Authority', color: 'bg-purple-50 border-purple-200' },
    { name: 'ERC', label: 'Energy Regulatory Commission', color: 'bg-amber-50 border-amber-200' },
    { name: 'ISO', label: 'ISO 9001 Certified', color: 'bg-indigo-50 border-indigo-200' },
  ];

  return (
    <div className="bg-white py-8">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <div key={i} className={`trust-badge ${badge.color}`}>
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                <span className="font-heading font-bold text-lg text-navy-800">{badge.name}</span>
              </div>
              <span className="text-xs text-gray-500 text-center leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}