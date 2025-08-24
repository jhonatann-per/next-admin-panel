import Link from 'next/link';

export const Menu = () => {
    return(
        <nav>
            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 , gap: '10px' }}>
                <li><Link href="/" >Home</Link></li>
                <li><Link href="/products-category/list" >Category</Link></li>
                <li><Link href="/products-situation/list">Produtos</Link></li>
                <li><Link href="/situations/list">Situations</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}