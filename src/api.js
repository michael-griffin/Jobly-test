const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class JoblyApi {
  // The backend needs to be authorized with a token
  static token = "";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;
    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      // console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }


  /** Get details on a company by search term. */

  static async getJobs(searchTerm = null) {

    let res;
    if (searchTerm) {
      res = await this.request('jobs', { title: searchTerm });
    } else {
      res = await this.request('jobs');
    }
    return res.jobs;
  }

  /** Get jobs from a company by handle. */

  static async getJobsByCompany(companyHandle) {
    let res = await this.request('jobs', { companyHandle });
    return res.jobs;
  }

  static async getCompanies(searchTerm = null) {
    let res;
    if (searchTerm) {
      res = await this.request('companies', { nameLike: searchTerm });
    } else {
      res = await this.request('companies');
    }
    return res.companies;
  }

  static async registerUser(userRegisterInfo) {
    const res = await this.request('auth/register', userRegisterInfo, "POST");
    return res.token;
  }

  static async loginUser(userLoginInfo) {
    const res = await this.request('auth/token', userLoginInfo, "POST");
    return res.token;
  }

  static async updateUser(username, userUpdateInfo) {
    const res = await this.request(`users/${username}`, userUpdateInfo, "PATCH");
    return res.user;
  }

  static async updateCompany(handle, companyUpdateInfo) {
    const res = await this.request(`companies/${handle}`, companyUpdateInfo, "PATCH");
    return res;
  }

  static async getUserInfo(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  // TODO:
  static async applyToJob(username, jobId) {
    console.log("request apply to job", `users/${username}/jobs/${jobId}`)
    const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
    console.log("Applied!", res);
    return res;
  }

}

export default JoblyApi;