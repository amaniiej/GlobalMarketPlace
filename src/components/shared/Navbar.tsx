export function Navbar() {
    return (
        <nav
            style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderBottom: '1px solid #e5e7eb'
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'green',
                            borderRadius: '8px'
                        }}></div>
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>AGROSPACE</span>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <a href='/' style={{ color: 'black' }}>
                        Home
                    </a>
                    <a href='/prices' style={{ color: 'black' }}>
                        Prices
                    </a>
                    <a href='/blog' style={{ color: 'black' }}>
                        Blog
                    </a>
                </div>

                {/* Button */}
                <button
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '4px'
                    }}>
                    Order Now
                </button>
            </div>
        </nav>
    );
}
