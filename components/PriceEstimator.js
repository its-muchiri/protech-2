'use client';

import { useState } from 'react';
import { Calculator, Send } from 'lucide-react';
import Link from 'next/link';

const serviceRanges = {
  'Construction & Civil Engineering': { min: 500000, max: 50000000, unit: 'KES', label: 'Project cost' },
  'Swimming Pool Construction': { min: 300000, max: 15000000, unit: 'KES', label: 'Pool cost' },
  'Medical Equipment & Supplies': { min: 50000, max: 5000000, unit: 'KES', label: 'Equipment cost' },
  'Logistics & Freight Services': { min: 10000, max: 2000000, unit: 'KES', label: 'Shipment cost' },
  'Technical Repairs & Appliance Servicing': { min: 2000, max: 200000, unit: 'KES', label: 'Repair cost' },
  'Water Filtration & Purification': { min: 50000, max: 5000000, unit: 'KES', label: 'System cost' },
  'Solar Power & Renewable Energy': { min: 150000, max: 10000000, unit: 'KES', label: 'System cost' },
  'Roofing Systems & Waterproofing': { min: 100000, max: 10000000, unit: 'KES', label: 'Project cost' },
  'Plumbing & Drainage Services': { min: 10000, max: 1000000, unit: 'KES', label: 'Project cost' },
  'Security Systems & Physical Security': { min: 50000, max: 3000000, unit: 'KES', label: 'System cost' },
  'Garage & Automotive Services': { min: 2000, max: 200000, unit: 'KES', label: 'Service cost' },
  'Borehole Drilling & Water Services': { min: 200000, max: 10000000, unit: 'KES', label: 'Drilling cost' },
  'Architectural Design & House Plans': { min: 30000, max: 1000000, unit: 'KES', label: 'Design cost' },
  'Generator Sales & Repair': { min: 50000, max: 5000000, unit: 'KES', label: 'Equipment cost' },
  'Electrical Installation & Wiring': { min: 50000, max: 5000000, unit: 'KES', label: 'Installation cost' },
  'Interior Design & Office Fit-Outs': { min: 100000, max: 10000000, unit: 'KES', label: 'Project cost' },
  'Office Partitions & Glass Works': { min: 20000, max: 2000000, unit: 'KES', label: 'Project cost' },
};

export default function PriceEstimator() {
  const [service, setService] = useState('');
  const [size, setSize] = useState(1);
  const [estimate, setEstimate] = useState(null);

  const handleCalculate = () => {
    const range = serviceRanges[service];
    if (!range) return;

    const min = range.min * size;
    const max = range.max * size;
    setEstimate({ min, max, unit: range.unit, label: range.label });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary-600" />
        </div>
        <h3 className="font-heading font-bold text-xl">Quick Estimate</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="form-label">Select Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="form-input"
          >
            <option value="">Choose a service...</option>
            {Object.keys(serviceRanges).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Size / Scale (multiplier)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="price-slider w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Small</span>
            <span className="font-semibold text-primary-600">x{size}</span>
            <span>Large</span>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          Calculate Estimate
        </button>
      </div>

      {estimate && (
        <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
          <p className="text-sm font-semibold text-primary-800 mb-2">Estimated Range</p>
          <p className="text-2xl font-heading font-bold text-primary-700">
            KES {estimate.min.toLocaleString()} - KES {estimate.max.toLocaleString()}
          </p>
          <p className="text-xs text-primary-600 mt-1">
            *This is a rough estimate. Final pricing depends on project scope and site conditions.
          </p>
          <Link
            href={`/request-a-quote?service=${encodeURIComponent(service)}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            Get Exact Quote <Send className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}