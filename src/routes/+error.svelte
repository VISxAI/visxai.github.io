<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let animationFrame: number;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		// Generate "normal" data points (in distribution)
		const normalPoints: { x: number; y: number; opacity: number }[] = [];
		for (let i = 0; i < 100; i++) {
			const angle = Math.random() * Math.PI * 2;
			const radius = Math.random() * 80 + 40;
			normalPoints.push({
				x: width / 2 + Math.cos(angle) * radius,
				y: height / 2 + Math.sin(angle) * radius,
				opacity: 0.3 + Math.random() * 0.4
			});
		}

		// The "404" outlier point
		const outlier = {
			x: width * 0.85,
			y: height * 0.15,
			pulse: 0
		};

		function animate() {
			if (!ctx) return;

			ctx.clearRect(0, 0, width, height);

			// Draw decision boundary (circle)
			ctx.strokeStyle = '#3b82f6';
			ctx.lineWidth = 2;
			ctx.setLineDash([5, 5]);
			ctx.beginPath();
			ctx.arc(width / 2, height / 2, 140, 0, Math.PI * 2);
			ctx.stroke();
			ctx.setLineDash([]);

			// Draw normal points
			normalPoints.forEach((point) => {
				ctx.fillStyle = `rgba(59, 130, 246, ${point.opacity})`;
				ctx.beginPath();
				ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
				ctx.fill();
			});

			// Draw outlier with pulsing effect
			outlier.pulse = (outlier.pulse + 0.05) % (Math.PI * 2);
			const pulseSize = 6 + Math.sin(outlier.pulse) * 2;
			const pulseOpacity = 0.6 + Math.sin(outlier.pulse) * 0.3;

			// Outlier glow
			ctx.shadowBlur = 15;
			ctx.shadowColor = '#ef4444';
			ctx.fillStyle = `rgba(239, 68, 68, ${pulseOpacity})`;
			ctx.beginPath();
			ctx.arc(outlier.x, outlier.y, pulseSize, 0, Math.PI * 2);
			ctx.fill();
			ctx.shadowBlur = 0;

			// Draw axes
			ctx.strokeStyle = '#9ca3af';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(0, height / 2);
			ctx.lineTo(width, height / 2);
			ctx.moveTo(width / 2, 0);
			ctx.lineTo(width / 2, height);
			ctx.stroke();

			// Label the outlier
			ctx.fillStyle = '#ef4444';
			ctx.font = 'bold 14px monospace';
			ctx.fillText('404', outlier.x + 12, outlier.y - 8);

			animationFrame = requestAnimationFrame(animate);
		}

		animate();

		return () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
		};
	});
</script>

<div class="flex min-h-[70vh] flex-col items-center justify-center px-4">
	<div class="relative mb-8">
		<h1 class="text-9xl font-black text-gray-200 select-none">404</h1>
		<div class="absolute inset-0 flex items-center justify-center">
			<h2 class="text-3xl font-bold text-gray-800">Out of Distribution</h2>
		</div>
	</div>

	<div class="mb-8 p-4">
		<canvas bind:this={canvas} width="400" height="300" class="block"></canvas>
	</div>

	<p class="mb-8 max-w-md text-center text-gray-600">
		Our model couldn't classify this route. The data point appears to be an outlier, falling outside
		the decision boundary of known pages.
	</p>

	<div class="flex gap-4">
		<a
			href="/"
			class="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
		>
			← Return to Known Space
		</a>
	</div>

	{#if $page.status !== 404}
		<div class="mt-12 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-800">
			<p class="font-bold">Error Details:</p>
			<p class="font-mono">{$page.error?.message}</p>
		</div>
	{/if}
</div>

<style>
	canvas {
		image-rendering: crisp-edges;
	}
</style>
