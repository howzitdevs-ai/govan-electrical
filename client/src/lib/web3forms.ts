const ACCESS_KEY = "711de358-2ecc-49c1-a922-b7225612390b";

export async function submitLead(data: Record<string, string>): Promise<void> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: ACCESS_KEY, ...data }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Submission failed");
}
