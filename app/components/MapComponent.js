'use client'

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useEffect, useState, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Function to get color based on percentage
const getColor = (percentage) => {
  if (percentage > 80) return '#2E7D32'
  if (percentage > 60) return '#4CAF50'
  if (percentage > 40) return '#66BB6A'
  if (percentage > 20) return '#81C784'
  return '#C8E6C9'
}

// Province data with percentages
const provinceData = {
  'ACEH': { percentage: 85, value: '5.800' },
  'SUMATERA UTARA': { percentage: 72, value: '4.200' },
  'SUMATERA BARAT': { percentage: 68, value: '3.800' },
  'RIAU': { percentage: 78, value: '4.500' },
  'JAMBI': { percentage: 65, value: '3.600' },
  'SUMATERA SELATAN': { percentage: 70, value: '4.000' },
  'BENGKULU': { percentage: 62, value: '3.400' },
  'LAMPUNG': { percentage: 75, value: '4.300' },
  'KEPULAUAN BANGKA BELITUNG': { percentage: 58, value: '3.200' },
  'KEPULAUAN RIAU': { percentage: 80, value: '4.600' },
  'DKI JAKARTA': { percentage: 95, value: '6.500' },
  'JAWA BARAT': { percentage: 88, value: '5.200' },
  'JAWA TENGAH': { percentage: 82, value: '4.800' },
  'DI YOGYAKARTA': { percentage: 90, value: '5.400' },
  'JAWA TIMUR': { percentage: 85, value: '5.000' },
  'BANTEN': { percentage: 78, value: '4.500' },
  'BALI': { percentage: 92, value: '5.600' },
  'NUSA TENGGARA BARAT': { percentage: 68, value: '3.900' },
  'NUSA TENGGARA TIMUR': { percentage: 55, value: '3.100' },
  'KALIMANTAN BARAT': { percentage: 65, value: '3.700' },
  'KALIMANTAN TENGAH': { percentage: 60, value: '3.400' },
  'KALIMANTAN SELATAN': { percentage: 72, value: '4.100' },
  'KALIMANTAN TIMUR': { percentage: 75, value: '4.300' },
  'KALIMANTAN UTARA': { percentage: 58, value: '3.300' },
  'SULAWESI UTARA': { percentage: 78, value: '4.500' },
  'SULAWESI TENGAH': { percentage: 62, value: '3.500' },
  'SULAWESI SELATAN': { percentage: 80, value: '4.600' },
  'SULAWESI TENGGARA': { percentage: 68, value: '3.900' },
  'GORONTALO': { percentage: 65, value: '3.700' },
  'SULAWESI BARAT': { percentage: 58, value: '3.300' },
  'MALUKU': { percentage: 55, value: '3.100' },
  'MALUKU UTARA': { percentage: 60, value: '3.400' },
  'PAPUA BARAT': { percentage: 48, value: '2.800' },
  'PAPUA': { percentage: 52, value: '3.000' },
}

export default function MapComponent({ searchTerm, onProvinceSelect, selectedProvince }) {
  const [geoData, setGeoData] = useState(null)
  const [filteredProvinces, setFilteredProvinces] = useState([])
  const mapRef = useRef(null)
  const geoJsonLayerRef = useRef(null)

  useEffect(() => {
    // Fetch Indonesia GeoJSON data
    fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json')
      .then(response => response.json())
      .then(data => {
        setGeoData(data)
      })
      .catch(error => console.error('Error loading GeoJSON:', error))
  }, [])

  // Filter provinces based on search term
  useEffect(() => {
    if (searchTerm && geoData) {
      const filtered = geoData.features.filter(feature => {
        const provinceName = feature.properties.Propinsi || feature.properties.NAME_1
        return provinceName?.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setFilteredProvinces(filtered)
    } else {
      setFilteredProvinces([])
    }
  }, [searchTerm, geoData])

  // Zoom to selected province
  useEffect(() => {
    if (selectedProvince && mapRef.current && geoJsonLayerRef.current) {
      const layer = geoJsonLayerRef.current
      layer.eachLayer((l) => {
        const provinceName = l.feature.properties.Propinsi || l.feature.properties.NAME_1
        if (provinceName === selectedProvince) {
          const bounds = l.getBounds()
          mapRef.current.fitBounds(bounds, { padding: [50, 50] })
          l.openPopup()
        }
      })
    }
  }, [selectedProvince])

  // Zoom to first filtered province
  useEffect(() => {
    if (filteredProvinces.length > 0 && mapRef.current && geoJsonLayerRef.current) {
      const firstProvince = filteredProvinces[0]
      const provinceName = firstProvince.properties.Propinsi || firstProvince.properties.NAME_1
      
      const layer = geoJsonLayerRef.current
      layer.eachLayer((l) => {
        const layerProvinceName = l.feature.properties.Propinsi || l.feature.properties.NAME_1
        if (layerProvinceName === provinceName) {
          const bounds = l.getBounds()
          mapRef.current.fitBounds(bounds, { padding: [50, 50] })
          l.openPopup()
        }
      })
    }
  }, [filteredProvinces])

  const style = (feature) => {
    const provinceName = feature.properties.Propinsi?.toUpperCase() || feature.properties.NAME_1?.toUpperCase()
    const data = provinceData[provinceName] || { percentage: 0 }
    
    const isFiltered = filteredProvinces.length > 0 && 
      !filteredProvinces.some(f => 
        (f.properties.Propinsi || f.properties.NAME_1) === 
        (feature.properties.Propinsi || feature.properties.NAME_1)
      )
    
    return {
      fillColor: getColor(data.percentage),
      weight: 2,
      opacity: isFiltered ? 0.3 : 1,
      color: 'white',
      fillOpacity: isFiltered ? 0.2 : 0.7
    }
  }

  const onEachFeature = (feature, layer) => {
    const provinceName = feature.properties.Propinsi || feature.properties.NAME_1
    const data = provinceData[provinceName?.toUpperCase()] || { percentage: 0, value: 'N/A' }
    
    layer.on({
      mouseover: (e) => {
        const layer = e.target
        layer.setStyle({
          weight: 3,
          color: '#666',
          fillOpacity: 0.9
        })
      },
      mouseout: (e) => {
        const layer = e.target
        const isFiltered = filteredProvinces.length > 0 && 
          !filteredProvinces.some(f => 
            (f.properties.Propinsi || f.properties.NAME_1) === provinceName
          )
        layer.setStyle({
          weight: 2,
          color: 'white',
          fillOpacity: isFiltered ? 0.2 : 0.7
        })
      },
      click: () => {
        onProvinceSelect(provinceName)
      }
    })

    layer.bindPopup(`
      <div style="text-align: center; padding: 5px;">
        <strong style="font-size: 14px;">${provinceName}</strong><br/>
        <span style="color: ${getColor(data.percentage)}; font-weight: bold; font-size: 16px;">
          ${data.percentage}%
        </span><br/>
        <span style="font-size: 12px; color: #666;">
          Data: ${data.value}
        </span>
      </div>
    `)
  }

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut()
    }
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <MapContainer
          center={[-2.5, 118]}
          zoom={5}
          style={{ height: '500px', width: '100%', borderRadius: '8px' }}
          scrollWheelZoom={true}
          zoomControl={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {geoData && (
            <GeoJSON 
              ref={geoJsonLayerRef}
              data={geoData} 
              style={style}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
        
        <div className="zoom-controls">
          <button 
            className="zoom-button zoom-in" 
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button 
            className="zoom-button zoom-out" 
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {searchTerm && filteredProvinces.length > 0 && (
        <div className="search-results">
          {filteredProvinces.map((province, index) => {
            const provinceName = province.properties.Propinsi || province.properties.NAME_1
            const data = provinceData[provinceName?.toUpperCase()] || { percentage: 0 }
            return (
              <div 
                key={index} 
                className="search-result-item"
                onClick={() => onProvinceSelect(provinceName)}
              >
                <span className="province-name">{provinceName}</span>
                <span className="province-percentage" style={{ color: getColor(data.percentage) }}>
                  {data.percentage}%
                </span>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
