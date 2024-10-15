import { Notyf } from "notyf";

class Helpers {
  static localhost = "http://127.0.0.1:8080";
  static server = "https://chat-arena-backend-4ba91b3feb6b.herokuapp.com";
  static basePath = `${this.server}`;
  static apiUrl = `${this.basePath}/api/v1/`;

  static authUser = JSON.parse(localStorage.getItem("user") ?? "{}");

  static serverImage = (name) => {
    return `${this.basePath}/${name}`;
  };

  static getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    },
  };

  static authFileHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${this.getToken()}`,
    },
  };

  static getItem = (data, isJson = false) => {
    if (isJson) {
      return JSON.parse(localStorage.getItem(data));
    } else {
      return localStorage.getItem(data);
    }
  };

  static setItem = (key, data, isJson = false) => {
    if (isJson) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  };

  static toast = (type, message) => {
    const notyf = new Notyf();
    notyf.open({
      message: message,
      type: type,
      position: { x: "right", y: "top" },
      ripple: true,
      dismissible: true,
      duration: 3000,
    });
  };
}

export default Helpers;
