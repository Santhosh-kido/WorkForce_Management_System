export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <svg
          className="header-logo"
          viewBox="0 0 32 32"
          width="52"
          height="52"
          aria-hidden="true"
        >
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="#6c9bd1"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M16 7C13.2 7 11.2 9 11.2 12C11.2 15 13.2 17 16 17C18.8 17 20.8 15 20.8 12C20.8 9 18.8 7 16 7Z"
            fill="white"
          />
          <path
            d="M10 24C10 20 12.8 18 16 18C19.2 18 22 20 22 24V25.5H10V24Z"
            fill="white"
          />
        </svg>
        <div className="header-text">
          <h1>Workforce Management System</h1>
        </div>
      </div>
    </header>
  );
}
