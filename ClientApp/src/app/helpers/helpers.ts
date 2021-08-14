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
