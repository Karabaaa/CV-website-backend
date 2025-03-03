const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const sgMail = require("@sendgrid/mail")

dotenv.config() // Charger les variables d'environnement

// Configurer SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const app = express()
app.use(express.json())
app.use(cors())

// Endpoint pour envoyer l'email
app.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." })
  }

  const msg = {
    to: "amandine.moigno@gmail.com", // Remplace par l'adresse où recevoir les messages
    from: "amandine.moigno@gmail.com", // L'adresse de l'expéditeur
    subject: subject + " - " + email,
    text: message + " from " + email,
  }

  try {
    await sgMail.send(msg)
    res.status(200).json({ success: "Email envoyé avec succès !" })
  } catch (error) {
    console.error("Erreur SendGrid :", error)
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." })
  }
})

// Démarrer le serveur
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`)
})
