import http from "../http-common";

class LocationDataService {
  getAll() {
    return http.get("/locations");
  }
}

const lds = new LocationDataService();
export default lds;