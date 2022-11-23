import React, { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Polygon } from "react-leaflet"
import { statesData } from "./data"

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38]
})

const position = [40.634, -97.899]

function ResetCenterView(props) {
  const { selectPosition } = props
  const map = useMap()

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
    // eslint-disable-next-line
  }, [selectPosition])

  return null
}

const Maps = ({ selectPosition }) => {
  const locationSelection = [selectPosition?.lat, selectPosition?.lon]
  return (
    <MapContainer
      center={position}
      zoom={4}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=PRywwjm7dyxhUqaIxQ57"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />

      {statesData.features.map(state => {
        const coordinates = state.geometry.coordinates[0].map(item => [
          item[1],
          item[0]
        ])

        return (
          <Polygon
            key={state.id}
            pathOptions={{
              fillColor: "#FD8D3C",
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "white"
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: e => {
                const layer = e.target
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 5,
                  dashArray: "",
                  color: "#666",
                  fillColor: "#D45962"
                })
              },
              mouseout: e => {
                const layer = e.target
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: "white",
                  fillColor: "#FD8D3C"
                })
              },
              click: e => {}
            }}
          />
        )
      })}
    </MapContainer>
  )
}

export default Maps
