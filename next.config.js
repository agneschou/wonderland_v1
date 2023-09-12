/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		serverActionsBodySizeLimit: '2mb',
	},
	images: {
		domains: ['storage.googleapis.com'],
	  }
};

module.exports = nextConfig;
