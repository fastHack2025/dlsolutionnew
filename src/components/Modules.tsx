export default function Modules() {
    return (
      <section id="modules" className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Modules IA intégrés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              'CRM IA & Fiches clients automatiques',
              'Générateur de contenu intelligent',
              'Publication & planning réseaux sociaux',
              'Assistant développeur GPT intégré',
              'Analytics IA & Dashboard',
              'Formations personnalisées'
            ].map((title, i) => (
              <div
                key={i}
                className="rounded-xl bg-white shadow-md p-6 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600">
                  NovaCore automatise cette tâche pour vous, sans intervention humaine.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  