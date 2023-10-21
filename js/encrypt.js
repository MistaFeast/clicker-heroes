/*
   ----------------------------------------------------------------------------
   JavaScript Functionality for MistaFeast - © 2023 MistaFeast
   ----------------------------------------------------------------------------
*/

// Constants
const zLibHeader = "7a990d405d2c6fb93aa8fbb0ec1a3b23";
const deflateHeader = "7e8bb5a89f2842ac4af01b3b7e228592";
const antiCheatCode = "Fe12NAfA3R6z4k0z";
const salt = "af0ik392jrmt0nsfdghy0";

// Encryption for game saves class
class Encrypt {
  constructor(save) {
    this.encryptedSave = this.encryptSave(save);
  }

  encryptSave(save) {
    try {
      if (encryptionType === "zlib") {
        return this.encryptZlib(save);
      } else if (encryptionType === "deflate") {
        return this.encryptDeflate(save);
      } else if (encryptionType === "base64") {
        return this.encryptBase64(save);
      }
    } catch (error) {
      console.error("Error during encryption:", error);
      return "Invalid save/Error Occurred... Check console for more information!";
    }
  }

  encryptZlib(save) {
    let compressedData = window.pako.deflate(save, { to: "string" });
    return `${zLibHeader}${btoa(compressedData)}`;
  }

  encryptDeflate(save) {
    let compressedData = window.pako.deflateRaw(save, { to: "string" });
    return `${deflateHeader}${btoa(compressedData)}`;
  }

  encryptBase64(save) {
    let base64String = btoa(save);
    let characters =
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let randomIndex;
    let array = save.split("");
    let result = [];
    let counter = 0;
    while (counter < array.length) {
      result[counter * 2] = array[counter];
      randomIndex = Math.floor(Math.random() * (characters.length - 1));
      result[counter * 2 + 1] = characters.substring(randomIndex, 1);
      counter++;
    }

    return `${result.join("")}${antiCheatCode}${CryptoJS.MD5(
      base64String + salt
    )}`;
  }
}
