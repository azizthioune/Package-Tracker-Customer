import React, { ChangeEvent, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { IPackageData } from "./types/Package";
import PackageService from "./services/PackageService";
import MapComponent from "./components/MapComponent";

const App: React.FC = () => {
  const [currentPackage, setCurrentPackage] = useState<IPackageData | null>(
    null
  );
  const [searchTitle, setSearchTitle] = useState<string>("");

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const findByTitle = () => {
    PackageService.findByID(searchTitle)
      .then((response: any) => {
        setCurrentPackage(response.data.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const mapMarkers = useMemo(() => {
    let markers: any[] = [];
    console.log("===============currentPackage=====================");
    console.log(currentPackage);
    console.log("====================================");
    if (currentPackage && currentPackage?.deliveries?.length) {
      markers = [
        {
          title: "Source",
          position: {
            lat: currentPackage?.from_location?.latitude,
            lng: currentPackage?.from_location?.longitude,
          },
        },
        {
          title: "Destination",
          position: {
            lat: currentPackage?.to_location?.latitude,
            lng: currentPackage?.to_location?.longitude,
          },
        },
        {
          title: "Delivery",
          position: {
            lat: currentPackage?.deliveries?.[0].location?.latitude,
            lng: currentPackage?.deliveries?.[0].location?.longitude,
          },
        },
      ];
      return markers;
    }
    return [];
  }, [currentPackage]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Aziz Thioune 𓃵
        </a>
      </nav>

      <div className="container mt-3">
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by UID"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            {currentPackage ? (
              <div>
                <h4>Package Details</h4>
                <div>
                  <label>
                    <strong>UID:</strong>
                  </label>{" "}
                  {currentPackage.package_uid}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentPackage.description}
                </div>
                <div>
                  <label>
                    <strong>From:</strong>
                  </label>{" "}
                  {currentPackage.from_name}
                </div>
                <div>
                  <label>
                    <strong>From address:</strong>
                  </label>{" "}
                  {currentPackage.from_address}
                </div>
                <div>
                  <label>
                    <strong>To:</strong>
                  </label>{" "}
                  {currentPackage?.to_name || "N/A"}
                </div>
                <div>
                  <label>
                    <strong>To Address:</strong>
                  </label>{" "}
                  {currentPackage.to_address || "N/A"}
                </div>
                <div>
                  <label>
                    <strong>Created at:</strong>
                  </label>{" "}
                  {`${currentPackage?.created_at?.slice(
                    0,
                    10
                  )} ${currentPackage?.created_at?.slice(11, 16)}`}
                </div>

                {currentPackage?.deliveries?.length ? (
                  <>
                    <h4>Delivery Details</h4>
                    <div>
                      <label>
                        <strong>UID:</strong>
                      </label>{" "}
                      {currentPackage?.deliveries[0]?.delivery_uid}
                    </div>
                    <div>
                      <label>
                        <strong>Status:</strong>
                      </label>
                      <div className="badge badge-warning">
                        {" "}
                        {currentPackage?.deliveries[0]?.status}
                      </div>
                    </div>

                    <div>
                      <label>
                        <strong>Start Time:</strong>
                      </label>{" "}
                      {currentPackage?.deliveries[0]?.start_time
                        ? `${
                            currentPackage?.deliveries[0]?.start_time?.slice(
                              0,
                              10
                            ) || ""
                          } ${currentPackage?.deliveries[0]?.start_time?.slice(
                            11,
                            16
                          )}`
                        : "N/A"}
                    </div>
                    <div>
                      <label>
                        <strong>Pickup Time:</strong>
                      </label>{" "}
                      {currentPackage?.deliveries[0]?.pickup_time
                        ? `${
                            currentPackage?.deliveries[0]?.pickup_time?.slice(
                              0,
                              10
                            ) || ""
                          } ${currentPackage?.deliveries[0]?.pickup_time?.slice(
                            11,
                            16
                          )}`
                        : "N/A"}
                    </div>
                    <div>
                      <label>
                        <strong>End Time:</strong>
                      </label>{" "}
                      {currentPackage?.deliveries[0]?.end_time
                        ? `${
                            currentPackage?.deliveries[0]?.end_time?.slice(
                              0,
                              10
                            ) || ""
                          } ${currentPackage?.deliveries[0]?.end_time?.slice(
                            11,
                            16
                          )}`
                        : "N/A"}
                    </div>
                    <div>
                      <label>
                        <strong>Created at:</strong>
                      </label>{" "}
                      {`${currentPackage?.deliveries[0]?.created_at?.slice(
                        0,
                        10
                      )} ${currentPackage?.deliveries[0]?.created_at?.slice(
                        11,
                        16
                      )}`}
                    </div>
                  </>
                ) : null}
              </div>
            ) : (
              <div>
                <br />
                <p>Please search a Package...</p>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <MapComponent markers={mapMarkers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
