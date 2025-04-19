import { clerkClient } from "@clerk/nextjs/server"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" })
  }

  const { userId, role } = req.body

  if (!userId || !role) {
    return res.status(400).json({ message: "Paramètres manquants" })
  }

  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    })
    res.status(200).json({ success: true })
  } catch (e) {
    res.status(500).json({ message: "Erreur mise à jour Clerk", error: e })
  }
}
