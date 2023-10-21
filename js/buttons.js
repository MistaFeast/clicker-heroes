/*
   ----------------------------------------------------------------------------
   JavaScript Functionality for MistaFeast - © 2023 MistaFeast
   ----------------------------------------------------------------------------
*/

// Random Var
let decryptedValue;

// Number formatting function
const formatNumber = (number) => {
  const numberString = number.toString().replace("+", "");
  const [integerPart, decimalPart] = numberString.split(".");
  const exponent = integerPart.length - 1;

  if (exponent < 9) {
    return numberString;
  } else {
    const mantissa = integerPart[0] + "." + integerPart.slice(1, 4);
    return `${mantissa}e${exponent}`;
  }
};

function removeQuotes(inputString, key) {
  const regex = new RegExp(`"${key}":"([^"]+)"`, "g");
  const stringWithQuotesRemoved = inputString.replace(regex, `"${key}":$1`);
  return stringWithQuotesRemoved;
}

// GitHub logo prompt
$("img").click(() => {
  if (
    confirm(
      "This is going to redirect you to an external site, github.com/MistaFeast...\nContinue?"
    )
  ) {
    window.open("https://github.com/MistaFeast", "_BLANK");
  }
});

// Decrypt button
$("#decode").click(() => {
  try {
    decryptedValue = new Decrypt($("#input").val()).decryptedSave;

    $("#gold").val(formatNumber(decryptedValue["gold"]));
    $("#hero").val(formatNumber(decryptedValue["heroSouls"]));
    $("#rubies").val(formatNumber(decryptedValue["rubies"]));
    $("#ancient").val(formatNumber(decryptedValue["ancientSouls"]));
  } catch (error) {
    throw new Error("Unable to modify game save.", error);
  }
});

// Encrypt button
$("#encode").click(() => {
  try {
    $("#gold").val(formatNumber($("#gold").val()));
    $("#hero").val(formatNumber($("#hero").val()));
    $("#rubies").val(formatNumber($("#rubies").val()));
    $("#ancient").val(formatNumber($("#ancient").val()));

    decryptedValue["gold"] = $("#gold").val();
    decryptedValue["heroSouls"] = $("#hero").val();
    decryptedValue["rubies"] = $("#rubies").val();
    decryptedValue["ancientSouls"] = $("#ancient").val();

    let stringJson = JSON.stringify(decryptedValue);
    stringJson = removeQuotes(stringJson, "gold");
    stringJson = removeQuotes(stringJson, "heroSouls");
    stringJson = removeQuotes(stringJson, "rubies");
    stringJson = removeQuotes(stringJson, "ancientSouls");

    let encryptedValue = new Encrypt(stringJson).encryptedSave;
    $("#output").val(encryptedValue);
  } catch (error) {
    throw new Error("Unable to modify game save.", error);
  }
});

// Copy & Paste button
$("#copy").click(() => {
  try {
    navigator.clipboard.writeText($("#output").val());
    alert("Copied save to clipboard!");
  } catch (error) {
    alert("Unable to set save to clipboard!");
    throw new Error(error);
  }
});

$("#paste").click(() => {
  navigator.clipboard
    .readText()
    .then((text) => {
      $("#input").val(text);
    })
    .catch((error) => {
      alert("Unable to paste save to text-box!");
      throw new Error("Error pasting keyboard contents:", error);
    });
});
