export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <a className="text-2xl font-bold tracking-tight">
            Tech<span className="text-blue-400">Fix</span>
          </a>
          <p className="text-gray-400 mt-2 text-sm">
            Your trusted partner for PC & Laptop repair.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-200 mb-3">Services</h4>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-400 hover:text-white">Laptop Repair</li>
            <li className="text-gray-400 hover:text-white">PC Repair</li>
            <li className="text-gray-400 hover:text-white">SSD Upgrades</li>
            <li className="text-gray-400 hover:text-white">Virus Removal</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-200 mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-400 hover:text-white">About Us</li>
            <li className="text-gray-400 hover:text-white">Bookings</li>
            <li className="text-gray-400 hover:text-white">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-200 mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <span className="text-gray-400 hover:text-white">Twitter</span>
            <span className="text-gray-400 hover:text-white">Facebook</span>
            <span className="text-gray-400 hover:text-white">Instagram</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2025 TechFix. All rights reserved.
      </div>
    </footer>
  );
}
