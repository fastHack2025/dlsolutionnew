export default function MobileApp() {
    return (
      <section className="py-20 bg-gray-100 px-4 sm:px-8" id="mobile-app">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Application Mobile NovaCore
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Restez connecté à votre business depuis n’importe où grâce à notre app mobile intuitive.
          </p>
  
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
            <div className="w-full lg:w-1/2">
              <img
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/mobile-mockup_iawxjt.png"
                alt="Mockup App Mobile"
                className="w-full max-w-xs mx-auto drop-shadow-2xl"
              />
            </div>
  
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-4">Téléchargez l'application</h3>
              <p className="text-gray-600 mb-6">
                Scan le QR code ou choisis ton store préféré pour accéder à l'app NovaCore.
              </p>
              <img
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/qrcode-novacore_ri6640.png"
                alt="QR Code NovaCore"
                className="h-32 w-32 mx-auto lg:mx-0 mb-6"
              />
              <div className="flex justify-center lg:justify-start gap-4">
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/playstare-badge_eo42yn.png"
                  alt="Play Store"
                  className="h-12"
                />
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1744370550/appstore-badge_jso4bp.png"
                  alt="App Store"
                  className="h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  