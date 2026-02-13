'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>
})

export default function IndonesiaMap() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvince, setSelectedProvince] = useState(null)

  const stats = [
    { label: 'Belum Terdata', value: '180', percentage: '10%', color: '#E0E0E0' },
    { label: 'Kurang Baik', value: '5.800', percentage: '52%', color: '#81C784' },
    { label: 'Cukup', value: '1.800', percentage: '28%', color: '#66BB6A' },
    { label: 'Sangat Baik', value: '3.200', percentage: '34%', color: '#4CAF50' },
  ]

  const handleSearch = (province) => {
    setSelectedProvince(province)
  }

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-header-inline">
          <h2>Dashboard Data Seluruh Indonesia</h2>
          <div className="filter-controls">
            <select className="filter-select">
              <option>-- Pilih Bulan --</option>
              <option>Januari</option>
              <option>Februari</option>
              <option>Maret</option>
            </select>
            <select className="filter-select">
              <option>-- Pilih Tahun --</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
            <div className="filter-buttons">
              <button className="btn-filter active">Akternal</button>
              <button className="btn-filter">Kepulatan</button>
              <button className="btn-filter">Dana</button>
            </div>
          </div>
        </div>

        <div className="map-section">
          <div className="map-container">
            <div className="map-search-bar">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Cari Provinsi, Kabupaten, atau Kota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <MapComponent 
              searchTerm={searchTerm}
              onProvinceSelect={handleSearch}
              selectedProvince={selectedProvince}
            />
            
            <div className="legend">
              <div className="legend-title">Keterangan</div>
              <div className="legend-gradient">
                <div className="gradient-bar"></div>
                <div className="gradient-labels">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">
                {stat.value} <span className="stat-percentage">({stat.percentage})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
