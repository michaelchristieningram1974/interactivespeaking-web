'use client'

export default function Hamburger() {
  return (
    <button
      className="hamburger"
      onClick={() => {
        const menu = document.getElementById('mobile-menu')
        menu?.classList.toggle('open')
      }}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}