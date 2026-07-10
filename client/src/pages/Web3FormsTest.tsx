import { useState } from "react";

const ACCESS_KEY = "711de358-2ecc-49c1-a922-b7225612390b";

export default function Web3FormsTest() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [response, setResponse] = useState("");

  const runTest = async () => {
    setStatus("loading");
    setResponse("");

    const payload = {
      access_key: ACCESS_KEY,
      subject: "TEST — Web3Forms API Test from Govan Electrical",
      name: "Test User",
      email: "Admin@govanelectrical.co.za",
      replyto: "Admin@govanelectrical.co.za",
      phone: "012 023 3410",
      message: "This is a test submission to verify Web3Forms is working.",
    };

    console.log("[Web3Forms Test] Sending payload:", payload);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      console.log("[Web3Forms Test] Raw response:", text);

      let json: { success: boolean; message?: string } | null = null;
      try { json = JSON.parse(text); } catch { /* not JSON */ }

      if (json?.success) {
        setStatus("success");
        setResponse(JSON.stringify(json, null, 2));
      } else {
        setStatus("error");
        setResponse(json ? JSON.stringify(json, null, 2) : `HTTP ${res.status}\n\n${text}`);
      }
    } catch (err) {
      setStatus("error");
      setResponse(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const colors = {
    success: { bg: "#d4edda", border: "#28a745", text: "#155724" },
    error:   { bg: "#f8d7da", border: "#dc3545", text: "#721c24" },
    loading: { bg: "#fff3cd", border: "#ffc107", text: "#856404" },
    idle:    { bg: "#f8f9fa", border: "#dee2e6", text: "#495057" },
  };
  const c = colors[status];

  return (
    <div style={{ maxWidth: 560, margin: "60px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 22, marginBottom: 6 }}>Web3Forms API Test</h1>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>
        Tests the exact payload our forms send. Check the browser console (F12 → Console) for full details.
      </p>

      <div style={{ background: "#f8f9fa", border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 20, fontSize: 13 }}>
        <strong>Access Key:</strong> {ACCESS_KEY}<br />
        <strong>Endpoint:</strong> https://api.web3forms.com/submit<br />
        <strong>To:</strong> Admin@govanelectrical.co.za (account email)
      </div>

      <button
        onClick={runTest}
        disabled={status === "loading"}
        style={{
          background: "#FFD700", color: "#1A1A1A", border: "none",
          padding: "12px 28px", fontWeight: "bold", borderRadius: 6,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          fontSize: 14, opacity: status === "loading" ? 0.7 : 1,
          marginBottom: 20,
        }}
      >
        {status === "loading" ? "Sending…" : "Send Test Submission"}
      </button>

      {status !== "idle" && (
        <div style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 8, padding: 16, fontSize: 13 }}>
          <strong style={{ fontSize: 15 }}>
            {status === "loading" && "⏳ Sending to Web3Forms…"}
            {status === "success" && "✅ SUCCESS — Email should arrive in inbox shortly"}
            {status === "error"   && "❌ FAILED — See error details below"}
          </strong>
          {response && (
            <pre style={{ marginTop: 12, background: "rgba(0,0,0,0.05)", padding: 12, borderRadius: 4, whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: 12 }}>
              {response}
            </pre>
          )}
          {status === "success" && (
            <p style={{ marginTop: 12, fontSize: 12 }}>
              ✉️ Check <strong>Admin@govanelectrical.co.za</strong> inbox AND spam/junk folder.<br />
              If it's in spam, mark as "Not Spam" — future emails will go to inbox.
            </p>
          )}
          {status === "error" && (
            <p style={{ marginTop: 12, fontSize: 12 }}>
              If you see <em>"Access key is invalid"</em> → the key hasn't been verified yet.<br />
              Log in at <strong>web3forms.com</strong> and confirm your email address.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
