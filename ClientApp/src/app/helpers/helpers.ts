import { FormControl, FormGroup } from '@angular/forms';

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Build Form Data ---------------------------- */
function buildFormData(formData, data, parentKey): void {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

/* ---------------------------- Json To Form Data --------------------------- */
export function jsonToFormData(data): FormData {
  const formData = new FormData();

  buildFormData(formData, data, null);

  return formData;
}

/* ------------------------ Validate All Form Fields ------------------------ */
export function validateAllFormFields(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
      control.updateValueAndValidity({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}


/* ---------------------- Convert Objet To Query String --------------------- */
export function toQueryString(obj: any): string {
  const parts = [];

  for (const property of Object.keys(obj)) {
    const value = obj[property];
    if (value !== null && value !== undefined) {
      parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
  }

  return parts.join('&');
}

/* -------------------- Get Difference Between Two Dates -------------------- */
export function dateDiff(dateInterval: string, date1: Date, date2: Date, parseDate2: boolean): number {
  let diff = 0;
  if (parseDate2 === true) {
    diff = Math.abs(parseDate(date1).getTime() - date2.getTime());
  } else {
    diff = Math.abs(parseDate(date1).getTime() - date2.getTime());
  }
  let diffDays = 0;
  if (dateInterval === 'd' || dateInterval === 'day') {
    diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  } else if (dateInterval === 'y' || dateInterval === 'year') {
    diffDays = Math.ceil(diff / (1000 * 3600));
  }

  return diffDays;
}

/* -------------------- Parse a Date In yyyy-mm-dd format ------------------- */
function parseDate(date): Date {
  const parts = date.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}
