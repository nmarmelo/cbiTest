import http from "../http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions");
  }

  findBySerialNumber(serialNumber) {
    return http.get(`/transactions?${serialNumber}`);
  }


//   create(data) {
//     return http.post("/transactions", data);
//   }

}

const tds = new TransactionDataService();
export default tds;