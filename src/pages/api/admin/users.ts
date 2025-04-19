import { clerkClient } from "@clerk/nextjs/server"

export default async function handler(req, res) {
  try {
    const users = await clerkClient.users.getUserList()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ error: "Échec récupération users", details: e })
  }
}
