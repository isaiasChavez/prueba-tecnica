export const verifyEmail = (email: string): boolean => {
  if (
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  ) {
    return true;
  } else {
    return false;
  }
};

/* 
export const verifyPassword = (pass: string) => {
  if (pass.length >= 8) {
    let mayuscula = false
    let minuscula = false
    let numero = false
    let caracter_raro = false

    for (let i = 0; i < pass.length; i++) {
      if (pass.charCodeAt(i) >= 65 && pass.charCodeAt(i) <= 90) {
        mayuscula = true
      } else if (pass.charCodeAt(i) >= 97 && pass.charCodeAt(i) <= 122) {
        minuscula = true
      } else if (pass.charCodeAt(i) >= 48 && pass.charCodeAt(i) <= 57) {
        numero = true
      } else {
        caracter_raro = true
      }
    }
    if (
      mayuscula == true &&
      minuscula == true &&
      caracter_raro == true &&
      numero == true
    ) {
      return true
    }
  }
  return false
} */