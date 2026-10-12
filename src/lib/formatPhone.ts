export function formatRussianPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  const subscriberNumber = digits.slice(1, 11);
  const parts = [subscriberNumber.slice(0, 3), subscriberNumber.slice(3, 6), subscriberNumber.slice(6, 8), subscriberNumber.slice(8, 10)].filter(Boolean);

  return parts.length > 0 ? `+7 ${parts.join("-")}` : "+7 ";
}

export function isCompleteRussianPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  return digits.length === 11 && digits.startsWith("7");
}
