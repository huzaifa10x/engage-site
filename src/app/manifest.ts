import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: '10X Engage',
        short_name: 'Engage',
        start_url: '/',
        display: 'browser',
        background_color: '#FFFFFF',
        theme_color: '#0B0D09',
        icons: [
            { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
            { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
    };
}
