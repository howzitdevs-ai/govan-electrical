const ACCESS_KEY = "711de358-2ecc-49c1-a922-b7225612390b";

export interface Web3FormsPayload {
  subject: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  package?: string;
  province?: string;
  timeline?: string;
  message?: string;
  [key: string]: string | undefined;
}

export async function submitLead(data: Web3FormsPayload): Promise<string> {
  const payload = {
    access_key: ACCESS_KEY,
    // replyto tells Web3Forms to set the Reply-To header to the sender's email
    replyto: data.email,
    ...data,
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  // Web3Forms always returns 200, so check the JSON body for success
  let json: { success: boolean; message?: string };
  try {
    json = await res.json();
  } catch {
    throw new Error(`Server returned non-JSON response (status ${res.status})`);
  }

  if (!json.success) {
    throw new Error(json.message || `Submission failed (status ${res.status})`);
  }

  return json.message || "Submitted successfully";
}
