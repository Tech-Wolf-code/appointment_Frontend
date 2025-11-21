export const validateStep1 = (data) => {
  const errors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";

  if (!data.code.trim()) errors.code = "Mobile code is required";

  if (!data.phone.trim()) errors.phone = "Contact number is required";
  else if (!/^\d{6,15}$/.test(data.phone))
    errors.phone = "Enter a valid phone number";

  if (!data.email.trim()) errors.email = "Email is required";
else {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailPattern.test(data.email))
    errors.email = "Enter a valid email";
}

  return errors;
};

export const validateStep2 = (data) => {
  const errors = {};

  if (!data.brand) errors.brand = "Brand is required";

  if (!data.deviceType)
    errors.deviceType = "Device type is required";

  if (data.deviceType === "Other" && !data.otherDevice.trim())
    errors.otherDevice = "Please specify device type";

  if (!data.issues.length)
    errors.issues = "Select at least one issue";

  if (!data.address.trim())
    errors.address = "Service address is required";

  if (!data.date)
    errors.date = "Appointment date is required";

  if (!data.timeSlot)
    errors.timeSlot = "Preferred time is required";

  if (data.timeSlot === "Manual" && !data.manualTime)
    errors.manualTime = "Please enter time";

  return errors;
};
