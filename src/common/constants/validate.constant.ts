export class validateConstant {
  constructor() {
    const pwPattern =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    const namePattern = /^[가-힣]{2,}|[a-zA-Z]{2,}$/;
    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
    const phonePattern = /^01[0-9]{8,9}$/;
  }
}
const pwPattern =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
const namePattern = /^[가-힣]{2,}|[a-zA-Z]{2,}$/;
const emailPattern =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
const phonePattern = /^01[0-9]{8,9}$/;
