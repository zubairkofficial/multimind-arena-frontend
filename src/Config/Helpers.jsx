import { Notyf } from "notyf";

class Helpers {
  static localhost = "http://192.168.18.57:8080";
  static server = "http://multibackend.cyberifyportfolio.com";

  static basePath = `${this.localhost}`;
  static apiUrl = `${this.basePath}/api/v1/`;

  static authUser = JSON.parse(localStorage.getItem("user") ?? "{}");

  static serverImage = (name) => {
    return `${this.basePath}/${name}`;
  };

  static getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  static getItem = (data, isJson = false) => {
    if (isJson) {
      return JSON.parse(localStorage.getItem(data));
    } else {
      return localStorage.getItem(data);
    }
  };

  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getItem("token")}`,
    },
  };

  static authFileHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${this.getToken()}`,
    },
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
  static loadScript(scriptName, dashboard = false) {
    return new Promise((resolve, reject) => {
      const scriptPath = new URL(
        `/src/assets/js/${scriptName}`,
        import.meta.url
      ).href;
      const script = document.createElement("script");
      script.src = scriptPath;
      script.async = true;

      script.onload = () => resolve(script);
      script.onerror = () =>
        reject(new Error(`Script load error: ${scriptPath}`));

      document.body.appendChild(script);
    });
  }
}

export default Helpers;
