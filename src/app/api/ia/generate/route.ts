import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      max_tokens: 200,
    }),
  })

  const data = await response.json()
  return NextResponse.json({ result: data.choices?.[0]?.text || "" })
}
