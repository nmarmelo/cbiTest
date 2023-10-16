import http from "../http-common";

class ChromebookDataService {
  getAll() {
    return http.get("/chromebooks");
  }

  get(serialNumber) {
    return http.get(`/chromebooks/${serialNumber}`);
  }

  findBySerialNumber(serialNumber) {
    return http.get(`/chromebooks?serialNumber=${serialNumber}`);
  }

  update(serialNumber, data) {
    return http.put(`/chromebooks/${serialNumber}`, data);
  }

//   create(data) {
//     return http.post("/tutorials", data);
//   }

//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }

}

const cds = new ChromebookDataService();
export default cds;