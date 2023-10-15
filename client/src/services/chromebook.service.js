import http from "../http-common";

class ChromebookDataService {
  getAll() {
    return http.get("/chromebooks");
  }

  get(serialNumber) {
    return http.get(`/chromebooks/serialNumber=${serialNumber}`);
  }

  findBySerialNumber(serialNumber) {
    return http.get(`/chromebooks?serialNumber=${serialNumber}`);
  }

//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }

//   create(data) {
//     return http.post("/tutorials", data);
//   }

//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}

const cds = new ChromebookDataService();
export default cds;