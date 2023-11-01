import http from "../http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions");
  }

  getAllDateDesc() {
    return http.get(`/transactions/byDate`);
  }

  getAndCountAllDateDesc(params) {
    var query = params.serialNumber ? `&serialNumber=${params.serialNumber}` : "";
    query += params.page ? `&page=${params.page}` : "";
    query += params.size ? `&size=${params.size}` : "";
    let finalQuery = query.substring(1);

    return http.get(`/transactions/byDatePaginated?${finalQuery}`);
  }

  findBySerialNumber(serialNumber) {
    return http.get(`/transactions?serialNumber=${serialNumber}`);
  }


//   create(data) {
//     return http.post("/transactions", data);
//   }

}

const tds = new TransactionDataService();
export default tds;