'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-10 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Bloc 1 : NovaCore */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">NovaCore</h2>
          <p className="text-sm leading-6">
            Plateforme IA pour booster la communication, le contenu et la relation client.
          </p>
        </div>

        {/* Bloc 2 : Navigation */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/pricing">Tarification</Link></li>
            <li><Link href="/#modules">Modules IA</Link></li>
            <li><Link href="/login">Connexion</Link></li>
          </ul>
        </div>

        {/* Bloc 3 : Légal */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Légal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/mentions-legales">Mentions légales</Link></li>
            <li><Link href="/politique-confidentialite">Politique de confidentialité</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Bloc 4 : Stores mobile */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Nos apps</h3>
          <div className="flex flex-col gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/appstore-badge_jso4bp.png"
                alt="Télécharger sur l'App Store"
                width={160}
                height={50}
              />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/playstare-badge_eo42yn.png"
                alt="Disponible sur Google Play"
                width={160}
                height={50}
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} NovaCore. Tous droits réservés.
      </div>
    </footer>
  )
}
