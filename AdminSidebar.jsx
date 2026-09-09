import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: HomeIcon, end: true },
  { to: '/admin/inventory', label: 'Inventory', icon: BoxIcon },
  { to: '/admin/returns', label: 'Returns', icon: ReturnIcon },
]

export default function AdminSidebar({ mobile = false }) {
  if (mobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-navy-100 flex md:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-2 text-[11px] ${
                isActive ? 'text-navy-700 font-semibold' : 'text-navy-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon active={isActive} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    )
  }

  return (
    <aside className="hidden md:flex md:w-56 shrink-0 bg-white border-r border-navy-100 flex-col py-6 px-4 gap-1">
      <div className="font-display text-lg tracking-wide text-navy-700 px-2 mb-6">
        KAELŌ ATELIER
        <div className="text-[10px] tracking-widest2 text-navy-400 font-sans mt-1">ADMIN DASHBOARD</div>
      </div>
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm ${
              isActive ? 'bg-navy-700 text-white' : 'text-navy-700 hover:bg-navy-50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <item.icon active={isActive} />
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </aside>
  )
}

function HomeIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'currentColor' : '#1A2B4C'} strokeWidth="1.6">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  )
}
function BoxIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'currentColor' : '#1A2B4C'} strokeWidth="1.6">
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
    </svg>
  )
}
function ReturnIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'currentColor' : '#1A2B4C'} strokeWidth="1.6">
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h11a5 5 0 0 1 0 10h-1" />
    </svg>
  )
}
