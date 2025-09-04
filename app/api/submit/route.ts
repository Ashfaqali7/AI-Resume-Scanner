export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 🔗 Replace with your n8n webhook URL
        const res = await fetch("http://localhost:5678/webhook-test/my-resume-scanner", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        // Handle non-ok responses from the webhook
        if (!res.ok) {
            throw new Error(`n8n webhook failed with status: ${res.status}`);
        }

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to call n8n",
                details: error instanceof Error ? error.message : "Unknown error"
            }),
            { status: 500 }
        );
    }
}
