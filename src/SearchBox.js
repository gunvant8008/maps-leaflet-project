import React, { useState } from "react"
import OutlinedInput from "@mui/material/OutlinedInput"
import Button from "@mui/material/Button"
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material"

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?"

const SearchBox = props => {
  const { setSelectPosition } = props
  const [searchText, setSearchText] = useState("")
  const [listPlace, setListPlace] = useState([])

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              // search
              const params = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0
              }
              const queryString = new URLSearchParams(params).toString()
              const requestOptions = {
                method: "GET",
                redirect: "follow"
              }
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                  setListPlace(JSON.parse(result))
                })
                .catch(err => console.log("err", err))
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <div style={{ overflowY: "auto" }}>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map(item => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => {
                    setSelectPosition(item)
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="./placeholder.png"
                      alt="placeholder"
                      style={{ width: 38, height: 38 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>

                <Divider />
              </div>
            )
          })}
        </List>
      </div>
    </div>
  )
}

export default SearchBox
