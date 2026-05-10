/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const ALLOWED_ORIGINS = new Set(['https://karlroxas.is-a.dev', 'https://karlroxas21.github.io']);

export default {
	async fetch(request, env) {
		const origin = request.headers.get('Origin') ?? '';
		const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : '';

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': allowedOrigin,
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		if (request.method !== 'POST') {
			return new Response('Method not allowed', { status: 405 });
		}

		if (!allowedOrigin) {
			return new Response('Forbidden', { status: 403 });
		}

		const body = await request.json();

		const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
				'Content-Type': 'application/json',
				'HTTP-Referer': env.SITE_URL ?? 'https://yoursite.com',
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		return new Response(JSON.stringify(data), {
			status: response.status,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': allowedOrigin,
			},
		});
	},
};
