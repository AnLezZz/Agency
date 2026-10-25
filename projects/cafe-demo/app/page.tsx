const menu = [
  { name: 'Sample Flat White', desc: 'Placeholder espresso with silky milk.', price: '$5.50' },
  { name: 'Sample Long Black', desc: 'Placeholder double shot over hot water.', price: '$5.00' },
  { name: 'Sample Cheese Scone', desc: 'Placeholder baked scone with butter.', price: '$6.00' },
  { name: 'Sample Avocado Toast', desc: 'Placeholder sourdough, avocado, lemon.', price: '$16.50' },
  { name: 'Sample Banana Bread', desc: 'Placeholder toasted slice with butter.', price: '$7.00' },
  { name: 'Sample Iced Chai', desc: 'Placeholder spiced chai over ice.', price: '$6.50' },
];

const hours = [
  ['Monday', '7:00am – 3:00pm'],
  ['Tuesday', '7:00am – 3:00pm'],
  ['Wednesday', '7:00am – 3:00pm'],
  ['Thursday', '7:00am – 3:00pm'],
  ['Friday', '7:00am – 4:00pm'],
  ['Saturday', '8:00am – 4:00pm'],
  ['Sunday', 'Closed'],
];

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-stone-900 text-amber-50">
        <span className="font-semibold">Sample Café</span>
        <a href="#contact" className="underline py-2 px-1">Contact</a>
      </header>
      <main>
        <section className="px-4 py-16 text-center bg-amber-100">
          <h1 className="text-3xl font-bold sm:text-5xl">Sample Café Demo</h1>
          <p className="mt-3 text-lg">A placeholder neighbourhood café in Auckland.</p>
          <a href="#menu" className="inline-flex items-center justify-center mt-6 min-h-[44px] px-6 rounded bg-stone-900 text-amber-50 font-medium">
            See the menu
          </a>
        </section>

        <section id="menu" className="px-4 py-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          <ul className="grid grid-cols-1 gap-4">
            {menu.map((m) => (
              <li key={m.name} className="rounded border border-stone-300 bg-white p-4">
                <div className="flex justify-between gap-4">
                  <h3 className="font-semibold">{m.name}</h3>
                  <span>{m.price}</span>
                </div>
                <p className="text-sm text-stone-600">{m.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="hours" className="px-4 py-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Opening hours</h2>
          <ul className="divide-y divide-stone-300 rounded border border-stone-300 bg-white">
            {hours.map(([d, t]) => (
              <li key={d} className="flex justify-between gap-4 p-3">
                <span className="font-medium">{d}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="location" className="px-4 py-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Find us</h2>
          <address className="not-italic">123 Example Street, Auckland 1010 (fake address)</address>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Auckland+CBD"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center min-h-[44px] mt-3 underline"
          >
            View on map
          </a>
        </section>

        <section id="contact" className="px-4 py-12 text-center bg-amber-100">
          <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center justify-center min-h-[48px] px-8 rounded bg-stone-900 text-amber-50 font-medium"
          >
            Contact us
          </a>
        </section>
      </main>
    </>
  );
}
