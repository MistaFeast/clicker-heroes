/*
   ----------------------------------------------------------------------------
   JavaScript Functionality for MistaFeast - © 2023 MistaFeast
   ----------------------------------------------------------------------------
*/

// Random Variable
var encryptionType = null;

// Decryption for game saves class
class Decrypt {
  constructor(save) {
    this.decryptedSave = this.decryptSave(save);
  }

  decryptSave(save) {
    try {
      if (save.substring(0, 32) === zLibHeader) {
        return this.decryptZLib(save);
      } else if (save.substring(0, 32) === deflateHeader) {
        return this.decryptDeflate(save);
      } else if (save.includes(antiCheatCode)) {
        return this.decryptBase64(save);
      } else {
        throw new Error("Unknown save game type.");
      }
    } catch (error) {
      console.error("Error during decryption:", error);
      return "Invalid save/Error Occurred... Check console for more information!";
    }
  }

  decryptZLib(save) {
    try {
      encryptionType = "zlib";
      return JSON.parse(
        pako.inflate(atob(save.substring(32)), { to: "string" })
      );
    } catch (error) {
      console.error("Error during zlib decryption:", error);
      return "Invalid save/Error Occurred... Check console for more information!";
    }
  }

  decryptDeflate(save) {
    try {
      let locationOne = save.substring(32);
      let locationTwo = atob(locationOne);
      encryptionType = "deflate";
      return JSON.parse(window.pako.inflateRaw(locationTwo, { to: "string" }));
    } catch (error) {
      console.error("Error during deflate decryption:", error);
      return "Invalid save/Error Occurred... Check console for more information!";
    }
  }

  decryptBase64(save) {
    try {
      if (save.indexOf(antiCheatCode) > 0) {
        save = save.split(antiCheatCode)[0];
        let locationOne = save.split("");
        let locationTwo = locationOne.filter((value, index) => {
          return index % 2 === 0;
        });
        let locationThree = locationTwo.join("");
        encryptionType = "base64";
        return JSON.parse(atob(locationThree));
      } else {
        console.error("Error during base64 decryption:", error);
        return "Invalid save/Error Occurred... Check console for more information!";
      }
    } catch (error) {
      console.error("Error during base64 decryption:", error);
      return "Invalid save/Error Occurred... Check console for more information!";
    }
  }
}
